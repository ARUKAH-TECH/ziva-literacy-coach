"use client";

import { useState } from "react";

/** A code shown big, with Copy and Send on WhatsApp. */
export function ShareCode({ code, message }: { code: string; message: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <span className="rounded-xl bg-black/5 px-3 py-2 font-mono text-xl font-extrabold tracking-widest">{code}</span>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            // ignore
          }
        }}
        className="rounded-full bg-black/5 px-3 py-2 text-sm font-bold"
      >
        {copied ? "✓ Copied" : "📋 Copy"}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#25d366] px-3 py-2 text-sm font-bold text-white"
      >
        WhatsApp
      </a>
    </div>
  );
}
