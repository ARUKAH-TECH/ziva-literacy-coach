"use client";

// Talks to the ZIVA database (Supabase) for accounts, children and synced
// progress. Only the public "publishable" key is used here — every call goes
// through a database function that checks the session token or learner code.

const URL_BASE = "https://frnhrxyyfthbtjjmjxrm.supabase.co/rest/v1/rpc/";
const KEY = "sb_publishable_kOl-clsTQ_MORxWNOxU1Vg_kRFVKfps";

export class CloudError extends Error {
  signedOut: boolean;
  constructor(message: string, signedOut = false) {
    super(message);
    this.signedOut = signedOut;
  }
}

export async function rpc<T = unknown>(fn: string, args: Record<string, unknown>): Promise<T> {
  if (typeof navigator !== "undefined" && !navigator.onLine) throw new CloudError("You're offline. Connect to the internet and try again.");
  let res: Response;
  try {
    res = await fetch(URL_BASE + fn, {
      method: "POST",
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
    });
  } catch {
    throw new CloudError("Couldn't connect. Check your internet and try again.");
  }
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message: string = data?.message || "Something went wrong. Please try again.";
    if (message === "SIGNED_OUT") throw new CloudError("Please sign in again.", true);
    throw new CloudError(message);
  }
  return data as T;
}
