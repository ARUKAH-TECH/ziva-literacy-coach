"use client";

// Which English the reader speaks. The phone's listening uses this so a
// Nigerian or Ghanaian child is understood in their own accent. The check
// cares that the word is said correctly, not whether it sounds British or
// American. Saved on this phone only.

export const ACCENTS = [
  { code: "en-NG", label: "Nigeria" },
  { code: "en-GH", label: "Ghana" },
  { code: "en-KE", label: "Kenya" },
  { code: "en-ZA", label: "South Africa" },
  { code: "en-IN", label: "India" },
  { code: "en-GB", label: "UK" },
  { code: "en-US", label: "USA" },
] as const;

export type AccentCode = (typeof ACCENTS)[number]["code"];

const KEY = "ziva-accent";
const DEFAULT: AccentCode = "en-NG";
const listeners = new Set<() => void>();

function isAccent(v: string | null | undefined): v is AccentCode {
  return ACCENTS.some((a) => a.code === v);
}

export function getAccent(): AccentCode {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const saved = localStorage.getItem(KEY);
    if (isAccent(saved)) return saved;
  } catch {
    // storage blocked — use the default
  }
  const fromPhone = (navigator.languages ?? [navigator.language]).find((l) => isAccent(l) && l !== "en-US" && l !== "en-GB");
  return isAccent(fromPhone) ? fromPhone : DEFAULT;
}

export function setAccent(code: AccentCode) {
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // ignore
  }
  listeners.forEach((fn) => fn());
}

export function onAccentChange(fn: () => void) {
  listeners.add(fn);
  return () => void listeners.delete(fn);
}
