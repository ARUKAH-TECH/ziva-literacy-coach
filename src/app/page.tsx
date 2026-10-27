"use client";

import { AppShell } from "@/components/AppShell";
import { BigLink } from "@/components/ui";
import { InstallCard } from "@/components/InstallCard";
import { levelInfo } from "@/lib/levels";
import { useProgress, streak } from "@/lib/progress";

export default function Home() {
  const { progress, loaded } = useProgress();
  const level = levelInfo(progress.level);
  const days = streak(progress.days);
  return (
    <AppShell back={null}>
      <section className="rounded-3xl bg-gradient-to-br from-ziva to-ziva-dark p-6 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">ZIVA Special Classes</p>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight sm:text-4xl">Literacy & Handwriting Coach</h1>
        <p className="mt-2 text-lg text-white/90">Read, listen, spell and write — one small step every day.</p>
        {loaded && level && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-semibold">
            {level.emoji} {level.label}
            {days > 0 && <span>· 🔥 {days} day{days === 1 ? "" : "s"}</span>}
          </p>
        )}
      </section>

      <div className="mt-6 grid gap-4">
        <BigLink href={level ? "/learn/" : "/level/"} emoji="🚀" title="Start learning" text={level ? `Lessons for ${level.label}` : "First, choose your class"} color="bg-amber-100" />
        <BigLink href="/level/" emoji="🏫" title="Select class or level" text="KG, Primary 1–3, Primary 4–6 or JHS" color="bg-sky-100" />
        <BigLink href="/reading/" emoji="📖" title="Reading practice" text="Stories, read-aloud and questions" color="bg-emerald-100" />
        <BigLink href="/handwriting/" emoji="✏️" title="Handwriting practice" text="Trace strokes, letters, words and sentences" color="bg-rose-100" />
        <BigLink href="/progress/" emoji="🏆" title="My progress" text="Stars and practice days on this device" color="bg-violet-100" />
      </div>

      <div className="mt-6">
        <InstallCard compact />
      </div>

      <p className="mt-8 text-center text-sm text-black/60">
        Free practice from <a href="https://zivarukah.com/ziva" className="font-semibold underline">ZIVA Special Classes</a>. No sign-up — progress stays on this device.
      </p>
    </AppShell>
  );
}
