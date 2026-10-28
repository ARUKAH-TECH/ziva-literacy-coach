"use client";

import { useEffect } from "react";
import { LEARNER_EVENT, getLearners } from "@/lib/learners";
import { PROGRESS_SAVED } from "@/lib/progress";
import { syncNow } from "@/lib/sync";

/** Quietly keeps the active learner's stars in sync (when online). */
export function LearnerSync() {
  useEffect(() => {
    let timer: number | null = null;
    const soon = (ms = 4000) => {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        void syncNow();
      }, ms);
    };
    const onVisible = () => document.visibilityState === "visible" && soon(500);
    const onSaved = () => soon();
    const onOnline = () => soon(500);
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
