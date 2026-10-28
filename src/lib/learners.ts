"use client";

import { useEffect, useState } from "react";
import type { LevelId } from "@/lib/levels";

// Learner profiles opened on this phone with a learner code (from a parent or
// school). Several children can share one phone; each keeps their own stars.
// With no profile chosen, the app works as before ("Guest").

const KEY = "ziva-literacy:learners";
export const LEARNER_EVENT = "ziva-learner-changed";

export interface LearnerProfile {
  code: string;
  name: string;
  level: LevelId;
  space: string; // family or school name
  kind: "family" | "school";
  lastSync?: string;
  missing?: boolean; // the code no longer works (deleted or changed)
}

interface Store {
  active: string | null;
  list: LearnerProfile[];
}

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw) as Store;
      return { active: s.active ?? null, list: Array.isArray(s.list) ? s.list : [] };
    }
  } catch {
    // ignore
  }
  return { active: null, list: [] };
}

function write(s: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") window.dispatchEvent(new Event(LEARNER_EVENT));
}

export function getLearners() {
  return read();
}

export function activeLearner(): LearnerProfile | null {
  const s = read();
  return s.list.find((l) => l.code === s.active) ?? null;
}

/** Where this learner's progress is kept on the phone. */
export function progressKeyFor(code: string | null) {
  return code ? `ziva-literacy:v1:${code}` : "ziva-literacy:v1";
}

export function saveLearner(profile: LearnerProfile, makeActive = true) {
  const s = read();
  const list = [...s.list.filter((l) => l.code !== profile.code), profile];
  write({ active: makeActive ? profile.code : s.active, list });
}

export function updateLearner(code: string, patch: Partial<LearnerProfile>) {
  const s = read();
  write({ ...s, list: s.list.map((l) => (l.code === code ? { ...l, ...patch } : l)) });
}

export function switchLearner(code: string | null) {
  write({ ...read(), active: code });
}

export function removeLearner(code: string) {
  const s = read();
  try {
    localStorage.removeItem(progressKeyFor(code));
  } catch {
    // ignore
  }
  write({ active: s.active === code ? null : s.active, list: s.list.filter((l) => l.code !== code) });
}

export function useLearners() {
  const [store, setStore] = useState<Store>({ active: null, list: [] });
  useEffect(() => {
    const update = () => setStore(read());
    update();
    window.addEventListener(LEARNER_EVENT, update);
    const onStorage = (e: StorageEvent) => e.key === KEY && update();
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(LEARNER_EVENT, update);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return { ...store, current: store.list.find((l) => l.code === store.active) ?? null };
}
