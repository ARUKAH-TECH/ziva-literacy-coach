"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Stars, secondaryButton } from "@/components/ui";
import { ACTIVITIES, levelInfo } from "@/lib/levels";
import { clearProgress, streak, useProgress } from "@/lib/progress";

export default function ProgressPage() {
  const { progress, loaded } = useProgress();
  const [confirm, setConfirm] = useState(false);
  const level = levelInfo(progress.level);
  const entries = Object.entries(progress.records);
  const totalStars = entries.reduce((sum, [, r]) => sum + r.best, 0);
  const days = streak(progress.days);

  // Group results by activity (key is "activity:item").
  const byActivity = ACTIVITIES.map((a) => {
    const rows = entries.filter(([key]) => key.split(":")[0] === a.id);
    return { a, rows, stars: rows.reduce((s, [, r]) => s + r.best, 0) };
  }).filter((g) => g.rows.length > 0);

  return (
    <AppShell title="My progress">
      {!loaded ? null : entries.length === 0 ? (
        <p className="rounded-3xl bg-white p-6 text-lg shadow-sm">No practice yet. Finish an activity to earn stars ⭐</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-3xl bg-amber-100 p-4"><p className="text-3xl font-extrabold">⭐ {totalStars}</p><p className="text-sm">stars</p></div>
            <div className="rounded-3xl bg-emerald-100 p-4"><p className="text-3xl font-extrabold">{entries.length}</p><p className="text-sm">exercises</p></div>
            <div className="rounded-3xl bg-rose-100 p-4"><p className="text-3xl font-extrabold">🔥 {days}</p><p className="text-sm">day streak</p></div>
          </div>
          {level && <p className="mt-4 text-black/70">Class: {level.emoji} {level.label} · Practised on {progress.days.length} day{progress.days.length === 1 ? "" : "s"}</p>}
          <div className="mt-6 flex flex-col gap-4">
            {byActivity.map(({ a, rows, stars }) => (
              <section key={a.id} className="rounded-3xl bg-white p-5 shadow-sm">
                <h2 className="flex items-center justify-between text-xl font-extrabold">
                  <span>{a.emoji} {a.title}</span>
                  <span className="text-base font-bold text-black/60">⭐ {stars}</span>
                </h2>
                <ul className="mt-3 divide-y divide-black/5">
                  {rows.map(([key, r]) => (
                    <li key={key} className="flex items-center justify-between gap-3 py-2">
                      <span className="min-w-0 truncate capitalize">{key.split(":").slice(1).join(" ").replace(/-/g, " ") || a.title}</span>
                      <span className="flex shrink-0 items-center gap-2 text-sm text-black/60">
                        {r.tries}× <Stars count={r.best} size="text-lg" />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}

      <section className="mt-10 rounded-3xl border-2 border-dashed border-black/15 p-5 text-sm text-black/70">
        <p className="font-semibold text-black">🔒 Your privacy</p>
        <p className="mt-1">Progress is saved only on this device. No names, scores or recordings are sent to anyone.</p>
        {entries.length > 0 &&
          (confirm ? (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span>Delete all progress on this device?</span>
              <button type="button" onClick={() => (clearProgress(), setConfirm(false))} className="rounded-full bg-red-700 px-4 py-2 font-bold text-white">
                Yes, delete
              </button>
              <button type="button" onClick={() => setConfirm(false)} className={secondaryButton}>
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirm(true)} className="mt-3 underline">
              Clear my progress
            </button>
          ))}
      </section>
    </AppShell>
  );
}
