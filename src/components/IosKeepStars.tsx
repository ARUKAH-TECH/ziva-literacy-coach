"use client";

import { openIosGuide } from "@/components/IosInstallGuide";
import { useEffect, useState } from "react";

// iPhone/iPad Safari may clear a website's saved data (stars) after about a
// week without a visit — unless the app is on the Home Screen. A small,
// dismissible reminder for iPhone users who haven't added it yet.

const KEY = "ziva-literacy:ios-tip-closed";

export function IosKeepStars() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
    const installed = window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
    let closed = false;
    try {
      closed = localStorage.getItem(KEY) === "yes";
    } catch {
      // ignore
    }
    setShow(ios && !installed && !closed);
  }, []);
  if (!show) return null;
  return (
    <div role="note" className="mb-5 flex items-start gap-3 rounded-3xl bg-amber-100 p-4 text-amber-950 shadow-sm">
      <span className="text-2xl" aria-hidden="true">📲</span>
      <div className="flex-1 text-sm">
        <p className="font-bold">Keep your stars safe on iPhone</p>
        <p className="mt-0.5">
          Add ZIVA Literacy to your <strong>Home Screen</strong> (Share ⬆️ → Add to Home Screen). Safari can clear saved stars after a week away. Registered
          learners&apos; stars are also saved online.
        </p>
        <button type="button" onClick={openIosGuide} className="mt-2 rounded-full bg-amber-950 px-4 py-2 text-sm font-bold text-white">
          📲 Show me how
        </button>
      </div>
      <button
        type="button"
        aria-label="Close"
        onClick={() => {
          setShow(false);
          try {
            localStorage.setItem(KEY, "yes");
          } catch {
            // ignore
          }
        }}
        className="h-8 w-8 shrink-0 rounded-full bg-black/10"
      >
        ✕
      </button>
    </div>
  );
}
