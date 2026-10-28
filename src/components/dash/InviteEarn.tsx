"use client";

import { useCallback, useEffect, useState } from "react";
import { loadRewards, type Rewards } from "@/lib/account";
import { ShareCode } from "@/components/dash/ShareCode";

const BOOK_TITLE = "THE WICKED AND UNFORGIVING STUDENT";
const readLink = (slug: string, key: string) => `https://zivarukah.com/books/${slug}/read?ref=${key}`;

function keyStatus(k: Rewards["keys"][number]) {
  if (!k.activatedAt) return { label: "Ready — 7 days start when you open it", tone: "bg-emerald-100 text-emerald-900", open: true };
  const ends = k.expiresAt ? new Date(k.expiresAt).getTime() : 0;
  const left = ends - Date.now();
  if (left <= 0) return { label: "Used — 7 days ended", tone: "bg-black/5 text-black/60", open: false };
  const days = Math.ceil(left / 86_400_000);
  return { label: `Open — ${days} day${days === 1 ? "" : "s"} left`, tone: "bg-sky-100 text-sky-900", open: true };
}

/** "Invite & earn": share link, credits, friends' learning days and free reading keys. */
export function InviteEarn() {
  const [r, setR] = useState<Rewards | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setR(await loadRewards());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load.");
    }
  }, []);
  useEffect(() => void load(), [load]);

  if (error) return <p className="rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-800">🎁 Invite & earn: {error}</p>;
  if (!r) return null;

  const link = `https://learn.zivarukah.com/?ref=${r.refCode}`;
  const pct = Math.min(100, Math.round((r.credits / r.goal) * 100));
  const learning = r.invited.filter((f) => !f.done);
  const done = r.invited.filter((f) => f.done).length;

  return (
    <section id="invite" className="rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 p-5 shadow-sm">
      <p className="text-2xl font-extrabold">🎁 Invite &amp; earn a free book</p>
      <p className="mt-1 text-black/75">
        Share your link. Each person who <strong>registers with it</strong> and <strong>learns on 7 different days</strong> gives you{" "}
        <strong>1 credit</strong>. With <strong>{r.goal} credits</strong> you get a secret key to read <strong>{BOOK_TITLE}</strong> free for 7 days.
      </p>

      <div className="mt-4 rounded-2xl bg-white p-4">
        <div className="flex items-end justify-between">
          <p className="text-4xl font-extrabold text-ziva">
            {r.credits}
            <span className="text-lg text-black/50"> / {r.goal} credits</span>
          </p>
          {r.earned > 0 && <p className="text-xs text-black/50">{r.earned} earned in total</p>}
        </div>
        <div className="mt-2 h-4 overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-gradient-to-r from-gold to-orange-500" style={{ width: `${Math.max(r.credits ? 3 : 0, pct)}%` }} />
        </div>
        <p className="mt-2 text-sm text-black/60">
          {r.invited.length} joined with your link · {done} finished 7 days · {learning.length} still learning
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-4">
        <p className="font-bold">📣 Your share link</p>
        <p className="mt-1 break-all rounded-xl bg-black/5 p-2 font-mono text-sm">{link}</p>
        <ShareCode
          code={r.refCode}
          message={`📚 Learn reading, phonics, spelling and handwriting FREE with *ZIVA Literacy* — for KG, Primary and JHS.\n\nRegister with your name and phone here 👇\n${link}`}
        />
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(link);
              setCopied("link");
              setTimeout(() => setCopied(null), 1800);
            } catch {
              // ignore
            }
          }}
          className="mt-2 text-sm font-bold text-ziva underline"
        >
          {copied === "link" ? "✓ Link copied" : "Copy the full link"}
        </button>
      </div>

      {learning.length > 0 && (
        <div className="mt-4 rounded-2xl bg-white p-4">
          <p className="font-bold">👣 Friends learning now</p>
          <ul className="mt-2 grid gap-2">
            {learning.slice(0, 30).map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-24 shrink-0 truncate font-semibold">{f.name}</span>
                <span className="flex flex-1 gap-1">
                  {Array.from({ length: 7 }, (_, d) => (
                    <span key={d} className={`h-3 flex-1 rounded-full ${d < f.days ? "bg-emerald-500" : "bg-black/10"}`} />
                  ))}
                </span>
                <span className="w-10 shrink-0 text-right text-xs text-black/60">{Math.min(7, f.days)}/7</span>
              </li>
            ))}
          </ul>
          {learning.length > 30 && <p className="mt-2 text-xs text-black/50">…and {learning.length - 30} more</p>}
        </div>
      )}

      {r.keys.length > 0 && (
        <div className="mt-4 rounded-2xl bg-white p-4">
          <p className="font-bold">🔑 Your free reading keys</p>
          <ul className="mt-2 grid gap-3">
            {r.keys.map((k) => {
              const st = keyStatus(k);
              return (
                <li key={k.key} className="rounded-xl bg-black/5 p-3">
                  <p className="font-mono text-xl font-extrabold tracking-widest">{k.key}</p>
                  <p className="text-sm font-semibold">{BOOK_TITLE}</p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${st.tone}`}>{st.label}</span>
                  {st.open && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a href={readLink(k.book, k.key)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ziva px-4 py-2 text-sm font-bold text-white">
                        📖 Read now
                      </a>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(k.key);
                            setCopied(k.key);
                            setTimeout(() => setCopied(null), 1800);
                          } catch {
                            // ignore
                          }
                        }}
                        className="rounded-full bg-white px-4 py-2 text-sm font-bold"
                      >
                        {copied === k.key ? "✓ Copied" : "📋 Copy key"}
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-xs text-black/50">Keep your key secret — anyone with it can read during your 7 days.</p>
        </div>
      )}

      <p className="mt-3 text-xs text-black/60">
        A learning day counts when a lesson is finished while signed in (or by a child they added). Days don&apos;t need to be in a row. Your own learning
        days: {r.myDays}.
      </p>
      <button type="button" onClick={load} className="mt-2 text-sm font-bold text-black/60 underline">
        🔄 Refresh
      </button>
    </section>
  );
}
