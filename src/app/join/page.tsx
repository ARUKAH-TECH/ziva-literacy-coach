"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { primaryButton, secondaryButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { levelInfo } from "@/lib/levels";
import { removeLearner, saveLearner, switchLearner, useLearners } from "@/lib/learners";
import { mergeProgress } from "@/lib/progress";
import { openLearner, syncNow } from "@/lib/sync";
import { speak } from "@/lib/speech";
import { whenText } from "@/lib/report";

export default function JoinPage() {
  const online = useOnline();
  const { list, active } = useLearners();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [welcome, setWelcome] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const learner = await openLearner(code);
      const { data, ...profile } = learner;
      saveLearner(profile, true);
      mergeProgress(data, profile.level);
      void syncNow();
      setCode("");
      setWelcome(profile.name);
      speak(`Hello ${profile.name}! Let's learn.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "That code didn't work.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell title="Who is learning?" back="/">
      {welcome && (
        <div role="status" className="mb-5 rounded-3xl bg-emerald-100 p-5 text-center">
          <p className="text-3xl font-extrabold">👋 Hello {welcome}!</p>
          <p className="mt-1 text-emerald-950">Your stars will now be saved for your parent or teacher to see.</p>
          <Link href="/learn/" className={`${primaryButton} mt-3`}>🚀 Start learning</Link>
        </div>
      )}

      <p className="text-lg text-black/70">Tap your name, then start learning. Your stars are saved to your name.</p>

      <div className="mt-4 grid gap-3">
        {list.map((l) => {
          const lvl = levelInfo(l.level);
          const on = l.code === active;
          return (
            <div key={l.code} className={`flex items-center gap-3 rounded-3xl border-2 p-4 ${on ? "border-ziva bg-sky-50" : "border-black/5 bg-white"}`}>
              <button type="button" onClick={() => (switchLearner(l.code), setWelcome(null))} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold text-2xl font-extrabold text-[#14110c]">
                  {l.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xl font-extrabold">
                    {l.name} {on && <span className="text-base text-ziva">✓ learning now</span>}
                  </span>
                  <span className="block text-sm text-black/60">
                    {lvl?.emoji} {lvl?.short} · {l.kind === "school" ? "🏫" : "🏠"} {l.space}
                  </span>
                  <span className="block text-xs text-black/60">
                    {l.missing ? "⚠️ This code no longer works: ask your parent or teacher." : l.lastSync ? `Saved online: ${whenText(l.lastSync)}` : "Not saved online yet"}
                  </span>
                </span>
              </button>
              <button
                type="button"
                aria-label={`Remove ${l.name} from this phone`}
                onClick={() => {
                  if (confirm(`Remove ${l.name} from this phone? Stars already saved online stay safe.`)) removeLearner(l.code);
                }}
                className="h-10 w-10 shrink-0 rounded-full bg-black/5 text-lg"
              >
                ✕
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => switchLearner(null)}
          className={`flex items-center gap-3 rounded-3xl border-2 p-4 text-left ${active === null ? "border-ziva bg-sky-50" : "border-black/5 bg-white"}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/10 text-2xl">🙂</span>
          <span>
            <span className="block text-xl font-extrabold">Guest {active === null && <span className="text-base text-ziva">✓ learning now</span>}</span>
            <span className="block text-sm text-black/60">Stars stay on this phone only</span>
          </span>
        </button>
      </div>

      <form onSubmit={add} className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
        <p className="text-xl font-extrabold">🔑 I have a learner code</p>
        <p className="mt-1 text-sm text-black/60">Your parent or teacher gives you a code like ZV-4K7Q-M2PX.</p>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ZV-XXXX-XXXX"
          autoCapitalize="characters"
          autoComplete="off"
          className="mt-3 w-full rounded-2xl border-2 border-black/15 px-4 py-3 text-center font-mono text-2xl font-bold tracking-widest"
        />
        {error && <p role="alert" className="mt-2 font-semibold text-rose-700">{error}</p>}
        {!online && <p className="mt-2 font-semibold text-amber-800">📴 Connect to the internet to add a learner code.</p>}
        <button type="submit" disabled={busy || !online || code.replace(/[^A-Z0-9]/g, "").length < 8} className={`${primaryButton} mt-3 w-full`}>
          {busy ? "Checking…" : "Open my learning"}
        </button>
      </form>

      <div className="mt-6 rounded-3xl bg-amber-50 p-5">
        <p className="font-extrabold">👨‍👩‍👧 Parent, teacher or head of school?</p>
        <p className="mt-1 text-sm text-black/70">Register with your phone number to add children, get their codes and see their progress.</p>
        <Link href="/account/" className={`${secondaryButton} mt-3`}>Parents &amp; schools</Link>
      </div>
    </AppShell>
  );
}
