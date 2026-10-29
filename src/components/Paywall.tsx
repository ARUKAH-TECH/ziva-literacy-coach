"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { goldButton, primaryButton, secondaryButton } from "@/components/ui";
import { useOnline } from "@/components/useOnline";
import { useSession } from "@/lib/account";
import { useLearners } from "@/lib/learners";
import { PRICES, markLimitReached, payFor } from "@/lib/subscription";

/** Shown instead of a paid work when there is no active subscription. */
export function Paywall({ onCheck }: { onCheck: () => void }) {
  const online = useOnline();
  const { session } = useSession();
  const { current } = useLearners();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => markLimitReached(), []);

  async function pay() {
    setBusy(true);
    setError(null);
    try {
      await payFor("student");
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work.");
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-6xl">🔐</p>
      <p className="text-2xl font-extrabold">Great work! You finished the free part.</p>
      <p className="text-black/70">
        Stage 1 and half of Stage 2 are free in every skill. To keep going up to Professional level, a subscription is needed.
      </p>
      <p className="rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">
        ✅ One subscription opens everything: writing, reading, spelling, sounds &amp; words and the Word bank, in every class.
      </p>

      {current ? (
        <div className="w-full rounded-2xl bg-amber-50 p-4">
          {current.kind === "school" ? (
            <p className="text-amber-950">
              <strong>{current.name}</strong> learns with <strong>{current.space}</strong>. Ask your head of school to subscribe:{" "}
              <strong>GHS {PRICES.school} a month</strong> for every learner in the school.
            </p>
          ) : (
            <p className="text-amber-950">
              Ask your parent to subscribe: <strong>GHS {PRICES.parent} a month</strong> for all the children in <strong>{current.space}</strong>.
              They can pay in <strong>Parents &amp; schools</strong>.
            </p>
          )}
          <Link href="/account/#subscribe" className={`${secondaryButton} mt-3`}>
            👨‍👩‍👧 Parents &amp; schools
          </Link>
        </div>
      ) : session ? (
        <div className="w-full rounded-2xl bg-amber-50 p-4">
          <p className="text-amber-950">
            Student plan: <strong>GHS {PRICES.student} a month</strong>. Pay with Mobile Money or card on Paystack.
          </p>
          <button type="button" onClick={pay} disabled={busy || !online} className={`${goldButton} mt-3`}>
            {busy ? "Opening Paystack…" : `💳 Pay GHS ${PRICES.student} for 1 month`}
          </button>
          {!online && <p className="mt-2 text-sm font-semibold text-amber-800">Connect to the internet to pay.</p>}
        </div>
      ) : (
        <div className="w-full rounded-2xl bg-amber-50 p-4">
          <p className="text-amber-950">
            First register free with your name and phone, then subscribe for <strong>GHS {PRICES.student} a month</strong>. Parents can pay{" "}
            <strong>GHS {PRICES.parent}</strong> a month for all their children; schools <strong>GHS {PRICES.school}</strong> for all learners.
          </p>
          <Link href="/account/" className={`${primaryButton} mt-3`}>
            Register / sign in
          </Link>
        </div>
      )}
      {error && <p role="alert" className="font-semibold text-rose-700">{error}</p>}
      <button type="button" onClick={onCheck} className="text-sm font-bold text-ziva underline">
        Already paid? Check again
      </button>
    </div>
  );
}
