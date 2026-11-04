"use client";

import { rpc } from "@/lib/cloud";
import { activeLearner, getLearners, progressKeyFor, saveLearner, updateLearner } from "@/lib/learners";
import type { LevelId } from "@/lib/levels";
import type { Progress } from "@/lib/progress";

// "Parent link": no accounts. The child's phone gets its own learner code
// (kept on the phone, used to save stars) and a separate read-only parent
// code. A parent opens learn.zivarukah.com/parent/ with the parent code to see
// the stars, from any phone, anywhere. Only a first name or nickname is stored.

export const PARENT_URL = "https://learn.zivarukah.com/parent/";
export const parentLink = (viewCode: string) => `${PARENT_URL}#${viewCode}`;

export function formatCode(raw: string, prefix: "ZV" | "PV") {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return clean.length === 10 && clean.startsWith(prefix) ? `${prefix}-${clean.slice(2, 6)}-${clean.slice(6)}` : raw.trim().toUpperCase();
}

/** Turns this phone's learning into a followed learner. Needs internet. */
export async function startParentLink(name: string, level: LevelId) {
  const r = await rpc<{ code: string; viewCode: string; name: string; level: LevelId; space: string; kind: "family" | "school" }>("lit_link_create", {
    p_name: name,
    p_level: level,
    p_consent: true,
  });
  // Bring the guest's stars along to the new learner.
  if (getLearners().active === null) {
    try {
      const guest = localStorage.getItem(progressKeyFor(null));
      if (guest && !localStorage.getItem(progressKeyFor(r.code))) localStorage.setItem(progressKeyFor(r.code), guest);
    } catch {
      // ignore
    }
  }
  saveLearner({ code: r.code, name: r.name, level: r.level, space: r.space, kind: r.kind, viewCode: r.viewCode }, true);
  return r.viewCode;
}

/** The parent code for the learner on this phone (asks the database once). */
export async function viewCodeForActive(): Promise<string | null> {
  const l = activeLearner();
  if (!l) return null;
  if (l.viewCode) return l.viewCode;
  const v = await rpc<string>("lit_view_code", { p_code: l.code });
  updateLearner(l.code, { viewCode: v });
  return v;
}

export interface ParentView {
  name: string;
  level: LevelId;
  data: Partial<Progress>;
  updatedAt: string | null;
}

export const openParentView = (code: string) => rpc<ParentView>("lit_parent_view", { p_view: formatCode(code, "PV") });

// Children a parent follows, remembered on the parent's phone.
const SAVED = "ziva-literacy:followed";
export interface Followed {
  code: string;
  name: string;
}
export function followedList(): Followed[] {
  try {
    const v = JSON.parse(localStorage.getItem(SAVED) ?? "[]") as Followed[];
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
export function saveFollowed(f: Followed) {
  try {
    localStorage.setItem(SAVED, JSON.stringify([...followedList().filter((x) => x.code !== f.code), f]));
  } catch {
    // ignore
  }
}
export function forgetFollowed(code: string) {
  try {
    localStorage.setItem(SAVED, JSON.stringify(followedList().filter((x) => x.code !== code)));
  } catch {
    // ignore
  }
}
