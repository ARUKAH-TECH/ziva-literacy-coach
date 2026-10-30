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

// Voice speed chosen by the user (Slow / Normal / Fast). Each lesson asks for a
// rate relative to 0.9 (its "normal"); the chosen speed scales that, so a lesson
// that wants a slower letter sound is still a little slower than plain speech.
export const SPEEDS = [
  { id: "slow", label: "🐢 Slow", factor: 0.78 },
  { id: "normal", label: "🔊 Normal", factor: 0.95 },
  { id: "fast", label: "🐇 Fast", factor: 1.12 },
] as const;
export type SpeedId = (typeof SPEEDS)[number]["id"];
const SPEED_KEY = "ziva-literacy:voice-speed";
export const SPEED_EVENT = "ziva-voice-speed";

export function getSpeed(): SpeedId {
  try {
    const s = localStorage.getItem(SPEED_KEY);
    if (s === "slow" || s === "normal" || s === "fast") return s;
  } catch {
    // ignore
  }
  return "normal";
}

export function setSpeed(id: SpeedId) {
  try {
    localStorage.setItem(SPEED_KEY, id);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(SPEED_EVENT));
}

function effectiveRate(requested = 0.9) {
  const factor = SPEEDS.find((s) => s.id === getSpeed())?.factor ?? 0.95;
  // "Hear it slowly" buttons (very low rates) stay clearly slow.
  const r = requested < 0.65 ? requested * Math.min(factor, 1) : (requested / 0.9) * factor;
  return Math.max(0.5, Math.min(1.6, r));
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
  u.rate = effectiveRate(options.rate);
  u.pitch = 1;
  u.volume = 1;
  if (options.onEnd) u.onend = () => options.onEnd?.();
  if (options.onBoundary) u.onboundary = (e) => options.onBoundary?.(e.charIndex);
  synth.speak(u);
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}
