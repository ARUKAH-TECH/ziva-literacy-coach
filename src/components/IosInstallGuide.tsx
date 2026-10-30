"use client";

import { useEffect, useState } from "react";

// iPhones and iPads don't let websites install themselves: the person must use
// Safari's Share button → "Add to Home Screen". This guide makes that as easy
// as possible: big pictures of what to tap and a bouncing arrow pointing at the
// Share button. Opened from any "Add to Home Screen" button, and shown once on
// its own to iPhone users who haven't installed the app yet.

export const OPEN_IOS_GUIDE = "ziva-open-ios-guide";
const SEEN_KEY = "ziva-literacy:ios-guide-seen";

export function openIosGuide() {
  window.dispatchEvent(new Event(OPEN_IOS_GUIDE));
}

export function iosInfo() {
  const ua = navigator.userAgent;
  const ipad = /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const ios = ipad || /iPhone|iPod/.test(ua);
  // Other browsers and in-app browsers (WhatsApp, Facebook, Instagram…) on iPhone.
  const other = /CriOS|FxiOS|EdgiOS|OPiOS|FBAN|FBAV|Instagram|Line\/|GSA\//.test(ua);
  const installed = window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  // iOS 26 moved Safari's Share button into the "⋯" menu at the bottom right.
  const version = Number((/OS (\d+)_/.exec(ua) ?? [])[1] ?? (/Version\/(\d+)/.exec(ua) ?? [])[1] ?? 0);
  return { ios, ipad, safari: ios && !other, installed, newSafari: version >= 26 };
}

function ShareIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#0a84ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function IosInstallGuide() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ ios: false, ipad: false, safari: false, installed: false, newSafari: false });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const i = iosInfo();
    setInfo(i);
    const show = () => setOpen(true);
    window.addEventListener(OPEN_IOS_GUIDE, show);
    // Show once on its own to iPhone users who haven't installed yet (after they've looked around).
    let t: number | undefined;
    if (i.ios && !i.installed && window.location.pathname === "/") {
      let seen = false;
      try {
        seen = localStorage.getItem(SEEN_KEY) === "yes";
      } catch {
        // ignore
      }
      if (!seen) t = window.setTimeout(show, 6000);
    }
    return () => {
      window.removeEventListener(OPEN_IOS_GUIDE, show);
      if (t) window.clearTimeout(t);
    };
  }, []);

  if (!open) return null;

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, "yes");
    } catch {
      // ignore
    }
  };

  async function copyLink() {
    try {
      await navigator.clipboard.writeText("https://learn.zivarukah.com/");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const step = "flex items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm";
  const num = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ziva text-lg font-extrabold text-white";

  return (
    <div role="dialog" aria-modal="true" aria-label="Add ZIVA Literacy to your Home Screen" className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-3 sm:items-center">
      <div className="mb-24 w-full max-w-md rounded-3xl bg-sky-50 p-5 text-[#14110c] shadow-2xl sm:mb-0">
        <div className="flex items-start gap-3">
          <img src="/icons/apple-180.png" alt="" className="h-14 w-14 rounded-2xl shadow" />
          <div className="flex-1">
            <p className="text-xl font-extrabold leading-tight">Put ZIVA Literacy on your Home Screen</p>
            <p className="mt-1 text-sm text-black/70">It opens like an app, works offline and keeps stars safe.</p>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="h-9 w-9 shrink-0 rounded-full bg-black/10 text-lg">
            ✕
          </button>
        </div>

        {info.ios && !info.safari ? (
          <div className="mt-4 grid gap-3">
            <p className="rounded-2xl bg-amber-100 p-3 font-semibold text-amber-950">
              On iPhone, only <strong>Safari</strong> (the blue compass 🧭) can add apps to the Home Screen.
            </p>
            <div className={step}>
              <span className={num}>1</span>
              <div className="flex-1">
                <p className="font-bold">Copy the link</p>
                <button type="button" onClick={copyLink} className="mt-2 rounded-full bg-ziva px-4 py-2 text-sm font-bold text-white">
                  {copied ? "✓ Copied" : "📋 Copy learn.zivarukah.com"}
                </button>
              </div>
            </div>
            <div className={step}>
              <span className={num}>2</span>
              <p className="flex-1 font-bold">Open Safari 🧭, tap the address bar and paste.</p>
            </div>
            <div className={step}>
              <span className={num}>3</span>
              <p className="flex-1 font-bold">In Safari, tap Add to Home Screen from here again.</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            <div className={step}>
              <span className={num}>1</span>
              <p className="flex-1 font-bold">
                {info.newSafari && !info.ipad ? (
                  <>
                    Tap <span className="text-[#0a84ff]">⋯</span> at the bottom right, then <span className="text-[#0a84ff]">Share</span>
                  </>
                ) : (
                  <>
                    Tap the <span className="text-[#0a84ff]">Share</span> button {info.ipad ? "at the top" : "at the bottom of the screen"}
                  </>
                )}
              </p>
              <span className="rounded-xl border border-black/10 bg-white p-2">
                <ShareIcon />
              </span>
            </div>
            <div className={step}>
              <span className={num}>2</span>
              <p className="flex-1 font-bold">Scroll down and tap “Add to Home Screen”</p>
              <span className="rounded-xl border border-black/10 bg-white p-2">
                <AddIcon />
              </span>
            </div>
            <div className={step}>
              <span className={num}>3</span>
              <p className="flex-1 font-bold">
                Tap <span className="text-[#0a84ff]">Add</span> (top right). Done! 🎉
              </p>
            </div>
            <p className="text-center text-xs text-black/60">Can’t see “Add to Home Screen”? Scroll to the bottom of the list and tap “Edit Actions…” to add it.</p>
          </div>
        )}

        <button type="button" onClick={close} className="mt-4 w-full rounded-full bg-gold py-3 text-lg font-extrabold text-[#14110c]">
          Got it
        </button>
      </div>

      {info.safari && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed flex flex-col items-center ${
            info.ipad ? "right-24 top-2" : info.newSafari ? "bottom-2 right-2" : "bottom-2 left-1/2 -translate-x-1/2"
          }`}
        >
          {info.ipad ? (
            <>
              <span className="animate-bounce text-5xl">⬆️</span>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-[#0a84ff] shadow">Share</span>
            </>
          ) : (
            <>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-[#0a84ff] shadow">
                {info.newSafari ? "Tap ⋯ then Share" : "Tap Share below"}
              </span>
              <span className="animate-bounce text-5xl">⬇️</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
