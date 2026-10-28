"use client";

import { useEffect, useState } from "react";
import { CloudError, rpc } from "@/lib/cloud";
import type { Progress } from "@/lib/progress";
import type { LevelId } from "@/lib/levels";

// Parent / teacher / head-of-school account. Sign-in is by phone number
// (owner's choice: no password). The phone stays signed in with a random
// session token kept here.

const KEY = "ziva-literacy:account";

export interface Session {
  token: string;
  name: string;
  phone: string;
}

export interface Member {
  id: string;
  name: string;
  role: "parent" | "head" | "teacher";
  me: boolean;
}
export interface ClassRow {
  id: string;
  name: string;
  level: LevelId;
  teacherId: string | null;
}
export interface LearnerRow {
  id: string;
  name: string;
  level: LevelId;
  classId: string | null;
  code: string;
  progress: Partial<Progress>;
  updatedAt: string | null;
}
export interface Space {
  id: string;
  kind: "family" | "school";
  name: string;
  role: "parent" | "head" | "teacher";
  joinCode: string | null;
  members: Member[];
  classes: ClassRow[];
  learners: LearnerRow[];
}
export interface Me {
  id: string;
  name: string;
  phone: string;
  spaces: Space[];
}

const listeners = new Set<(s: Session | null) => void>();

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function setSession(s: Session | null) {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s));
    else localStorage.removeItem(KEY);
  } catch {
    // storage blocked
  }
  listeners.forEach((l) => l(s));
}

export function useSession() {
  const [session, set] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    set(getSession());
    setReady(true);
    listeners.add(set);
    return () => void listeners.delete(set);
  }, []);
  return { session, ready };
}

export async function register(phone: string, name: string) {
  setSession(await rpc<Session>("lit_register", { p_phone: phone, p_name: name }));
}

export async function signIn(phone: string) {
  setSession(await rpc<Session>("lit_sign_in", { p_phone: phone }));
}

export async function signOut() {
  const s = getSession();
  setSession(null);
  if (s) rpc("lit_sign_out", { p_token: s.token }).catch(() => {});
}

/** Calls an account function with the session token; signs out if it expired. */
export async function call<T = unknown>(fn: string, args: Record<string, unknown> = {}): Promise<T> {
  const s = getSession();
  if (!s) throw new CloudError("Please sign in.", true);
  try {
    return await rpc<T>(fn, { p_token: s.token, ...args });
  } catch (e) {
    if (e instanceof CloudError && e.signedOut) setSession(null);
    throw e;
  }
}

export const loadMe = () => call<Me>("lit_me");

/** Ghana numbers: 024 123 4567 → 233241234567 (for showing / matching). */
export function prettyPhone(digits: string) {
  if (digits.startsWith("233") && digits.length === 12) return `0${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  return `+${digits}`;
}
