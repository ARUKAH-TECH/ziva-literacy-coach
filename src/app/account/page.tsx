"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { primaryButton, secondaryButton } from "@/components/ui";

// Registration has been removed (Nov 2026): ZIVA Learning is free for everyone.
// Old links to this page land here and are pointed to the parent view.
export default function AccountPage() {
  return (
    <AppShell title="No registration needed" back="/">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-2xl font-extrabold">🎉 ZIVA Learning is now completely free</p>
        <p className="mt-2 text-black/75">
          There is nothing to register and nothing to pay. Every stage, level and the Word bank are open for every child.
        </p>
        <p className="mt-2 text-black/75">
          Parents who are far away can still follow a child&apos;s stars with a free parent code, made on the child&apos;s phone.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/parent/" className={primaryButton}>
            👨‍👩‍👧 For parents
          </Link>
          <Link href="/learn/" className={secondaryButton}>
            🚀 Start learning
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
