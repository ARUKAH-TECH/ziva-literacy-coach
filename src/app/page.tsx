"use client";

import { AppShell } from "@/components/AppShell";
import { BigLink } from "@/components/ui";
import { InstallCard } from "@/components/InstallCard";
import { ShareButtons } from "@/components/ShareButtons";
import { levelInfo } from "@/lib/levels";
import { useProgress, streak } from "@/lib/progress";

export default function Home() {
  const { progress, loaded } = useProgress();
  const level = levelInfo(progress.level);
  const days = streak(progress.days);
  return (
    <AppShell back={null}>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ziva to-ziva-dark p-6 text-white shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.webp"
          alt="ZIVA Literacy — a sub of ZIVA Online and Special Classes"
          width={128}
          height={128}
          className="float-right mb-2 ml-3 h-24 w-24 rounded-full bg-white shadow-xl ring-4 ring-white/30 sm:h-32 sm:w-32"
        />
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

      <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
        <p className="text-lg font-extrabold">📣 Share ZIVA Literacy</p>
        <p className="mt-1 text-black/70">Free for every child — send it to parents, teachers and friends.</p>
        <ShareButtons
          className="mt-3"
          label="Send"
          url="https://learn.zivarukah.com/"
          title="ZIVA Literacy & Handwriting Coach"
          message={"✏️ *ZIVA Literacy & Handwriting Coach* — FREE\n\nReading, phonics, spelling and handwriting practice for KG, Primary and JHS. Reads stories aloud, lets children trace letters with their finger and gives up to ⭐⭐⭐⭐⭐. Install it on your phone — works offline 👇"}
        />
      </section>

      <p className="mt-8 text-center text-sm text-black/60">
        Free practice from <a href="https://zivarukah.com/ziva" className="font-semibold underline">ZIVA Special Classes</a>. No sign-up — progress stays on this device.
      </p>
    </AppShell>
  );
}
