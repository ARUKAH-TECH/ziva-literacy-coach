"use client";

import { Stars } from "@/components/ui";
import { SKILLS as STAGE_SKILLS } from "@/content/stages/generate";
import type { LevelId } from "@/lib/levels";
import type { Progress } from "@/lib/progress";
import { buildReport, whenText } from "@/lib/report";
import { positionText } from "@/lib/stages";

function Bar({ value }: { value: number }) {
  const pct = Math.round((value / 5) * 100);
  const color = value >= 4 ? "bg-emerald-500" : value >= 3 ? "bg-sky-500" : value > 0 ? "bg-amber-400" : "bg-black/10";
  return (
    <div className="h-3 flex-1 overflow-hidden rounded-full bg-black/10">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(value > 0 ? 6 : 0, pct)}%` }} />
    </div>
  );
}

/** A child's progress for a parent: practice days, skills, stages and recent work. */
export function ProgressSummary({ level, progress }: { level: LevelId; progress: Partial<Progress> }) {
  const r = buildReport(progress);
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <p className="text-2xl font-extrabold">{r.activities}</p>
          <p className="text-xs text-black/60">activities done</p>
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <p className="text-2xl font-extrabold">{r.avg ? r.avg.toFixed(1) : "None"}</p>
          <p className="text-xs text-black/60">average stars</p>
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <p className="text-2xl font-extrabold">{r.daysThisWeek}</p>
          <p className="text-xs text-black/60">days this week</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-black/60">Last practised: {whenText(r.lastActive)}</p>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <p className="mb-2 text-sm font-bold text-black/60">Practice in the last 2 weeks</p>
        <div className="flex gap-1">
          {r.last14.map((d) => (
            <span key={d.day} title={d.day} className={`h-7 flex-1 rounded ${d.practised ? "bg-emerald-500" : "bg-black/10"}`} />
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <p className="mb-3 font-bold">Skills</p>
        <div className="grid gap-3">
          {r.skills.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="w-32 shrink-0 text-sm font-semibold">
                {s.emoji} {s.label}
              </span>
              <Bar value={s.avg} />
              <span className="w-16 shrink-0 text-right text-xs text-black/60">{s.done ? `${s.avg.toFixed(1)}★ · ${s.done}` : "not yet"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <p className="mb-2 font-bold">🪜 Stages reached</p>
        <ul className="grid gap-1.5">
          {STAGE_SKILLS.map((sk) => (
            <li key={sk.id} className="flex items-center justify-between gap-2 text-sm">
              <span className="font-semibold">
                {sk.emoji} {sk.title}
              </span>
              <span className="text-right text-black/70">{positionText(level, sk.id, progress)}</span>
            </li>
          ))}
        </ul>
      </div>

      {(r.strong.length > 0 || r.needs.length > 0) && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {r.strong.length > 0 && (
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="font-bold text-emerald-900">✅ Doing well</p>
              <p className="mt-1 text-emerald-950">{r.strong.map((s) => s.label).join(", ")}</p>
            </div>
          )}
          {r.needs.length > 0 && (
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="font-bold text-amber-900">👉 Practise more</p>
              <p className="mt-1 text-amber-950">{r.needs.map((s) => s.label).join(", ")}</p>
            </div>
          )}
        </div>
      )}

      {r.recent.length > 0 ? (
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-2 font-bold">Recent activities</p>
          <ul className="divide-y divide-black/5">
            {r.recent.map((a) => (
              <li key={a.key} className="flex items-center justify-between gap-2 py-2">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold capitalize">{a.name}</span>
                  <span className="block text-xs text-black/60">
                    {whenText(a.entry.last)} · tried {a.entry.tries}×
                  </span>
                </span>
                <Stars count={a.entry.best} size="text-sm" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 rounded-2xl bg-sky-50 p-4 text-sky-950">No activities saved yet. Stars appear here after the child practises with the internet on.</p>
      )}
    </div>
  );
}
