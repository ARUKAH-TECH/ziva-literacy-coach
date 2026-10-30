"use client";

import { useEffect, useState } from "react";
import { SPEEDS, SPEED_EVENT, getSpeed, setSpeed, speak, type SpeedId } from "@/lib/speech";

/** Slow / Normal / Fast voice speed, remembered on this phone. */
export function VoiceSpeed({ className = "" }: { className?: string }) {
  const [speed, set] = useState<SpeedId>("normal");
  useEffect(() => {
    const update = () => set(getSpeed());
    update();
    window.addEventListener(SPEED_EVENT, update);
    return () => window.removeEventListener(SPEED_EVENT, update);
  }, []);
  return (
    <div className={`flex flex-wrap items-center gap-1.5 rounded-2xl bg-white px-3 py-2 shadow-sm ${className}`} role="group" aria-label="Voice speed">
      <span className="text-sm font-bold text-black/70">Voice:</span>
      {SPEEDS.map((s) => (
        <button
          key={s.id}
          type="button"
          aria-pressed={speed === s.id}
          onClick={() => {
            setSpeed(s.id);
            speak("Apple. Ball. Cat.");
          }}
          className={`rounded-full px-2.5 py-1.5 text-sm font-bold ${speed === s.id ? "bg-ziva text-white" : "bg-black/5 text-black/70"}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
