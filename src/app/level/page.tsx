"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { LEVELS } from "@/lib/levels";
import { setLevel, useProgress } from "@/lib/progress";

export default function LevelPage() {
  const router = useRouter();
  const { progress } = useProgress();
  return (
    <AppShell title="Choose your class">
      <p className="text-lg text-black/70">Which class are you in? You can change this any time.</p>
      <div className="mt-5 grid gap-4">
        {LEVELS.map((l) => {
          const on = progress.level === l.id;
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setLevel(l.id);
                router.push("/learn/");
              }}
              className={`flex items-center gap-4 rounded-3xl border-4 p-5 text-left shadow-sm active:scale-[0.98] ${
                on ? "border-gold bg-amber-50" : "border-transparent bg-white"
              }`}
            >
              <span aria-hidden="true" className="text-5xl">{l.emoji}</span>
              <span>
                <span className="block text-2xl font-extrabold">{l.label}</span>
                <span className="block text-black/65">{l.blurb}</span>
              </span>
            </button>
          );
        })}
      </div>
    </AppShell>
  );
}
