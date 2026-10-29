"use client";

import { useCallback, useEffect, useState } from "react";
import { call, getSession } from "@/lib/account";
import { rpc } from "@/lib/cloud";
import { getLearners, LEARNER_EVENT } from "@/lib/learners";

// Subscriptions: in every skill, Stage 1 and the first 10 works of Stage 2
// (Beginner level) are free. After that the learner needs a paid month:
//   student GHS 20 — the signed-in person learning as themself
//   parent  GHS 50 — every child in the family
//   school  GHS 100 — every learner in the school
// The paid-until date is kept on the phone so it keeps working offline.

export const PRICES = { student: 20, parent: 50, school: 100 } as const;
export type Plan = keyof typeof PRICES;
export const FREE_WORKS_IN_STAGE_2 = 10;
const PAY_URL = "https://zivarukah.com/api/literacy/subscribe";
const KEY = "ziva-literacy:access";
const EVENT = "ziva-access-changed";

const LIMIT_KEY = "ziva-literacy:limit-reached";

/** Called when the subscribe screen is shown — from then on the account page offers subscriptions. */
export function markLimitReached() {
  try {
    localStorage.setItem(LIMIT_KEY, "yes");
  } catch {
    // ignore
  }
}
export function limitReachedHere() {
  try {
    return localStorage.getItem(LIMIT_KEY) === "yes";
  } catch {
    return false;
  }
}

/** Has this learner's progress reached the end of the free part in any skill? */
export function reachedLimit(records: Record<string, { best: number }> | undefined) {
  return Object.entries(records ?? {}).some(([k, r]) => /^stage:[^.]+\.[a-z]+\.0\.1\.9$/.test(k) && r.best >= 4);
}

export function isFreeWork(level: number, stage: number, work: number) {
  return level === 0 && (stage === 0 || (stage === 1 && work < FREE_WORKS_IN_STAGE_2));
}

interface AccessCache {
  phone: string | null; // who was signed in
  selfUntil: string | null;
  code: string | null; // learner code checked
  learnerUntil: string | null;
  learnerKind: "family" | "school" | null;
  checkedAt: string;
}

function read(): AccessCache | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null") as AccessCache | null;
  } catch {
    return null;
  }
}

const future = (iso: string | null | undefined) => Boolean(iso && new Date(iso).getTime() > Date.now());

/** Can the person/learner on this phone open paid works right now? */
export function hasAccess(): boolean {
  const c = read();
  if (!c) return false;
  const active = getLearners().active;
  if (active) return c.code === active && future(c.learnerUntil);
  const s = getSession();
  return Boolean(s && c.phone === s.phone && future(c.selfUntil));
}

/** Asks the database (when online) and saves the answer on the phone. */
export async function refreshAccess() {
  if (typeof navigator !== "undefined" && !navigator.onLine) return;
  const s = getSession();
  const code = getLearners().active;
  try {
    const r = await rpc<{ selfUntil: string | null; learnerUntil: string | null; learnerKind: "family" | "school" | null }>("lit_access", {
      p_token: s?.token ?? null,
      p_code: code,
    });
    const cache: AccessCache = {
      phone: s?.phone ?? null,
      selfUntil: r.selfUntil,
      code,
      learnerUntil: r.learnerUntil,
      learnerKind: r.learnerKind,
      checkedAt: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(cache));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // keep the saved answer
  }
}

export function useAccess() {
  const [ok, setOk] = useState(false);
  const [until, setUntil] = useState<string | null>(null);
  const update = useCallback(() => {
    setOk(hasAccess());
    const c = read();
    setUntil(getLearners().active ? c?.learnerUntil ?? null : c?.selfUntil ?? null);
  }, []);
  useEffect(() => {
    update();
    void refreshAccess();
    window.addEventListener(EVENT, update);
    const onLearner = () => void refreshAccess().then(update);
    window.addEventListener(LEARNER_EVENT, onLearner);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener(LEARNER_EVENT, onLearner);
    };
  }, [update]);
  return { ok, until, refresh: () => refreshAccess().then(update) };
}

/** Starts a Paystack payment for one month and goes to Paystack's page. */
export async function payFor(plan: Plan, groupId: string | null = null) {
  const start = await call<{ reference: string }>("lit_sub_start", { p_plan: plan, p_group: groupId });
  let res: Response;
  try {
    res = await fetch(PAY_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reference: start.reference }) });
  } catch {
    throw new Error("Couldn't reach the payment page. Check your internet and try again.");
  }
  const data = (await res.json().catch(() => null)) as { ok?: boolean; url?: string; message?: string } | null;
  if (!data?.ok || !data.url) throw new Error(data?.message || "Payment couldn't be started. Please try again.");
  window.location.href = data.url;
}

export function untilText(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
