"use client";

import Link from "next/link";
import { useState } from "react";
import { useInstall } from "@/components/useInstall";
import { goldButton } from "@/components/ui";
import { openIosGuide } from "@/components/IosInstallGuide";

/** Install button when the browser offers it; otherwise clear steps. Never claims success it can't see. */
export function InstallCard({ compact = false }: { compact?: boolean }) {
  const { canPrompt, standalone, justInstalled, platform, ready, install } = useInstall();
  const [result, setResult] = useState<"" | "accepted" | "dismissed">("");

  if (!ready) return null;
  if (standalone) {
    return compact ? null : (
      <p className="rounded-2xl bg-green-100 p-4 text-green-900">✅ You’re using the installed ZIVA Literacy app.</p>
    );
  }
  if (justInstalled || result === "accepted") {
    return (
      <p role="status" className="rounded-2xl bg-green-100 p-4 text-green-900">
        ✅ ZIVA Literacy has been added. Open it from your home screen or app list.
      </p>
    );
  }

  return (
    <div className="rounded-3xl bg-ziva-dark p-5 text-white shadow">
      <p className="text-xl font-extrabold">📲 Install ZIVA Literacy</p>
      <p className="mt-1 text-white/85">Get the app icon on your phone. It opens straight to the lessons and works offline.</p>
      {canPrompt ? (
        <button
          type="button"
          onClick={async () => setResult((await install()) === "accepted" ? "accepted" : "dismissed")}
          className={`${goldButton} mt-4`}
        >
          Install app
        </button>
      ) : platform === "ios" ? (
        <button type="button" onClick={openIosGuide} className={`${goldButton} mt-4`}>
          📲 Add to Home Screen
        </button>
      ) : compact ? (
        <Link href="/install/" className={`${goldButton} mt-4`}>
          How to install
        </Link>
      ) : (
        <div className="mt-4 rounded-2xl bg-white/10 p-4 text-base leading-7">
          {platform === "android" ? (
            <ol className="list-decimal pl-5">
              <li>Open this page in <strong>Chrome</strong>.</li>
              <li>Tap the <strong>⋮</strong> menu (top right).</li>
              <li>Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
            </ol>
          ) : (
            <ol className="list-decimal pl-5">
              <li>Open this page in <strong>Chrome</strong> or <strong>Edge</strong>.</li>
              <li>Click the <strong>install icon</strong> at the right of the address bar, or the menu → <strong>Install ZIVA Literacy</strong>.</li>
            </ol>
          )}
        </div>
      )}
      {result === "dismissed" && <p className="mt-3 text-sm text-white/80">No problem: you can install it later from here.</p>}
    </div>
  );
}
