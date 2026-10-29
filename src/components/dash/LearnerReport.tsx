"use client";

import { useState } from "react";
import { Stars, primaryButton, secondaryButton } from "@/components/ui";
import { call, type ClassRow, type LearnerRow } from "@/lib/account";
import { LEVELS, levelInfo, type LevelId } from "@/lib/levels";
import { saveLearner } from "@/lib/learners";
import { buildReport, whenText } from "@/lib/report";
import { ShareCode } from "@/components/dash/ShareCode";
import { SKILLS as STAGE_SKILLS } from "@/content/stages/generate";
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

/** One child's progress, plus edit / code / delete for the adult. */
export function LearnerReport({
  learner,
  classes,
  canMoveClass,
  spaceName,
  spaceKind,
  onClose,
  onChanged,
}: {
  learner: LearnerRow;
  classes: ClassRow[];
  canMoveClass: boolean;
  spaceName: string;
  spaceKind: "family" | "school";
  onClose: () => void;
  onChanged: () => void;
}) {
  const r = buildReport(learner.progress);
  const lvl = levelInfo(learner.level);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(learner.name);
  const [level, setLevel] = useState<LevelId>(learner.level);
  const [classId, setClassId] = useState(learner.classId ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function act(fn: () => Promise<unknown>, done?: string) {
    setBusy(true);
    setMsg(null);
    try {
      await fn();
      if (done) setMsg(done);
      onChanged();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "That didn't work.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-label={`${learner.name}'s progress`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-[#fffaf0] p-5 shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-3xl font-extrabold">{learner.name}</p>
            <p className="text-black/60">
              {lvl?.emoji} {lvl?.label} · Last active: {whenText(r.lastActive)}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="h-11 w-11 shrink-0 rounded-full bg-black/5 text-xl">✕</button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
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

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-sm font-bold text-black/60">Practice in the last 2 weeks</p>
          <div className="flex gap-1">
            {r.last14.map((d) => (
              <span
                key={d.day}
                title={d.day}
                className={`h-7 flex-1 rounded ${d.practised ? "bg-emerald-500" : "bg-black/10"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-3 font-bold">Skills</p>
          <div className="grid gap-3">
            {r.skills.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-sm font-semibold">
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
                <span className="text-right text-black/70">{positionText(learner.level, sk.id, learner.progress)}</span>
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

        {r.recent.length > 0 && (
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
        )}
        {r.activities === 0 && (
          <p className="mt-4 rounded-2xl bg-sky-50 p-4 text-sky-950">
            No activities yet. On the child&apos;s phone, open <strong>learn.zivarukah.com</strong> → <strong>Who is learning?</strong> and enter the code below.
          </p>
        )}

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="font-bold">🔑 Learner code</p>
          <ShareCode
            code={learner.code}
            message={`🔑 ${learner.name}'s ZIVA Literacy code: *${learner.code}*\n\nOpen https://learn.zivarukah.com/join/ on the phone, enter the code and start learning. Stars are saved for ${spaceName}.`}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                saveLearner({ code: learner.code, name: learner.name, level: learner.level, space: spaceName, kind: spaceKind }, true);
                setMsg(`✅ ${learner.name} is now learning on this phone. Open the lessons from the home page.`);
              }}
              className="rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-950"
            >
              📱 Use on this phone
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                if (confirm("Make a new code? The old code will stop working on other phones.")) act(() => call("lit_new_learner_code", { p_learner: learner.id }), "New code made.");
              }}
              className="rounded-full bg-black/5 px-4 py-2 text-sm font-bold"
            >
              🔄 New code
            </button>
          </div>
        </div>

        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              act(
                () => call("lit_update_learner", { p_learner: learner.id, p_name: name, p_level: level, p_class: classId || null }),
                "Saved.",
              ).then(() => setEditing(false));
            }}
            className="mt-4 grid gap-3 rounded-2xl bg-white p-4 shadow-sm"
          >
            <label className="grid gap-1 text-sm font-semibold">
              First name or nickname
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} className="rounded-xl border-2 border-black/15 px-3 py-2 text-lg" />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Class level
              <select value={level} onChange={(e) => setLevel(e.target.value as LevelId)} className="rounded-xl border-2 border-black/15 px-3 py-2 text-lg">
                {LEVELS.map((l) => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </label>
            {canMoveClass && classes.length > 0 && (
              <label className="grid gap-1 text-sm font-semibold">
                Class
                <select value={classId} onChange={(e) => setClassId(e.target.value)} className="rounded-xl border-2 border-black/15 px-3 py-2 text-lg">
                  <option value="">No class</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>
            )}
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className={primaryButton}>Save</button>
              <button type="button" onClick={() => setEditing(false)} className={secondaryButton}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => setEditing(true)} className={secondaryButton}>✏️ Edit</button>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                if (confirm(`Delete ${learner.name} and ALL their progress? This cannot be undone.`))
                  act(() => call("lit_delete_learner", { p_learner: learner.id })).then(onClose);
              }}
              className="rounded-full px-4 py-3 font-bold text-rose-700"
            >
              🗑️ Delete child
            </button>
          </div>
        )}
        {msg && <p role="status" className="mt-3 font-semibold">{msg}</p>}
      </div>
    </div>
  );
}
