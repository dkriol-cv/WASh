import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * SCORM 1.2 Hook — Escola Amiga do WASH
 *
 * Data model fields used:
 *   cmi.core.lesson_status     → "not attempted" | "incomplete" | "passed" | "failed"
 *   cmi.core.lesson_location   → "moduleId:slideId"  (max 255 chars)
 *   cmi.core.score.raw/min/max → 0–100
 *   cmi.core.session_time      → HH:MM:SS (current session)
 *   cmi.suspend_data           → JSON progress snapshot (max 4096 chars)
 *
 * Standalone fallback: localStorage key "wash_progress"
 */

const LS_KEY = 'wash_progress';

const formatTime = (ms) => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const findAPI = (win) => {
  let attempts = 0;
  let w = win;
  while (!w.API && w.parent && w.parent !== w) {
    if (++attempts > 7) return null;
    w = w.parent;
  }
  return w.API || null;
};

export function useScorm() {
  const [isReady, setIsReady] = useState(false);
  const [lessonStatus, setLessonStatus] = useState('not attempted');
  const [score, setScore] = useState(0);
  const [resumeData, setResumeData] = useState(null);

  const apiRef = useRef(null);
  const sessionStartRef = useRef(Date.now());
  const isFinishedRef = useRef(false);

  // ─── Finalize session ────────────────────────────────────────────────────
  const finish = useCallback(() => {
    const api = apiRef.current;
    if (!api || isFinishedRef.current) return;
    isFinishedRef.current = true;
    const elapsed = formatTime(Date.now() - sessionStartRef.current);
    api.LMSSetValue('cmi.core.session_time', elapsed);
    api.LMSCommit('');
    api.LMSFinish('');
  }, []);

  // ─── Initialize ──────────────────────────────────────────────────────────
  useEffect(() => {
    const api = findAPI(window);
    apiRef.current = api;

    if (!api) {
      // Standalone / preview mode — use localStorage
      console.info('[SCORM] API not found — standalone mode (localStorage).');
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.moduleId) setResumeData(parsed);
        }
      } catch (_) {}
      setIsReady(true);
      return;
    }

    const initResult = api.LMSInitialize('');
    if (initResult !== 'true') {
      console.error('[SCORM] LMSInitialize failed. Code:', api.LMSGetLastError());
      setIsReady(true);
      return;
    }

    // Set score range
    api.LMSSetValue('cmi.core.score.min', '0');
    api.LMSSetValue('cmi.core.score.max', '100');

    // Read persisted state
    const status = api.LMSGetValue('cmi.core.lesson_status') || 'not attempted';
    const rawScore = api.LMSGetValue('cmi.core.score.raw');
    const suspendRaw = api.LMSGetValue('cmi.suspend_data');

    // Mark as incomplete on first visit (don't overwrite passed/failed)
    if (!status || status === 'not attempted' || status === 'unknown') {
      api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
    }
    api.LMSCommit('');

    setLessonStatus(status);
    if (rawScore) setScore(parseFloat(rawScore) || 0);

    // Restore progress snapshot
    if (suspendRaw) {
      try {
        const parsed = JSON.parse(suspendRaw);
        if (parsed?.moduleId) setResumeData(parsed);
      } catch (_) {
        console.warn('[SCORM] Could not parse suspend_data.');
      }
    }

    setIsReady(true);

    window.addEventListener('beforeunload', finish);
    return () => {
      window.removeEventListener('beforeunload', finish);
      finish();
    };
  }, [finish]);

  // ─── Save progress (location + full snapshot) ────────────────────────────
  const saveProgress = useCallback((progressData) => {
    const api = apiRef.current;
    const snapshot = { ...progressData, savedAt: Date.now() };
    const json = JSON.stringify(snapshot);
    const location = `${progressData.moduleId}:${progressData.slideId}`;

    if (api) {
      api.LMSSetValue('cmi.core.lesson_location', location.substring(0, 255));
      api.LMSSetValue('cmi.suspend_data', json.substring(0, 4096));
      api.LMSCommit('');
    } else {
      // Standalone fallback
      try { localStorage.setItem(LS_KEY, json); } catch (_) {}
    }
  }, []);

  // ─── Save quiz score ─────────────────────────────────────────────────────
  const saveScore = useCallback((newScore) => {
    const api = apiRef.current;
    if (api) {
      api.LMSSetValue('cmi.core.score.raw', String(newScore));
      api.LMSCommit('');
    }
    setScore(newScore);
  }, []);

  // ─── Complete course (passed / failed) ───────────────────────────────────
  const completeCourse = useCallback((finalScore = null) => {
    const api = apiRef.current;
    const passed = finalScore !== null && finalScore >= 70;
    const status = passed ? 'passed' : 'failed';

    if (api) {
      api.LMSSetValue('cmi.core.lesson_status', status);
      if (finalScore !== null) api.LMSSetValue('cmi.core.score.raw', String(finalScore));
      api.LMSCommit('');
    } else {
      // Standalone: mark in localStorage
      try {
        const raw = localStorage.getItem(LS_KEY);
        const prev = raw ? JSON.parse(raw) : {};
        localStorage.setItem(LS_KEY, JSON.stringify({ ...prev, lessonStatus: status, score: finalScore }));
      } catch (_) {}
    }
    setLessonStatus(status);
  }, []);

  // ─── Clear saved progress (for "start over") ─────────────────────────────
  const clearProgress = useCallback(() => {
    const api = apiRef.current;
    if (api) {
      api.LMSSetValue('cmi.core.lesson_location', '');
      api.LMSSetValue('cmi.suspend_data', '');
      api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
      api.LMSSetValue('cmi.core.score.raw', '0');
      api.LMSCommit('');
    } else {
      try { localStorage.removeItem(LS_KEY); } catch (_) {}
    }
    setResumeData(null);
    setScore(0);
    setLessonStatus('incomplete');
  }, []);

  return { isReady, lessonStatus, score, resumeData, saveProgress, saveScore, completeCourse, clearProgress };
}
