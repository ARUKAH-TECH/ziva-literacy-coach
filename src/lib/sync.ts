"use client";

import { CloudError, rpc } from "@/lib/cloud";
import { activeLearner, updateLearner, type LearnerProfile } from "@/lib/learners";
import type { LevelId } from "@/lib/levels";
import { mergeProgress, readProgress, type Progress } from "@/lib/progress";

interface OpenResult {
  name: string;
  level: LevelId;
  space: string;
  kind: "family" | "school";
  data: Partial<Progress>;
}

/** Looks up a learner code (needs internet). */
export async function openLearner(code: string): Promise<LearnerProfile & { data: Partial<Progress> }> {
  const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const formatted = clean.length === 10 && clean.startsWith("ZV") ? `ZV-${clean.slice(2, 6)}-${clean.slice(6)}` : code.trim().toUpperCase();
  const r = await rpc<OpenResult>("lit_learner_open", { p_code: formatted });
  return { code: formatted, name: r.name, level: r.level, space: r.space, kind: r.kind, data: r.data, lastSync: new Date().toISOString() };
}

let running = false;

/** Sends this learner's stars and brings back any from other phones. */
export async function syncNow(): Promise<"synced" | "skipped" | "failed"> {
  const learner = activeLearner();
  if (!learner || running || (typeof navigator !== "undefined" && !navigator.onLine)) return "skipped";
  running = true;
  try {
    const local = readProgress();
    const res = await rpc<{ name: string; level: LevelId; data: Partial<Progress> }>("lit_learner_sync", {
      p_code: learner.code,
      p_data: { records: local.records, days: local.days, scale: 5 },
    });
    // Still the same learner on this phone? Then save the merged stars.
    if (activeLearner()?.code === learner.code) {
      const levelChanged = res.level !== learner.level;
      mergeProgress(res.data, levelChanged || !local.level ? res.level : undefined);
      updateLearner(learner.code, { name: res.name, level: res.level, lastSync: new Date().toISOString(), missing: false });
    }
    return "synced";
  } catch (e) {
    if (e instanceof CloudError && /not found/i.test(e.message)) updateLearner(learner.code, { missing: true });
    return "failed";
  } finally {
    running = false;
  }
}
