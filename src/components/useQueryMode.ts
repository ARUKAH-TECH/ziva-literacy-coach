"use client";

import { useEffect, useState } from "react";

/** Reads ?mode=… on the client (the site is static, so no server reads it). */
export function useQueryMode(): string {
  const [mode, setMode] = useState("");
  useEffect(() => {
    setMode(new URLSearchParams(window.location.search).get("mode") ?? "");
  }, []);
  return mode;
}

export function shuffle<T>(list: readonly T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function starsFor(correct: number, total: number) {
  const r = total ? correct / total : 0;
  return r >= 0.9 ? 3 : r >= 0.6 ? 2 : r >= 0.3 ? 1 : 0;
}
