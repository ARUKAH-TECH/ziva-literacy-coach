"use client";

import { useEffect } from "react";
import { LEARNER_EVENT, getLearners } from "@/lib/learners";
import { PROGRESS_SAVED, readProgress } from "@/lib/progress";
import { syncNow } from "@/lib/sync";
import { captureRef, markLearningDay } from "@/lib/account";

/** Quietly keeps the active learner's stars in sync (when online). */
export function LearnerSync() {
  useEffect(() => {
    captureRef();
    let timer: number | null = null;
    const soon = (ms = 4000) => {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        void syncNow();
      }, ms);
    };
    // A lesson done offline today still counts once the phone is back online.
    const catchUp = () => {
      if (readProgress().days.includes(new Date().toISOString().slice(0, 10))) void markLearningDay();
    };
    catchUp();
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      soon(500);
      catchUp();
    };
    const onSaved = () => {
      soon();
      // A lesson finished: today counts as a learning day for the signed-in person.
      void markLearningDay();
    };
    const onOnline = () => {
      soon(500);
      catchUp();
    };
    // Only when a different learner is chosen (sync itself updates profiles).
    let lastActive = getLearners().active;
    const onLearner = () => {
      const now = getLearners().active;
      if (now !== lastActive) {
        lastActive = now;
        soon(300);
      }
    };
    soon(1500);
    window.addEventListener(PROGRESS_SAVED, onSaved);
    window.addEventListener("online", onOnline);
    window.addEventListener(LEARNER_EVENT, onLearner);
    document.addEventListener("visibilitychange", onVisible);
    const every = window.setInterval(() => soon(0), 5 * 60_000);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      window.clearInterval(every);
      window.removeEventListener(PROGRESS_SAVED, onSaved);
      window.removeEventListener("online", onOnline);
      window.removeEventListener(LEARNER_EVENT, onLearner);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return null;
}
