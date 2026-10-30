"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { goldButton, primaryButton, secondaryButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { SpaceView } from "@/components/dash/SpaceView";
import { InviteEarn } from "@/components/dash/InviteEarn";
import { Subscriptions } from "@/components/dash/Subscriptions";
import { call, captureRef, loadMe, prettyPhone, register, savedRef, signIn, signOut, useSession, type Me } from "@/lib/account";
import { CloudError, rpc } from "@/lib/cloud";
import { iosInfo, openIosGuide } from "@/components/IosInstallGuide";

const input = "w-full rounded-2xl border-2 border-black/15 bg-white px-4 py-3 text-xl";

function SignInForm() {
  const online = useOnline();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [inviter, setInviter] = useState<string | null>(null);
  useEffect(() => {
    captureRef();
    const ref = savedRef();
    if (!ref) return;
    setMode("register");
    rpc<string | null>("lit_ref_info", { p_ref: ref })
      .then((n) => setInviter(n || null))
      .catch(() => {});
  }, []);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "register") await register(phone, name);
      else await signIn(phone);
      // On iPhone, show how to put the app on the Home Screen straight after registering.
      const i = iosInfo();
      if (mode === "register" && i.ios && !i.installed) window.setTimeout(openIosGuide, 800);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "That didn't work.";
      setError(msg);
      if (/please register/i.test(msg)) setMode("register");
      if (/please sign in/i.test(msg)) setMode("signin");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl bg-gradient-to-br from-ziva to-ziva-dark p-6 text-white shadow-lg">
        <p className="text-3xl">👨‍👩‍👧 🏫</p>
        <h1 className="mt-2 text-2xl font-extrabold">Register to learn or follow learners</h1>
        <p className="mt-1 text-white/90">
          Students, parents, teachers and schools: register with your name and phone. Learn yourself, or add children and see their stars,
          practice days and what to work on.
        </p>
      </div>

      {inviter && (
        <p className="mt-4 rounded-2xl bg-amber-100 p-4 text-center text-lg font-semibold text-amber-950">
          🎉 {inviter} invited you! Register below with your name and phone, then learn on 7 days.
        </p>
      )}

      <div className="mt-5 flex rounded-full bg-white p-1 shadow-sm">
        {(["signin", "register"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => (setMode(m), setError(null))}
            className={`flex-1 rounded-full py-3 text-lg font-bold ${mode === m ? "bg-ziva text-white" : "text-black/60"}`}
          >
            {m === "signin" ? "Sign in" : "Register"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-4 grid gap-4 rounded-3xl bg-white p-5 shadow-sm">
        {mode === "register" && (
          <label className="grid gap-1 font-semibold">
            Your name
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} placeholder="e.g. Mrs Ama Mensah" className={input} />
          </label>
        )}
        <label className="grid gap-1 font-semibold">
          Phone number
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 024 123 4567"
            className={input}
          />
        </label>
        {error && <p role="alert" className="font-semibold text-rose-700">{error}</p>}
        {!online && <p className="font-semibold text-amber-800">📴 Connect to the internet to sign in.</p>}
        <button type="submit" disabled={busy || !online || phone.replace(/\D/g, "").length < 9 || (mode === "register" && !name.trim())} className={primaryButton}>
          {busy ? "Please wait…" : mode === "register" ? "Register" : "Sign in"}
        </button>
        <p className="text-xs text-black/60">
          No password needed: you sign in with your phone number and this phone stays signed in. Only first names and practice stars of children are
          saved.
        </p>
      </form>
    </div>
  );
}

