"use client";

import Link from "next/link";
import { levelInfo } from "@/lib/levels";
import { useProgress } from "@/lib/progress";
import { useLearners } from "@/lib/learners";
import { useOnline } from "@/components/useOnline";
import { FullscreenButton } from "@/components/FullscreenButton";
import { stopSpeaking } from "@/lib/speech";

/** Header with Home, the chosen class, and an offline notice. */
export function AppShell({ title, back = "/", children }: { title?: string; back?: string | null; children: React.ReactNode }) {
  const { progress } = useProgress();
  const online = useOnline();
  const level = levelInfo(progress.level);
  const { current } = useLearners();
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 bg-ziva text-white shadow-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          {back ? (
            <Link href={back} onClick={stopSpeaking} aria-label="Back" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl">
              ←
            </Link>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/logo.webp" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full bg-white shadow" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-extrabold leading-tight">{title ?? "ZIVA Literacy"}</p>
            {title && <p className="hidden text-xs text-white/80 sm:block">ZIVA Literacy & Handwriting Coach</p>}
          </div>
          <Link
            href="/join/"
            aria-label={current ? `${current.name} — change who is learning` : "Guest — choose who is learning"}
            className="flex h-9 max-w-[6.5rem] shrink-0 items-center gap-1 rounded-full bg-black/25 px-3 text-sm font-bold"
          >
            <span aria-hidden="true">{current ? "🧒" : "👤"}</span>
            <span className="truncate">{current ? current.name : "Guest"}</span>
          </Link>
          <FullscreenButton />
          <Link href="/level/" className="shrink-0 rounded-full bg-gold px-3 py-1.5 text-sm font-bold text-[#14110c]">
            {level ? `${level.emoji} ${level.short}` : "Choose class"}
          </Link>
        </div>
        {!online && (
          <p role="status" className="bg-amber-300 px-4 py-1.5 text-center text-sm font-semibold text-amber-950">
            📴 You’re offline — saved lessons still work. Progress is kept on this device.
          </p>
        )}
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
