import { useEffect, useState, useCallback } from 'react';

export function useScorm() {
  const [scorm, setScorm] = useState(null);
  const [scormError, setScormError] = useState(null);
  const [lessonStatus, setLessonStatus] = useState('not attempted');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Initialize SCORM Again API Wrapper or find existing LMS API
    let api = null;
    try {
      // Find SCORM 1.2 API
      const findAPI = (win) => {
        let attempts = 0;
        let cWin = win;
        while (cWin.API == null && cWin.parent != null && cWin.parent !== cWin) {
          attempts++;
          if (attempts > 7) return null;
          cWin = cWin.parent;
        }
        return cWin.API;
      };

      api = findAPI(window);
      
      if (!api) {
        console.warn('SCORM 1.2 API not found. Running in standalone mode.');
        // If not found, SCORM from scorm-again can mock it or we just ignore
        // Actually scorm-again provides a wrapper. Let's use the SCORM.1.2 wrapper class
        // as a standard facade if we want.
      } else {
        const initResult = api.LMSInitialize("");
        if (initResult === "true") {
          const status = api.LMSGetValue("cmi.core.lesson_status");
          const rawScore = api.LMSGetValue("cmi.core.score.raw");
          setLessonStatus(status || 'not attempted');
          if (rawScore) setScore(parseFloat(rawScore));
          
          if (status === 'not attempted' || status === 'unknown') {
            api.LMSSetValue("cmi.core.lesson_status", "incomplete");
            api.LMSCommit("");
          }
        } else {
          setScormError(api.LMSGetLastError());
        }
      }
      setScorm(api);
    } catch (err) {
      console.error("Error initializing SCORM", err);
      setScormError(err.message);
    }

    return () => {
      if (api) {
        api.LMSCommit("");
        api.LMSFinish("");
      }
    };
  }, []);

  const completeCourse = useCallback((finalScore = null) => {
    if (scorm) {
      scorm.LMSSetValue("cmi.core.lesson_status", "completed");
      if (finalScore !== null) {
        scorm.LMSSetValue("cmi.core.score.raw", finalScore.toString());
      }
      scorm.LMSCommit("");
      setLessonStatus('completed');
    } else {
      console.log('Standalone mode: Course completed with score', finalScore);
      setLessonStatus('completed');
    }
  }, [scorm]);

  const saveScore = useCallback((newScore) => {
    if (scorm) {
      scorm.LMSSetValue("cmi.core.score.raw", newScore.toString());
      scorm.LMSCommit("");
    } else {
      console.log('Standalone mode: Score saved', newScore);
    }
    setScore(newScore);
  }, [scorm]);

  return { scorm, scormError, lessonStatus, score, completeCourse, saveScore };
}
