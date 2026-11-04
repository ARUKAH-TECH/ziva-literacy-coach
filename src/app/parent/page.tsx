"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ProgressSummary } from "@/components/ProgressSummary";
import { primaryButton, secondaryButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { levelInfo } from "@/lib/levels";
import { type Followed, type ParentView, followedList, forgetFollowed, formatCode, openParentView, saveFollowed } from "@/lib/parentLink";

// For a parent who is not near the child: open the parent code (or the link
// the child's phone sent) to see the stars. Nothing to register.

export default function ParentPage() {
  const online = useOnline();
  const [code, setCode] = useState("");
  const [saved, setSaved] = useState<Followed[]>([]);
  const [view, setView] = useState<{ code: string; data: ParentView } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(async (raw: string) => {
    const c = formatCode(raw, "PV");
    setBusy(true);
    setError(null);
    try {
      const data = await openParentView(c);
      setView({ code: c, data });
      saveFollowed({ code: c, name: data.name });
      setSaved(followedList());
      setCode("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "That code didn't work.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    setSaved(followedList());
    const fromLink = decodeURIComponent(window.location.hash.slice(1));
    if (/^PV-?[A-Z0-9]{4}-?[A-Z0-9]{4}$/i.test(fromLink)) {
      history.replaceState(null, "", window.location.pathname);
      void open(fromLink);
    }
  }, [open]);

  if (view) {
    const lvl = levelInfo(view.data.level);
    return (
      <AppShell title={`${view.data.name}'s progress`} back="/parent/">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-3xl font-extrabold">{view.data.name}</p>
            <p className="text-black/60">
              {lvl?.emoji} {lvl?.label}
            </p>
          </div>
          <button type="button" onClick={() => void open(view.code)} disabled={busy || !online} className="rounded-full bg-black/5 px-4 py-2 text-sm font-bold">
            {busy ? "…" : "🔄 Refresh"}
          </button>
        </div>
        <div className="mt-4">
          <ProgressSummary level={view.data.level} progress={view.data.data} />
        </div>
        <p className="mt-4 text-xs text-black/60">
          Stars are sent from the child&apos;s phone whenever it is online, so very recent practice done offline may show later.
        </p>
        <button type="button" onClick={() => setView(null)} className={`${secondaryButton} mt-4`}>
          ← All my children
        </button>
      </AppShell>
    );
  }

  return (
    <AppShell title="For parents" back="/">
      <div className="rounded-3xl bg-gradient-to-br from-ziva to-ziva-dark p-5 text-white shadow">
        <p className="text-2xl font-extrabold">👨‍👩‍👧 Follow your child from anywhere</p>
        <p className="mt-1 text-white/90">Free, with nothing to register. See the stars, practice days and skills on your own phone.</p>
      </div>

      {saved.length > 0 && (
        <section className="mt-5 grid gap-3">
          <p className="font-extrabold">My children</p>
          {saved.map((f) => (
            <div key={f.code} className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-sm">
              <button type="button" onClick={() => void open(f.code)} disabled={busy || !online} className="flex-1 text-left">
                <span className="block text-xl font-extrabold">🧒 {f.name}</span>
                <span className="block font-mono text-xs text-black/60">{f.code}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  forgetFollowed(f.code);
                  setSaved(followedList());
                }}
                aria-label={`Remove ${f.name} from this phone`}
                className="h-10 w-10 rounded-full bg-black/5"
              >
                ✕
              </button>
            </div>
          ))}
        </section>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void open(code);
        }}
        className="mt-5 rounded-3xl bg-white p-5 shadow-sm"
      >
        <p className="text-xl font-extrabold">🔑 I have a parent code</p>
        <p className="mt-1 text-sm text-black/60">It looks like PV-4K7Q-M2PX and comes from the child&apos;s phone.</p>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="PV-XXXX-XXXX"
          autoCapitalize="characters"
          autoComplete="off"
          className="mt-3 w-full rounded-2xl border-2 border-black/15 px-4 py-3 text-center font-mono text-2xl font-bold tracking-widest"
        />
        {error && (
          <p role="alert" className="mt-2 font-semibold text-rose-700">
            {error}
          </p>
        )}
        {!online && <p className="mt-2 font-semibold text-amber-800">📴 Connect to the internet to see progress.</p>}
        <button type="submit" disabled={busy || !online || code.replace(/[^A-Z0-9]/g, "").length < 10} className={`${primaryButton} mt-3 w-full`}>
          {busy ? "Opening…" : "See progress"}
        </button>
      </form>

      <section className="mt-5 rounded-3xl bg-amber-50 p-5">
        <p className="font-extrabold">How to get a parent code</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-black/80">
          <li>On the child&apos;s phone, open learn.zivarukah.com and tap <strong>My progress</strong>.</li>
          <li>
            Tap <strong>Let a parent follow</strong>, type the child&apos;s first name and tick the box.
          </li>
          <li>Send the parent link on WhatsApp. Open it on your phone. That&apos;s all.</li>
        </ol>
        <p className="mt-3 text-sm text-black/60">The parent code can only look. It can&apos;t change anything on the child&apos;s phone.</p>
        <Link href="/progress/" className={`${secondaryButton} mt-3`}>
          This is the child&apos;s phone
        </Link>
      </section>
    </AppShell>
  );
}
