// Stage progress: which works are passed (4★ or more) and what is unlocked.
// A work opens only when the one before it is passed; a stage when the whole
// previous stage is passed; a level when the previous level is passed.

import { PASS_STARS, buildPath, recordKeyFor, type PathLevel, type SkillId, type Work } from "@/content/stages/generate";
import type { LevelId } from "@/lib/levels";
import type { Progress } from "@/lib/progress";

export const passed = (p: Partial<Progress> | undefined, w: Work) => (p?.records?.[recordKeyFor(w.id)]?.best ?? 0) >= PASS_STARS;
export const starsOn = (p: Partial<Progress> | undefined, w: Work) => p?.records?.[recordKeyFor(w.id)]?.best ?? 0;

export interface Position {
  level: number; // 0–2
  stage: number; // 0–4
  work: number; // 0–19
  done: boolean; // whole path finished
}

/** The first work not yet passed (where the learner is now). */
export function currentPosition(path: PathLevel[], p: Partial<Progress> | undefined): Position {
  for (let L = 0; L < path.length; L++)
    for (let s = 0; s < path[L].stages.length; s++) {
      const works = path[L].stages[s].works;
      const k = works.findIndex((w) => !passed(p, w));
      if (k >= 0) return { level: L, stage: s, work: k, done: false };
    }
  const last = path.length - 1;
  return { level: last, stage: path[last].stages.length - 1, work: path[last].stages.at(-1)!.works.length - 1, done: true };
}

const order = (L: number, s: number) => L * 100 + s;

/** Can this stage be opened? (Everything before it is passed.) */
export function stageOpen(pos: Position, L: number, s: number) {
  return pos.done || order(L, s) <= order(pos.level, pos.stage);
}

/** Can this work be opened? Passed works can always be practised again. */
export function workOpen(pos: Position, L: number, s: number, k: number) {
  if (pos.done) return true;
  const here = order(L, s), now = order(pos.level, pos.stage);
  return here < now || (here === now && k <= pos.work);
}

export function stagePassedCount(path: PathLevel[], p: Partial<Progress> | undefined, L: number, s: number) {
  return path[L].stages[s].works.filter((w) => passed(p, w)).length;
}

/** "Beginner · Stage 2 · Work 6 of 20" for reports. */
export function positionText(cls: LevelId, skill: SkillId, p: Partial<Progress> | undefined) {
  const path = buildPath(cls, skill);
  const pos = currentPosition(path, p);
  if (pos.done) return "🏆 All 3 levels finished";
  const started = path.some((L) => L.stages.some((st) => st.works.some((w) => starsOn(p, w) > 0)));
  if (!started) return "Not started";
  return `${path[pos.level].emoji} ${path[pos.level].title} · Stage ${pos.stage + 1} · Work ${pos.work + 1} of ${path[pos.level].stages[pos.stage].works.length}`;
}
