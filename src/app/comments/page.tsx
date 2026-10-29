"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { primaryButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { call, useSession } from "@/lib/account";
import { rpc } from "@/lib/cloud";

// Comments & suggestions. Anyone can read approved ones; registered people
// can send. Everything is checked by ZIVA before it is shown to everyone.

interface PublicComment {
  id: string;
  author: string;
  kind: "comment" | "suggestion";
  body: string;
  reply: string | null;
  at: string;
}
interface MyComment {
  id: string;
  kind: "comment" | "suggestion";
  body: string;
  status: "pending" | "approved" | "hidden";
  reply: string | null;
  at: string;
}

const when = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function CommentsPage() {
  const online = useOnline();
  const { session, ready } = useSession();
  const [list, setList] = useState<PublicComment[] | null>(null);
  const [mine, setMine] = useState<MyComment[]>([]);
  const [kind, setKind] = useState<"comment" | "suggestion">("comment");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    try {
      setList(await rpc<PublicComment[]>("lit_comments_public", { p_limit: 100 }));
    } catch {
      setList((l) => l ?? []);
    }
    if (session) {
      try {
        setMine(await call<MyComment[]>("lit_my_comments"));
      } catch {
        // ignore
      }
    }
  }, [session]);

  useEffect(() => {
    if (ready) void load();
  }, [ready, load]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      await call("lit_comment_post", { p_kind: kind, p_body: body });
      setBody("");
      setMsg({ ok: true, text: "Thank you! ZIVA will read it, and once approved everyone can see it." });
      void load();
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "That didn't send. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell title="Comments & suggestions" back="/">
      <div className="rounded-3xl bg-gradient-to-br from-ziva to-ziva-dark p-5 text-white shadow">
        <p className="text-2xl font-extrabold">💬 Comments &amp; suggestions</p>
        <p className="mt-1 text-white/90">Tell us what you like and what we should add. Approved messages are shown here for everyone.</p>
      </div>

      {!ready ? null : session ? (
        <form onSubmit={send} className="mt-5 grid gap-3 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex gap-2">
            {(["comment", "suggestion"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`flex-1 rounded-full py-2 font-bold ${kind === k ? "bg-ziva text-white" : "bg-black/5 text-black/70"}`}
              >
                {k === "comment" ? "💬 Comment" : "💡 Suggestion"}
              </button>
            ))}
          </div>
          <label className="grid gap-1 font-semibold">
            Your message
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              maxLength={600}
              placeholder={kind === "comment" ? "e.g. My daughter loves the tracing." : "e.g. Please add more stories about animals."}
              className="rounded-2xl border-2 border-black/15 bg-white px-4 py-3 text-lg font-normal"
            />
          </label>
          <p className="text-xs text-black/60">
            Shown with your first name only. Please don&apos;t include phone numbers, links or children&apos;s full names. {600 - body.length} letters left.
          </p>
          {msg && <p role="status" className={`rounded-2xl p-3 font-semibold ${msg.ok ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-800"}`}>{msg.text}</p>}
          {!online && <p className="font-semibold text-amber-800">📴 Connect to the internet to send.</p>}
          <button type="submit" disabled={busy || !online || body.trim().length < 3} className={primaryButton}>
            {busy ? "Sending…" : "Send"}
          </button>
        </form>
      ) : (
        <div className="mt-5 rounded-3xl bg-amber-50 p-5">
          <p className="font-semibold">To send a comment or suggestion, register free with your name and phone (or sign in).</p>
          <Link href="/account/" className={`${primaryButton} mt-3`}>Register / sign in</Link>
        </div>
      )}

      {mine.length > 0 && (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <p className="font-extrabold">📨 What I sent</p>
          <ul className="mt-2 grid gap-2">
            {mine.map((c) => (
              <li key={c.id} className="rounded-2xl bg-black/5 p-3 text-sm">
                <p>{c.body}</p>
                <p className="mt-1 text-xs font-bold text-black/60">
                  {c.status === "approved" ? "✅ Shown to everyone" : c.status === "pending" ? "⏳ Waiting for approval" : "🙈 Not shown"} · {when(c.at)}
                </p>
                {c.reply && <p className="mt-1 rounded-xl bg-sky-50 p-2 text-sky-950">↩️ ZIVA: {c.reply}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6">
        <p className="text-xl font-extrabold">What people are saying</p>
        {list === null ? (
          <p className="mt-3 text-black/60">Loading…</p>
        ) : list.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-white p-4 text-black/60">{online ? "No comments yet. Be the first!" : "📴 Connect to the internet to see comments."}</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {list.map((c) => (
              <li key={c.id} className="rounded-3xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-extrabold text-[#14110c]">{c.author.slice(0, 1).toUpperCase()}</span>
                  <span className="font-bold">{c.author}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${c.kind === "suggestion" ? "bg-amber-100 text-amber-900" : "bg-sky-100 text-sky-900"}`}>
                    {c.kind === "suggestion" ? "💡 Suggestion" : "💬 Comment"}
                  </span>
                  <span className="ml-auto text-xs text-black/60">{when(c.at)}</span>
                </div>
                <p className="mt-2 text-lg">{c.body}</p>
                {c.reply && <p className="mt-2 rounded-2xl bg-sky-50 p-3 text-sky-950">↩️ <strong>ZIVA:</strong> {c.reply}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
}
