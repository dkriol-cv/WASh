import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * SCORM 1.2 Hook — Escola Amiga do WASH
 *
 * Data model fields used (SCORM 1.2 compliant):
 *   cmi.core.lesson_status     → "not attempted" | "incomplete" | "passed" | "failed"
 *   cmi.core.lesson_location   → "moduleId:slideId"  (max 255 chars)
 *   cmi.core.score.raw         → 0–100
 *   cmi.core.score.max         → 100
 *   cmi.core.session_time      → HH:MM:SS (current session)
 *   cmi.suspend_data           → JSON progress snapshot (max 4096 chars)
 *
 * Standalone fallback: localStorage key "wash_progress"
 *
 * NOTE: All SCORM API calls are wrapped in try/catch — a misbehaving
 * or strict LMS implementation will never crash the React app.
 */

const LS_KEY = 'wash_progress';

const formatTime = (ms) => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/** Safe wrapper — never throws, returns the result or null */
const safeCall = (fn, ...args) => {
  try { return fn(...args); } catch (err) {
    console.warn('[SCORM] API error:', err?.message || err);
    return null;
  }
};

const findAPI = (win) => {
  try {
    let attempts = 0;
    let w = win;
    while (!w.API && w.parent && w.parent !== w) {
      if (++attempts > 7) return null;
      w = w.parent;
    }
    return w.API || null;
  } catch (_) {
    return null; // cross-origin frame access denied
  }
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
    safeCall(() => api.LMSSetValue('cmi.core.session_time', elapsed));
    safeCall(() => api.LMSCommit(''));
    safeCall(() => api.LMSFinish(''));
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

    // LMSInitialize
    const initResult = safeCall(() => api.LMSInitialize(''));
    if (initResult !== 'true') {
      console.error('[SCORM] LMSInitialize failed — running in degraded mode.');
      setIsReady(true);
      return;
    }

    // Set score range (cmi.core.score.max is SCORM 1.2 standard; .min is not — skip it)
    safeCall(() => api.LMSSetValue('cmi.core.score.max', '100'));

    // Read persisted state (each in its own try/catch)
    const status = safeCall(() => api.LMSGetValue('cmi.core.lesson_status')) || 'not attempted';
    const rawScore = safeCall(() => api.LMSGetValue('cmi.core.score.raw'));
    const suspendRaw = safeCall(() => api.LMSGetValue('cmi.suspend_data'));

    // Mark as incomplete on first visit (never overwrite passed/failed)
    if (!status || status === 'not attempted' || status === 'unknown') {
      safeCall(() => api.LMSSetValue('cmi.core.lesson_status', 'incomplete'));
    }
    safeCall(() => api.LMSCommit(''));

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
    try {
      const snapshot = { ...progressData, savedAt: Date.now() };
      const json = JSON.stringify(snapshot);
      const location = `${progressData.moduleId}:${progressData.slideId}`;

      if (api) {
        safeCall(() => api.LMSSetValue('cmi.core.lesson_location', location.substring(0, 255)));
        safeCall(() => api.LMSSetValue('cmi.suspend_data', json.substring(0, 4096)));
        safeCall(() => api.LMSCommit(''));
      } else {
        // Standalone fallback
        try { localStorage.setItem(LS_KEY, json); } catch (_) {}
      }
    } catch (err) {
      console.warn('[SCORM] saveProgress error:', err?.message || err);
    }
  }, []);

  // ─── Save quiz score ─────────────────────────────────────────────────────
  const saveScore = useCallback((newScore) => {
    const api = apiRef.current;
    try {
      if (api) {
        safeCall(() => api.LMSSetValue('cmi.core.score.raw', String(newScore)));
        safeCall(() => api.LMSCommit(''));
      }
    } catch (err) {
      console.warn('[SCORM] saveScore error:', err?.message || err);
    }
    setScore(newScore);
  }, []);

  // ─── Complete course (passed / failed) ───────────────────────────────────
  const completeCourse = useCallback((finalScore = null) => {
    const api = apiRef.current;
    const passed = finalScore !== null && finalScore >= 70;
    const status = passed ? 'passed' : 'failed';
    try {
      if (api) {
        safeCall(() => api.LMSSetValue('cmi.core.lesson_status', status));
        if (finalScore !== null) safeCall(() => api.LMSSetValue('cmi.core.score.raw', String(finalScore)));
        safeCall(() => api.LMSCommit(''));
      } else {
        try {
          const raw = localStorage.getItem(LS_KEY);
          const prev = raw ? JSON.parse(raw) : {};
          localStorage.setItem(LS_KEY, JSON.stringify({ ...prev, lessonStatus: status, score: finalScore }));
        } catch (_) {}
      }
    } catch (err) {
      console.warn('[SCORM] completeCourse error:', err?.message || err);
    }
    setLessonStatus(status);
  }, []);

  // ─── Clear saved progress (for "start over") ─────────────────────────────
  const clearProgress = useCallback(() => {
    const api = apiRef.current;
    try {
      if (api) {
        safeCall(() => api.LMSSetValue('cmi.core.lesson_location', ''));
        safeCall(() => api.LMSSetValue('cmi.suspend_data', ''));
        safeCall(() => api.LMSSetValue('cmi.core.lesson_status', 'incomplete'));
        safeCall(() => api.LMSSetValue('cmi.core.score.raw', '0'));
        safeCall(() => api.LMSCommit(''));
      } else {
        try { localStorage.removeItem(LS_KEY); } catch (_) {}
      }
    } catch (err) {
      console.warn('[SCORM] clearProgress error:', err?.message || err);
    }
    setResumeData(null);
    setScore(0);
    setLessonStatus('incomplete');
  }, []);

  return { isReady, lessonStatus, score, resumeData, saveProgress, saveScore, completeCourse, clearProgress };
}
