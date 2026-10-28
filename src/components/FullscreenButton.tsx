"use client";

import { useEffect, useState } from "react";

/** ⛶ Full screen on / off (hides the browser bars). Hidden where not supported. */
export function FullscreenButton() {
  const [supported, setSupported] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => void };
    setSupported(Boolean(el.requestFullscreen || el.webkitRequestFullscreen));
    const update = () => setOn(Boolean(document.fullscreenElement));
    update();
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  if (!supported) return null;
  return (
    <button
      type="button"
      aria-label={on ? "Exit full screen" : "Full screen"}
      title={on ? "Exit full screen" : "Full screen"}
      onClick={async () => {
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
          else {
            const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => void };
            if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: "hide" });
            else el.webkitRequestFullscreen?.();
          }
        } catch {
          // the browser said no — nothing to do
        }
      }}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg"
    >
      {on ? "🗗" : "⛶"}
    </button>
  );
}
