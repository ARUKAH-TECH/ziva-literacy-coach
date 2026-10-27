"use client";

import Link from "next/link";
import { levelInfo } from "@/lib/levels";
import { useProgress } from "@/lib/progress";
import { useOnline } from "@/components/useOnline";
import { stopSpeaking } from "@/lib/speech";

/** Header with Home, the chosen class, and an offline notice. */
export function AppShell({ title, back = "/", children }: { title?: string; back?: string | null; children: React.ReactNode }) {
  const { progress } = useProgress();
  const online = useOnline();
  const level = levelInfo(progress.level);
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 bg-ziva text-white shadow-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          {back ? (
            <Link href={back} onClick={stopSpeaking} aria-label="Back" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl">
              ←
            </Link>
          ) : (
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl">
              ✏️
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-extrabold leading-tight">{title ?? "ZIVA Literacy"}</p>
            {title && <p className="text-xs text-white/80">ZIVA Literacy & Handwriting Coach</p>}
          </div>
          <Link href="/level/" className="rounded-full bg-gold px-3 py-1.5 text-sm font-bold text-[#14110c]">
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
