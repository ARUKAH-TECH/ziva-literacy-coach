"use client";

import { useEffect, useState } from "react";
import type { LevelId } from "@/lib/levels";
import { LEARNER_EVENT, getLearners, progressKeyFor } from "@/lib/learners";

// Progress is kept on this device (localStorage). As a guest nothing is sent
// anywhere. When a learner code from a parent or school is opened, that
// learner's stars are also synced so the parent/teacher can see them.

export const PROGRESS_SAVED = "ziva-progress-saved";
const currentKey = () => progressKeyFor(getLearners().active);

export interface RecordEntry {
  best: number; // stars 0–5
  tries: number;
  last: string; // ISO date
}

export interface Progress {
  level: LevelId | null;
  records: Record<string, RecordEntry>;
  days: string[]; // dates practised (YYYY-MM-DD), newest last
  /** Star scale the records use (older saves used 3). */
  scale?: 5;
}

const EMPTY: Progress = { level: null, records: {}, days: [], scale: 5 };

export function readProgress(): Progress {
  return read();
}

function read(): Progress {
  try {
    const raw = localStorage.getItem(currentKey());
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    let records = parsed.records ?? {};
    if (parsed.scale !== 5) {
      // Saves from the 3-star version: 1★→2, 2★→3, 3★→5 on the new 5-star scale.
      records = Object.fromEntries(
        Object.entries(records).map(([k, r]) => [k, { ...r, best: r.best >= 3 ? 5 : Math.round((r.best * 5) / 3) }]),
      );
    }
    return { level: parsed.level ?? null, records, days: parsed.days ?? [], scale: 5 };
  } catch {
    return EMPTY;
  }
}

const listeners = new Set<(p: Progress) => void>();

function write(next: Progress) {
  try {
    localStorage.setItem(currentKey(), JSON.stringify(next));
  } catch {
    // Storage full or blocked (private mode): the lesson still works.
  }
  listeners.forEach((l) => l(next));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setProgress(read());
    setLoaded(true);
    listeners.add(setProgress);
    const reload = () => setProgress(read());
    const onStorage = (e: StorageEvent) => e.key === currentKey() && reload();
    window.addEventListener("storage", onStorage);
    window.addEventListener(LEARNER_EVENT, reload);
    return () => {
      listeners.delete(setProgress);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(LEARNER_EVENT, reload);
    };
  }, []);
  return { progress, loaded };
}

export function setLevel(level: LevelId) {
  write({ ...read(), level });
}

/** Saves a finished exercise: `key` like "reading:ama-goat", stars 0–5. */
export function recordResult(key: string, stars: number) {
  const current = read();
  const today = new Date().toISOString().slice(0, 10);
  const prev = current.records[key];
  const entry: RecordEntry = {
    best: Math.max(prev?.best ?? 0, Math.max(0, Math.min(5, Math.round(stars)))),
    tries: (prev?.tries ?? 0) + 1,
    last: new Date().toISOString(),
  };
  const days = current.days.includes(today) ? current.days : [...current.days, today].slice(-60);
  write({ ...current, records: { ...current.records, [key]: entry }, days, scale: 5 });
  window.dispatchEvent(new Event(PROGRESS_SAVED));
}

/** Merges synced progress (from the cloud) into this phone's copy. */
export function mergeProgress(incoming: Partial<Progress>, level?: LevelId) {
  const current = read();
  const records = { ...current.records };
  for (const [k, r] of Object.entries(incoming.records ?? {})) {
    const mine = records[k];
    records[k] = mine
      ? { best: Math.max(mine.best, r.best), tries: Math.max(mine.tries, r.tries), last: mine.last > r.last ? mine.last : r.last }
      : r;
  }
  const days = [...new Set([...current.days, ...(incoming.days ?? [])])].sort().slice(-180);
  write({ level: level ?? current.level, records, days, scale: 5 });
}

export function clearProgress() {
  try {
    localStorage.removeItem(currentKey());
  } catch {
    // ignore
  }
  listeners.forEach((l) => l(EMPTY));
}

export function streak(days: string[]) {
  const set = new Set(days);
  let count = 0;
  const d = new Date();
  // Today may not be practised yet; start from yesterday in that case.
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}
