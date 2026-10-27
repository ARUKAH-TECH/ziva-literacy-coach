"use client";

import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Captured as early as possible and shared by every page.
let deferred: InstallPromptEvent | null = null;
let installedEvent = false;
const subscribers = new Set<() => void>();
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as InstallPromptEvent;
    subscribers.forEach((s) => s());
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    installedEvent = true;
    subscribers.forEach((s) => s());
  });
}

export type Platform = "android" | "ios" | "desktop" | "other";

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Windows|Macintosh|Linux|CrOS/i.test(ua)) return "desktop";
  return "other";
}

export function useInstall() {
  const [state, setState] = useState({
    canPrompt: false,
    standalone: false,
    justInstalled: false,
    platform: "other" as Platform,
    ready: false,
  });

  useEffect(() => {
    const update = () =>
      setState({
        canPrompt: Boolean(deferred),
        standalone:
          window.matchMedia("(display-mode: standalone)").matches ||
          (navigator as Navigator & { standalone?: boolean }).standalone === true,
        justInstalled: installedEvent,
        platform: detectPlatform(),
        ready: true,
      });
    update();
    subscribers.add(update);
    const mq = window.matchMedia("(display-mode: standalone)");
    mq.addEventListener?.("change", update);
    return () => {
      subscribers.delete(update);
      mq.removeEventListener?.("change", update);
    };
  }, []);

  async function install() {
    if (!deferred) return "unavailable" as const;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    deferred = null;
    subscribers.forEach((s) => s());
    return outcome;
  }

  return { ...state, install };
}
