"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CLASSES } from "@/content/creative-arts/curriculum";
import { levelInfo } from "@/lib/levels";
import { useProgress } from "@/lib/progress";

// Creative Arts: pick your class. Learners see the classes of the level they
// chose (P1–3, P4–6 or JHS); everything is free and needs no sign-up.

export default function CreativeArtsHome() {
  const { progress } = useProgress();
  const level = levelInfo(progress.level);
  const shown = CLASSES.filter((c) => !level || c.level === level.id);
  return (
    <AppShell title="Creative Arts" back="/learn/">
      <p className="text-lg text-black/70">
        Drawing, colours, Visual Arts, Music, Dance and Drama, and Design. Primary and JHS follow the official NaCCA Creative Arts curriculum. Notes, pictures, practical steps and quizzes. Choose your class:
      </p>
      <Link href="/creative-arts/search/" className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-ziva/30 bg-white px-4 py-3 text-lg text-black/50">
        <span aria-hidden="true">🔍</span> Search a topic (e.g. shading, weaving, drum)
      </Link>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {shown.map((c, i) => (
          <Link
            key={c.id}
            href={`/creative-arts/${c.id}/`}
            className={`rounded-3xl p-5 shadow-sm ${["bg-amber-100", "bg-sky-100", "bg-emerald-100"][i % 3]}`}
          >
            <p className="text-3xl" aria-hidden="true">
              🎨
            </p>
            <p className="mt-1 text-2xl font-extrabold text-ziva">{c.label}</p>
            <p className="text-sm font-semibold text-black/60">Tap to see your lessons</p>
          </Link>
        ))}
      </div>
      {level && (
        <p className="mt-6 text-sm text-black/60">
          Showing {level.label}.{" "}
          <Link href="/level/" className="font-bold text-ziva underline">
            Change class
          </Link>
        </p>
      )}
    </AppShell>
  );
}
