"use client";

import Link from "next/link";

export function Stars({ count, size = "text-3xl" }: { count: number; size?: string }) {
  return (
    <span aria-label={`${count} out of 3 stars`} className={`${size} tracking-wider`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < count ? "pop inline-block" : "inline-block opacity-25 grayscale"} style={{ animationDelay: `${i * 0.15}s` }}>
          ⭐
        </span>
      ))}
    </span>
  );
}

export function BigLink({ href, emoji, title, text, color = "bg-white" }: { href: string; emoji: string; title: string; text?: string; color?: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 rounded-3xl border-2 border-black/5 ${color} p-4 shadow-sm transition-transform active:scale-[0.98]`}
    >
      <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-4xl shadow-inner">
        {emoji}
      </span>
      <span className="min-w-0">
        <span className="block text-xl font-extrabold leading-tight">{title}</span>
        {text && <span className="mt-0.5 block text-sm text-black/65">{text}</span>}
      </span>
    </Link>
  );
}

export const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ziva px-6 py-3 text-lg font-bold text-white shadow active:scale-[0.98] disabled:opacity-40";
export const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-ziva bg-white px-6 py-3 text-lg font-bold text-ziva active:scale-[0.98] disabled:opacity-40";
export const goldButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-lg font-bold text-[#14110c] shadow active:scale-[0.98] disabled:opacity-40";

/** Shown at the end of an exercise. */
export function Finished({ stars, message, onAgain, nextHref, nextLabel }: { stars: number; message: string; onAgain: () => void; nextHref?: string; nextLabel?: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow">
      <Stars count={stars} size="text-5xl" />
      <p className="text-2xl font-extrabold">{stars === 3 ? "Excellent!" : stars === 2 ? "Well done!" : stars === 1 ? "Good try!" : "Keep practising!"}</p>
      <p className="text-lg text-black/70">{message}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onAgain} className={secondaryButton}>
          🔁 Try again
        </button>
        {nextHref && (
          <Link href={nextHref} className={primaryButton}>
            {nextLabel ?? "Next"} →
          </Link>
        )}
      </div>
    </div>
  );
}
