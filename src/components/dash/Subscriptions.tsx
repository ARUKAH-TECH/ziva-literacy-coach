"use client";

import { useCallback, useEffect, useState } from "react";
import { goldButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { call } from "@/lib/account";
import { PRICES, limitReachedHere, payFor, reachedLimit, refreshAccess, untilText, type Plan } from "@/lib/subscription";
import type { Me } from "@/lib/account";

interface MySubs {
  selfUntil: string | null;
  spaces: { id: string; kind: "family" | "school"; name: string; role: string; until: string | null }[];
}

const active = (iso: string | null) => Boolean(iso && new Date(iso).getTime() > Date.now());

function Row({ title, sub, until, plan, group, canPay }: { title: string; sub: string; until: string | null; plan: Plan; group: string | null; canPay: boolean }) {
  const online = useOnline();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const on = active(until);
  return (
    <li className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="font-extrabold">{title}</p>
          <p className="text-sm text-black/60">{sub}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${on ? "bg-emerald-100 text-emerald-900" : "bg-black/5 text-black/60"}`}>
          {on ? `✅ Active until ${untilText(until)}` : until ? `Ended ${untilText(until)}` : "Free part only"}
        </span>
      </div>
      {canPay ? (
        <>
          <button
            type="button"
            disabled={busy || !online}
            onClick={async () => {
              setBusy(true);
              setError(null);
              try {
                await payFor(plan, group);
              } catch (e) {
                setError(e instanceof Error ? e.message : "That didn't work.");
                setBusy(false);
              }
            }}
            className={`${goldButton} mt-3`}
          >
            {busy ? "Opening Paystack…" : on ? `➕ Add 1 month · GHS ${PRICES[plan]}` : `💳 Subscribe · GHS ${PRICES[plan]} / month`}
          </button>
          {error && <p role="alert" className="mt-2 text-sm font-semibold text-rose-700">{error}</p>}
        </>
      ) : (
        !on && <p className="mt-2 text-sm text-black/60">{plan === "school" ? "Only the head of school can pay for the school." : "Only a parent can pay for the family."}</p>
      )}
    </li>
  );
}

/** Subscriptions for me (student) and my families/schools, plus the Paystack return message. */
export function Subscriptions({ me }: { me: Me | null }) {
  const [subs, setSubs] = useState<MySubs | null>(null);
  const [paid, setPaid] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setSubs(await call<MySubs>("lit_my_subs"));
      void refreshAccess();
    } catch {
      // shown as nothing; the rest of the page still works
    }
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("paid");
    if (p) {
      setPaid(p);
      window.history.replaceState(null, "", window.location.pathname + "#subscribe");
    }
    void load();
    // A payment confirmed a moment later (e.g. MoMo approval) — check again.
    if (p === "pending") {
      const t = setTimeout(load, 15000);
      return () => clearTimeout(t);
    }
  }, [load]);

  if (!subs) return null;
  // Hidden until needed: shown only for whoever has reached the end of the
  // free part (or has paid before), and right after coming back from Paystack.
  const showSelf = Boolean(paid) || limitReachedHere() || Boolean(subs.selfUntil);
  const spaces = subs.spaces.filter((s) => {
    if (s.until) return true;
    const sp = me?.spaces.find((x) => x.id === s.id);
    return Boolean(sp?.learners.some((l) => reachedLimit(l.progress?.records)));
  });
  if (!showSelf && spaces.length === 0) return null;
  return (
    <section id="subscribe" className="rounded-3xl bg-sky-50 p-5">
      <p className="text-2xl font-extrabold">💳 Subscription</p>
      <p className="mt-1 text-black/70">
        The free part is finished. A subscription opens all stages up to Professional. Pay with Mobile Money or card
        (Paystack). Each payment adds 1 month.
      </p>
      {paid === "paid" && <p role="status" className="mt-3 rounded-2xl bg-emerald-100 p-3 font-bold text-emerald-900">🎉 Payment received: your month is active. Thank you!</p>}
      {paid === "pending" && <p role="status" className="mt-3 rounded-2xl bg-amber-100 p-3 font-bold text-amber-900">⏳ Waiting for the payment to be confirmed. Approve it on your phone if asked. This page checks again shortly.</p>}
      {paid === "failed" && <p role="alert" className="mt-3 rounded-2xl bg-rose-100 p-3 font-bold text-rose-900">The payment did not go through. No money was taken for this month. Please try again.</p>}
      <ul className="mt-4 grid gap-3">
        {showSelf && <Row title="🎒 Me (student)" sub={`GHS ${PRICES.student} a month: for my own learning on this phone`} until={subs.selfUntil} plan="student" group={null} canPay />}
        {spaces.map((s) => (
          <Row
            key={s.id}
            title={`${s.kind === "school" ? "🏫" : "🏠"} ${s.name}`}
            sub={s.kind === "school" ? `GHS ${PRICES.school} a month: every learner in the school` : `GHS ${PRICES.parent} a month: all children in the family`}
            until={s.until}
            plan={s.kind === "school" ? "school" : "parent"}
            group={s.id}
            canPay={s.kind === "school" ? s.role === "head" : s.role === "parent"}
          />
        ))}
      </ul>
      <button type="button" onClick={load} className="mt-3 text-sm font-bold text-black/60 underline">🔄 Check again</button>
    </section>
  );
}
