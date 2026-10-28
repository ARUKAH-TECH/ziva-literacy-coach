"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { captureRef, savedRef, useSession } from "@/lib/account";
import { rpc } from "@/lib/cloud";

/** On the home page: someone opened a friend's share link → invite them to register. */
export function RefWelcome() {
  const { session, ready } = useSession();
  const [inviter, setInviter] = useState<string | null>(null);
  const [has, setHas] = useState(false);
  useEffect(() => {
    captureRef();
    const ref = savedRef();
    setHas(Boolean(ref));
    if (ref)
      rpc<string | null>("lit_ref_info", { p_ref: ref })
        .then((n) => setInviter(n || null))
        .catch(() => {});
  }, []);
  if (!ready || session || !has) return null;
  return (
    <Link href="/account/" className="mb-5 block rounded-3xl bg-amber-100 p-5 shadow-sm ring-2 ring-gold">
      <p className="text-xl font-extrabold">🎉 {inviter ? `${inviter} invited you!` : "You're invited!"}</p>
      <p className="mt-1 text-amber-950">Register free with your name and phone, then learn a little on 7 days. Tap here to start →</p>
    </Link>
  );
}
