"use client";

// Read-aloud with the phone's own voices (free, works offline on most
// Android phones once a voice is installed). Falls back silently if the
// browser has no speech support.

import { getAccent, onAccentChange } from "@/lib/accent";

let preferred: SpeechSynthesisVoice | null = null;

function pickVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (preferred) return preferred;
  const voices = window.speechSynthesis.getVoices();
  const accent = getAccent().toLowerCase();
  const sameLang = (v: SpeechSynthesisVoice) => v.lang.replace("_", "-").toLowerCase() === accent;
  // The reader's own English first (e.g. a Nigerian voice, if the phone has one).
  preferred =
    voices.find((v) => sameLang(v) && /google/i.test(v.name)) ??
    voices.find(sameLang) ??
    voices.find((v) => v.lang === "en-GB" && /female|google/i.test(v.name)) ??
    voices.find((v) => v.lang === "en-GB") ??
    voices.find((v) => v.lang.startsWith("en")) ??
    null;
  return preferred;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    preferred = null;
    pickVoice();
  });
  onAccentChange(() => {
    preferred = null;
  });
}

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, options: { rate?: number; onEnd?: () => void; onBoundary?: (charIndex: number) => void } = {}) {
  if (!canSpeak()) {
    options.onEnd?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? "en-GB";
  u.rate = options.rate ?? 0.9;
  u.pitch = 1.05;
  if (options.onEnd) u.onend = () => options.onEnd?.();
  if (options.onBoundary) u.onboundary = (e) => options.onBoundary?.(e.charIndex);
  synth.speak(u);
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}
