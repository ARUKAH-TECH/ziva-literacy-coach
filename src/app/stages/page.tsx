"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Stars, primaryButton, secondaryButton } from "@/components/ui";
import { WorkPlayer } from "@/components/stages/WorkPlayer";
import { PASS_STARS, SKILLS, buildPath, recordKeyFor, type SkillId } from "@/content/stages/generate";
import { levelInfo } from "@/lib/levels";
import { recordResult, useProgress } from "@/lib/progress";
import { currentPosition, passed, stageOpen, stagePassedCount, starsOn, workOpen } from "@/lib/stages";
import { speak, stopSpeaking } from "@/lib/speech";
import { Paywall } from "@/components/Paywall";
import { isFreeWork, useAccess } from "@/lib/subscription";

type View = { skill: SkillId | null; level: number; stage: number | null; work: number };
const KEY = "ziva-literacy:stages-view";

export default function StagesPage() {
  const { progress, loaded } = useProgress();
  const cls = progress.level;
  const info = levelInfo(cls);
  const [view, setView] = useState<View>({ skill: null, level: 0, stage: null, work: 0 });
  const access = useAccess();

  // Remember where we were (per phone), so Back/refresh returns here.
  useEffect(() => {
    try {
      const v = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as View | null;
      if (v) setView(v);
    } catch {
      // ignore
    }
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(view));
    } catch {
      // ignore
    }
  }, [view]);

  const path = useMemo(() => (cls && view.skill ? buildPath(cls, view.skill) : null), [cls, view.skill]);
  const pos = path ? currentPosition(path, progress) : null;

  if (!loaded) return <AppShell title="Stages" back="/learn/">{null}</AppShell>;
  if (!cls || !info) {
    return (
      <AppShell title="Stages" back="/learn/">
        <p className="text-lg">First, choose your class.</p>
        <Link href="/level/" className={`${primaryButton} mt-4`}>Choose class</Link>
      </AppShell>
    );
  }

  // ── 1. choose a skill ──
  if (!view.skill || !path || !pos) {
    return (
      <AppShell title="Stages" back="/learn/">
        <div className="rounded-3xl bg-gradient-to-br from-ziva to-ziva-dark p-5 text-white shadow">
          <p className="text-2xl font-extrabold">🪜 Step by step — {info.label}</p>
          <p className="mt-1 text-white/90">
            3 levels: 🌱 Beginner → 🌿 Intermediate → 🌳 Professional. Each level has 5 stages of 20 works. Get <strong>⭐⭐⭐⭐</strong> on a work to
            open the next one.
          </p>
        </div>
        <div className="mt-5 grid gap-4">
          {SKILLS.map((s) => {
            const p = buildPath(cls, s.id);
            const at = currentPosition(p, progress);
            const total = p.reduce((a, L) => a + L.stages.reduce((b, st) => b + st.works.length, 0), 0);
            const done = p.reduce((a, L, li) => a + L.stages.reduce((b, _, si) => b + stagePassedCount(p, progress, li, si), 0), 0);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setView({ skill: s.id, level: at.level, stage: null, work: 0 })}
                className="flex items-center gap-4 rounded-3xl border-2 border-black/5 bg-white p-4 text-left shadow-sm active:scale-[0.99]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-4xl">{s.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-extrabold">{s.title}</span>
                  <span className="block text-sm text-black/60">{s.text}</span>
                  <span className="mt-1 block text-sm font-semibold text-ziva">
                    {at.done ? "🏆 All levels finished!" : `${p[at.level].emoji} ${p[at.level].title} · Stage ${at.stage + 1} · Work ${at.work + 1}`}
                  </span>
                  <span className="mt-1 block h-2 overflow-hidden rounded-full bg-black/10">
                    <span className="block h-full rounded-full bg-emerald-500" style={{ width: `${Math.round((done / total) * 100)}%` }} />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </AppShell>
    );
  }

  const skill = SKILLS.find((s) => s.id === view.skill)!;
  const L = Math.min(view.level, path.length - 1);
  const level = path[L];

  // ── 3. play a stage ──
  if (view.stage !== null && stageOpen(pos, L, view.stage)) {
    const stage = level.stages[view.stage];
    let k = Math.min(view.work, stage.works.length - 1);
    if (!workOpen(pos, L, view.stage, k)) k = pos.work; // can't jump ahead
    const work = stage.works[k];
    const isPassed = passed(progress, work);
    const next = () => {
      stopSpeaking();
      const firstLeft = stage.works.findIndex((w) => !passed(progress, w));
      if (k + 1 < stage.works.length) setView({ ...view, work: k + 1 });
      else if (firstLeft >= 0) setView({ ...view, work: firstLeft }); // a work earlier in the stage still needs 4★
      else if (view.stage! + 1 < level.stages.length) setView({ ...view, stage: view.stage! + 1, work: 0 });
      else if (L + 1 < path.length) setView({ ...view, level: L + 1, stage: 0, work: 0 });
      else setView({ ...view, stage: null });
    };
    const stageDone = stagePassedCount(path, progress, L, view.stage) === stage.works.length;
    return (
      <AppShell title={`${skill.title} · ${level.title}`} back="/learn/">
        <div className="flex items-center justify-between gap-2">
          <button type="button" onClick={() => (stopSpeaking(), setView({ ...view, stage: null }))} className="text-sm font-bold text-ziva underline">
            ← {level.emoji} {level.title} stages
          </button>
          <span className="text-sm font-bold text-black/60">
            Stage {stage.n} · Work {k + 1}/{stage.works.length}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1" aria-label="Works in this stage">
          {stage.works.map((w, i) => {
            const open = workOpen(pos, L, view.stage!, i);
            const ok = passed(progress, w);
            return (
              <button
                key={w.id}
                type="button"
                disabled={!open}
                onClick={() => (stopSpeaking(), setView({ ...view, work: i }))}
                aria-label={`Work ${i + 1}${ok ? ", passed" : open ? "" : ", locked"}`}
                className={`h-8 w-8 rounded-lg text-xs font-bold ${i === k ? "ring-2 ring-ziva" : ""} ${ok ? "bg-emerald-500 text-white" : open ? "bg-amber-200" : "bg-black/10 text-black/30"}`}
              >
                {ok ? "✓" : open ? i + 1 : "🔒"}
              </button>
            );
          })}
        </div>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          {isFreeWork(L, view.stage, k) || access.ok ? (
            <WorkPlayer key={work.id} work={work} onResult={(stars) => recordResult(recordKeyFor(work.id), stars)} />
          ) : (
            <Paywall onCheck={access.refresh} />
          )}
        </section>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-black/60">
            {isPassed ? <>Best: <Stars count={starsOn(progress, work)} size="text-sm" /></> : `Get ${"⭐".repeat(PASS_STARS)} to go on`}
          </span>
          <button type="button" onClick={next} disabled={!isPassed} className={primaryButton}>
            {k + 1 < stage.works.length ? "Next work ▶" : stageDone ? "Next stage 🎉" : "Next ▶"}
          </button>
        </div>
        {stageDone && k + 1 === stage.works.length && (
          <p role="status" className="mt-4 rounded-2xl bg-emerald-100 p-4 text-center text-lg font-bold text-emerald-900">
            🎉 Stage {stage.n} complete! {view.stage! + 1 < level.stages.length ? `Stage ${stage.n + 1} is open.` : L + 1 < path.length ? `${path[L + 1].title} level is open!` : "You finished every level! 🏆"}
          </p>
        )}
      </AppShell>
    );
  }

  // ── 2. levels and stages map ──
  return (
    <AppShell title={`${skill.emoji} ${skill.title}`} back="/learn/">
      <button type="button" onClick={() => setView({ skill: null, level: 0, stage: null, work: 0 })} className="text-sm font-bold text-ziva underline">
        ← All skills
      </button>
      <div className="mt-3 flex gap-2">
        {path.map((lv, i) => {
          const open = stageOpen(pos, i, 0);
          return (
            <button
              key={lv.id}
              type="button"
              disabled={!open}
              onClick={() => setView({ ...view, level: i })}
              className={`flex-1 rounded-2xl px-2 py-3 text-center font-bold ${i === L ? "bg-ziva text-white" : open ? "bg-white" : "bg-black/5 text-black/30"}`}
            >
              <span className="block text-2xl">{open ? lv.emoji : "🔒"}</span>
              <span className="block text-sm">{lv.title}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3">
        {level.stages.map((st, s) => {
          const open = stageOpen(pos, L, s);
          const count = stagePassedCount(path, progress, L, s);
          const here = !pos.done && pos.level === L && pos.stage === s;
          return (
            <button
              key={st.n}
              type="button"
              disabled={!open}
              onClick={() => {
                const firstOpen = st.works.findIndex((w) => !passed(progress, w));
                setView({ ...view, level: L, stage: s, work: firstOpen < 0 ? 0 : firstOpen });
                speak(`Stage ${st.n}`);
              }}
              className={`flex items-center gap-4 rounded-3xl p-4 text-left shadow-sm ${here ? "bg-amber-100 ring-2 ring-gold" : open ? "bg-white" : "bg-black/5"}`}
            >
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-extrabold ${count === st.works.length ? "bg-emerald-500 text-white" : open ? "bg-ziva text-white" : "bg-black/10 text-black/40"}`}>
                {count === st.works.length ? "✓" : open ? st.n : "🔒"}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-extrabold">Stage {st.n}</span>
                <span className="block text-sm text-black/60">
                  {open ? `${count} of ${st.works.length} works passed` : s === 0 ? `Finish the ${path[L - 1]?.title ?? "previous"} level first` : `Finish Stage ${s} first`}
                </span>
                <span className="mt-1 block h-2 overflow-hidden rounded-full bg-black/10">
                  <span className="block h-full rounded-full bg-emerald-500" style={{ width: `${(count / st.works.length) * 100}%` }} />
                </span>
              </span>
              {here && <span className="shrink-0 rounded-full bg-gold px-3 py-1 text-sm font-bold">Continue ▶</span>}
            </button>
          );
        })}
      </div>
      <p className="mt-5 rounded-2xl bg-sky-50 p-4 text-sm text-sky-950">
        Each work needs <strong>⭐⭐⭐⭐</strong> or more. If you get fewer stars, do it again — you can&apos;t skip ahead. You can always go back and
        practise works you have passed.
      </p>
      <div className="mt-4 text-center">
        <Link href="/learn/" className={secondaryButton}>Other lessons</Link>
      </div>
    </AppShell>
  );
}
