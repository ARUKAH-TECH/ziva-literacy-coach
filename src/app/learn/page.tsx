"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { BigLink } from "@/components/ui";
import { activitiesFor, levelInfo } from "@/lib/levels";
import { useProgress } from "@/lib/progress";

const COLORS = ["bg-amber-100", "bg-sky-100", "bg-emerald-100", "bg-rose-100", "bg-violet-100", "bg-lime-100", "bg-orange-100", "bg-cyan-100", "bg-fuchsia-100"];

export default function LearnPage() {
  const { progress, loaded } = useProgress();
  const level = levelInfo(progress.level);
  if (loaded && !level) {
    return (
      <AppShell title="Start learning">
        <p className="text-lg">First, choose your class.</p>
        <Link href="/level/" className="mt-4 inline-block rounded-full bg-ziva px-6 py-3 text-lg font-bold text-white">
          Choose class
        </Link>
      </AppShell>
    );
  }
  const list = activitiesFor(progress.level);
  return (
    <AppShell title={level ? `${level.label} lessons` : "Lessons"}>
      <div className="grid gap-4">
        {list.map((a, i) => (
          <BigLink key={a.id} href={a.href} emoji={a.emoji} title={a.title} text={a.text} color={COLORS[i % COLORS.length]} />
        ))}
      </div>
    </AppShell>
  );
}
