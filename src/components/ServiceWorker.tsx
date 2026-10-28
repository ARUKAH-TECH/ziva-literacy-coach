"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Registers the offline worker for this app only (scope "/" of
 * learn.zivarukah.com) and keeps it up to date:
 * - checks for a new version on start, when the phone comes back online,
 *   when the app is reopened, and every 30 minutes while open;
 * - a new version downloads quietly in the background, then a small bar
 *   offers "Update now" (nothing is swapped in the middle of a lesson).
 */
export function ServiceWorker() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const reloading = useRef(false);
  const updateRequested = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV === "development") return;
    let registration: ServiceWorkerRegistration | null = null;

    const watch = (reg: ServiceWorkerRegistration) => {
      if (reg.waiting && navigator.serviceWorker.controller) setWaiting(reg.waiting);
      reg.addEventListener("updatefound", () => {
        const incoming = reg.installing;
        incoming?.addEventListener("statechange", () => {
          // "installed" with a controller already in place = an update is ready.
          if (incoming.state === "installed" && navigator.serviceWorker.controller) setWaiting(incoming);
        });
      });
    };

    const check = () => {
      if (navigator.onLine) registration?.update().catch(() => {});
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    const onControllerChange = () => {
      // Only after "Update now" — the very first install also changes the
      // controller, and must not reload the page under the learner.
      if (!updateRequested.current || reloading.current) return;
      reloading.current = true;
      window.location.reload();
    };

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        registration = reg;
        watch(reg);
        check();
      })
      .catch(() => {
        // The app still works online without it.
      });

    window.addEventListener("online", check);
    document.addEventListener("visibilitychange", onVisible);
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    const timer = window.setInterval(check, 30 * 60 * 1000);
    return () => {
      window.removeEventListener("online", check);
      document.removeEventListener("visibilitychange", onVisible);
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      window.clearInterval(timer);
    };
  }, []);

  if (!waiting) return null;
  return (
    <div role="status" className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-[#0b3d91] p-3 pl-4 text-white shadow-2xl">
      <span aria-hidden="true" className="text-2xl">✨</span>
      <p className="flex-1 text-sm font-semibold leading-snug">A new version of ZIVA Literacy is ready.</p>
      <button
        type="button"
        onClick={() => {
          updateRequested.current = true;
          waiting.postMessage("skip-waiting");
        }}
        className="rounded-full bg-[#e3a82a] px-4 py-2 text-sm font-bold text-[#14110c]"
      >
        Update now
      </button>
      <button type="button" onClick={() => setWaiting(null)} aria-label="Later" className="px-1 text-lg text-white/70">
        ✕
      </button>
    </div>
  );
}
