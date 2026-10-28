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
  // 5 stars = all correct; each fifth of the answers earns a star.
  const r = total ? correct / total : 0;
  return Math.max(0, Math.min(5, Math.floor(r * 5 + 1e-9)));
}