function Start({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"family" | "school" | "join" | null>(null);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "join") await call("lit_join_space", { p_code: value });
      else await call("lit_create_space", { p_kind: mode, p_name: value });
      setMode(null);
      setValue("");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't work.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-3">
      <Link href="/learn/" className="flex items-center gap-3 rounded-3xl bg-violet-100 p-4 shadow-sm">
        <span className="text-3xl">🎒</span>
        <span>
          <span className="block text-lg font-extrabold">I&apos;m a student: just learn</span>
          <span className="block text-sm text-black/60">Your learning days count while you are signed in on this phone</span>
        </span>
      </Link>
      <div className="grid gap-3 sm:grid-cols-3">
        <button type="button" onClick={() => (setMode("family"), setValue(""))} className={`rounded-3xl p-4 text-left shadow-sm ${mode === "family" ? "bg-amber-200" : "bg-amber-100"}`}>
          <span className="text-3xl">🏠</span>
          <span className="mt-1 block text-lg font-extrabold">I&apos;m a parent</span>
          <span className="block text-sm text-black/60">Set up my family and add my children</span>
        </button>
        <button type="button" onClick={() => (setMode("school"), setValue(""))} className={`rounded-3xl p-4 text-left shadow-sm ${mode === "school" ? "bg-sky-200" : "bg-sky-100"}`}>
          <span className="text-3xl">🏫</span>
          <span className="mt-1 block text-lg font-extrabold">I run a school</span>
          <span className="block text-sm text-black/60">Register the school, add classes, teachers and learners</span>
        </button>
        <button type="button" onClick={() => (setMode("join"), setValue(""))} className={`rounded-3xl p-4 text-left shadow-sm ${mode === "join" ? "bg-emerald-200" : "bg-emerald-100"}`}>
          <span className="text-3xl">🔑</span>
          <span className="mt-1 block text-lg font-extrabold">Join with a code</span>
          <span className="block text-sm text-black/60">Teachers, or a second parent/guardian</span>
        </button>
      </div>
      {mode && (
        <form onSubmit={submit} className="grid gap-3 rounded-3xl bg-white p-5 shadow-sm">
          <label className="grid gap-1 font-semibold">
            {mode === "family" ? "Family name" : mode === "school" ? "School name" : "Invite code (from the head of school or other parent)"}
            <input
              value={value}
              onChange={(e) => setValue(mode === "join" ? e.target.value.toUpperCase() : e.target.value)}
              placeholder={mode === "family" ? "e.g. Mensah family" : mode === "school" ? "e.g. Bright Kids School, Accra" : "SCH-XXXXXX or FAM-XXXXXX"}
              maxLength={80}
              className={input}
            />
          </label>
          {error && <p role="alert" className="font-semibold text-rose-700">{error}</p>}
          <button type="submit" disabled={busy || !value.trim()} className={primaryButton}>
            {busy ? "Please wait…" : mode === "join" ? "Join" : "Create"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function AccountPage() {
  const { session, ready } = useSession();
  const online = useOnline();
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setMe(await loadMe());
      setError(null);
    } catch (e) {
      if (!(e instanceof CloudError && e.signedOut)) setError(e instanceof Error ? e.message : "Couldn't load.");
    }
  }, []);

  useEffect(() => {
    if (session) void refresh();
    else setMe(null);
  }, [session, refresh]);

  return (
    <AppShell title="Parents & schools" back="/">
      {!ready ? null : !session ? (
        <SignInForm />
      ) : (
        <div className="grid gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-extrabold">Hello, {me?.name ?? session.name} 👋</p>
              <p className="text-sm text-black/60">Signed in as {prettyPhone(session.phone)}</p>
            </div>
            <button type="button" onClick={refresh} className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">🔄 Refresh</button>
            <button type="button" onClick={() => confirm("Sign out on this phone?") && signOut()} className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
              Sign out
            </button>
          </div>

          {!online && <p className="rounded-2xl bg-amber-100 p-4 font-semibold text-amber-950">📴 You&apos;re offline. Connect to the internet to see the latest progress.</p>}
          {error && <p role="alert" className="rounded-2xl bg-rose-50 p-4 font-semibold text-rose-800">{error}</p>}

          {me && me.spaces.length === 0 && (
            <>
              <p className="text-lg text-black/70">Let&apos;s get started. Who are you?</p>
              <Start onDone={refresh} />
            </>
          )}

          <Subscriptions me={me} />

          <InviteEarn />

          {me?.spaces.map((s) => (
            <SpaceView key={s.id} space={s} onChanged={refresh} />
          ))}

          {me && me.spaces.length > 0 && (
            <div>
              {adding ? (
                <Start onDone={() => (setAdding(false), refresh())} />
              ) : (
                <button type="button" onClick={() => setAdding(true)} className={secondaryButton}>
                  ➕ Add another family or school / join with a code
                </button>
              )}
            </div>
          )}

          <details className="rounded-2xl bg-white p-4 text-sm shadow-sm">
            <summary className="cursor-pointer font-bold">How it works</summary>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-black/70">
              <li>Add each child (first name and class). Each child gets a learner code like ZV-4K7Q-M2PX.</li>
              <li>On the child&apos;s phone (or yours), open learn.zivarukah.com → <strong>Who is learning?</strong> → enter the code.</li>
              <li>Their stars save on the phone (works offline) and sync here whenever there is internet.</li>
              <li>Schools: the head adds classes, shares the SCH- code with teachers, and gives each class to a teacher.</li>
              <li>A home account and a school account are separate: a parent and a school can each follow the same child with their own code.</li>
            </ol>
            <button
              type="button"
              onClick={async () => {
                if (!confirm("Delete your account? Families/schools where you are the only member are deleted with all their children's data.")) return;
                try {
                  await call("lit_delete_account");
                } catch {
                  // already gone
                }
                await signOut();
              }}
              className="mt-3 font-bold text-rose-700 underline"
            >
              Delete my account
            </button>
          </details>
          <p className="text-center">
            <Link href="/join/" className={goldButton}>🧒 Who is learning on this phone?</Link>
          </p>
        </div>
      )}
    </AppShell>
  );
}
