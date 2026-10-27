"use client";

import { useEffect, useState } from "react";
import type { LevelId } from "@/lib/levels";

// Progress is kept ONLY on this device (localStorage). No names, scores or
// recordings are sent anywhere. "Clear my progress" deletes it all.

const KEY = "ziva-literacy:v1";

export interface RecordEntry {
  best: number; // stars 0–3
  tries: number;
  last: string; // ISO date
}

export interface Progress {
  level: LevelId | null;
  records: Record<string, RecordEntry>;
  days: string[]; // dates practised (YYYY-MM-DD), newest last
}

const EMPTY: Progress = { level: null, records: {}, days: [] };

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { level: parsed.level ?? null, records: parsed.records ?? {}, days: parsed.days ?? [] };
  } catch {
    return EMPTY;
  }
}

const listeners = new Set<(p: Progress) => void>();

function write(next: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
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
    const onStorage = (e: StorageEvent) => e.key === KEY && setProgress(read());
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(setProgress);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return { progress, loaded };
}

export function setLevel(level: LevelId) {
  write({ ...read(), level });
}

/** Saves a finished exercise: `key` like "reading:ama-goat", stars 0–3. */
export function recordResult(key: string, stars: number) {
  const current = read();
  const today = new Date().toISOString().slice(0, 10);
  const prev = current.records[key];
  const entry: RecordEntry = {
    best: Math.max(prev?.best ?? 0, Math.max(0, Math.min(3, Math.round(stars)))),
    tries: (prev?.tries ?? 0) + 1,
    last: new Date().toISOString(),
  };
  const days = current.days.includes(today) ? current.days : [...current.days, today].slice(-60);
  write({ ...current, records: { ...current.records, [key]: entry }, days });
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
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
