"use client";

import { useEffect } from "react";

/** Registers the offline worker for this app only (scope "/" of learn.zivarukah.com). */
export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV === "development") return;
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      // The app still works online without it.
    });
  }, []);
  return null;
}
