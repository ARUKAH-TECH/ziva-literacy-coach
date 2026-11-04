"use client";

import Link from "next/link";
import { useState } from "react";
import { ShareCode } from "@/components/dash/ShareCode";
import { primaryButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { useLearners } from "@/lib/learners";
import type { LevelId } from "@/lib/levels";
import { parentLink, startParentLink, viewCodeForActive } from "@/lib/parentLink";

/** On the child's phone: let a parent who is far away follow the stars. */
export function ParentLinkCard({ level }: { level: LevelId | null }) {
  const online = useOnline();
  const { current } = useLearners();
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<string | null>(null);
  const code = view ?? current?.viewCode ?? null;

  async function run(fn: () => Promise<string | null>) {
    setBusy(true);
    setError(null);
    try {
      setView(await fn());
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const who = current?.name ?? "your child";

  return (
    <section id="parent" className="mt-8 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 p-5 shadow-sm">
      <p className="text-xl font-extrabold">👨‍👩‍👧 Let a parent follow</p>

      {code ? (
        <>
          <p className="mt-1 text-black/75">
            Send this to a parent. They open it on their phone to see {who}&apos;s stars, from anywhere. Stars are sent whenever this phone is online.
          </p>
          <div className="mt-3 rounded-2xl bg-white p-4">
            <p className="font-bold">Parent code</p>
            <ShareCode
              code={code}
              message={`👨‍👩‍👧 See ${current?.name ?? "my"}'s reading and handwriting progress on *ZIVA Literacy* (free).\n\nOpen this link on your phone 👇\n${parentLink(code)}\n\nParent code: *${code}*`}
            />
          </div>
        </>
      ) : current ? (
        <>
          <p className="mt-1 text-black/75">Get a parent code for {current.name}, so a parent can follow from their own phone.</p>
          {error && <p role="alert" className="mt-2 font-semibold text-rose-700">{error}</p>}
          <button type="button" onClick={() => void run(viewCodeForActive)} disabled={busy || !online} className={`${primaryButton} mt-3`}>
            {busy ? "Getting the code…" : "Get the parent code"}
          </button>
        </>
      ) : !level ? (
        <p className="mt-1 text-black/75">
          First <Link href="/level/" className="font-bold underline">choose the class</Link>, then come back here.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void run(() => startParentLink(name, level));
          }}
          className="mt-2 grid gap-3"
        >
          <p className="text-black/75">
            Is the parent far away? Make a parent code. The parent sees the stars on their own phone. No phone numbers, no registration.
          </p>
          <label className="grid gap-1 font-semibold">
            Child&apos;s first name or nickname
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              autoComplete="off"
              placeholder="e.g. Kofi"
              className="rounded-2xl border-2 border-black/15 bg-white px-4 py-3 text-lg font-normal"
            />
          </label>
          <label className="flex items-start gap-3 rounded-2xl bg-white p-3 text-sm">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-5 w-5 shrink-0" />
            <span>
              I am the child&apos;s parent or guardian, or I have their permission. I agree that the first name, class and stars are saved online so the parent can
              see them.
            </span>
          </label>
          {error && <p role="alert" className="font-semibold text-rose-700">{error}</p>}
          {!online && <p className="font-semibold text-amber-800">📴 Connect to the internet to make a parent code.</p>}
          <button type="submit" disabled={busy || !online || !agree} className={primaryButton}>
            {busy ? "Making the code…" : "Make a parent code"}
          </button>
        </form>
      )}
    </section>
  );
}
