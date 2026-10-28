"use client";

import { useMemo, useState } from "react";
import { Stars, primaryButton, secondaryButton } from "@/components/ui";
import { call, type LearnerRow, type Space } from "@/lib/account";
import { LEVELS, levelInfo, type LevelId } from "@/lib/levels";
import { buildReport, whenText } from "@/lib/report";
import { LearnerReport } from "@/components/dash/LearnerReport";
import { ShareCode } from "@/components/dash/ShareCode";

const input = "w-full rounded-xl border-2 border-black/15 bg-white px-3 py-2 text-lg";

function printCodes(title: string, rows: { name: string; code: string }[]) {
  const w = window.open("", "_blank");
  if (!w) return;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)} – learner codes</title>
<style>body{font-family:system-ui,Arial,sans-serif;margin:24px}h1{font-size:20px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.card{border:2px dashed #999;border-radius:12px;padding:12px}.n{font-size:20px;font-weight:800}.c{font:700 22px monospace;letter-spacing:2px;margin:6px 0}
.s{font-size:12px;color:#444}@media print{button{display:none}}</style></head><body>
<button onclick="print()">🖨️ Print</button><h1>${esc(title)} — ZIVA Literacy learner codes</h1><div class="grid">
${rows.map((r) => `<div class="card"><div class="n">${esc(r.name)}</div><div class="c">${esc(r.code)}</div><div class="s">Open learn.zivarukah.com/join and enter this code.</div></div>`).join("")}
</div></body></html>`);
  w.document.close();
}

function AddLearners({ space, onDone }: { space: Space; onDone: () => void }) {
  const school = space.kind === "school";
  const classes = space.classes;
  const [classId, setClassId] = useState(school ? classes[0]?.id ?? "" : "");
  const cls = classes.find((c) => c.id === classId);
  const [level, setLevel] = useState<LevelId>(cls?.level ?? "p1-3");
  const [names, setNames] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<{ name: string; code: string }[]>([]);
  const teacherOnly = space.role === "teacher";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const list = names.split(/\n|,/).map((n) => n.trim()).filter(Boolean);
    setBusy(true);
    setError(null);
    try {
      const res = await call<{ name: string; code: string }[]>("lit_add_learners", {
        p_group: space.id,
        p_class: classId || null,
        p_level: cls?.level ?? level,
        p_names: list,
        p_consent: consent,
      });
      setAdded(res);
      setNames("");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't work.");
    } finally {
      setBusy(false);
    }
  }

  if (teacherOnly && classes.length === 0) {
    return <p className="rounded-2xl bg-amber-50 p-4 text-amber-950">The head of school needs to give you a class before you can add learners.</p>;
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-lg font-extrabold">➕ Add {school ? "learners" : "a child"}</p>
      {school && (
        <label className="grid gap-1 text-sm font-semibold">
          Class
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className={input}>
            {!teacherOnly && <option value="">No class yet</option>}
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({levelInfo(c.level)?.short})
              </option>
            ))}
          </select>
        </label>
      )}
      {!cls && (
        <label className="grid gap-1 text-sm font-semibold">
          Class level
          <select value={level} onChange={(e) => setLevel(e.target.value as LevelId)} className={input}>
            {LEVELS.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </label>
      )}
      <label className="grid gap-1 text-sm font-semibold">
        {school ? "Names — one per line (first name only)" : "Child's first name or nickname"}
        {school ? (
          <textarea value={names} onChange={(e) => setNames(e.target.value)} rows={5} placeholder={"Esi\nKofi\nAbena"} className={input} />
        ) : (
          <input value={names} onChange={(e) => setNames(e.target.value)} maxLength={40} placeholder="e.g. Esi" className={input} />
        )}
      </label>
      <label className="flex items-start gap-3 rounded-xl bg-sky-50 p-3 text-sm">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5" />
        <span>
          {school
            ? "The school has permission from these children's parents or guardians to record their reading and writing practice here. We use first names only."
            : "I am this child's parent or guardian and I agree to save their first name and practice stars so I can follow their progress."}
        </span>
      </label>
      {error && <p role="alert" className="font-semibold text-rose-700">{error}</p>}
      <button type="submit" disabled={busy || !consent || !names.trim()} className={primaryButton}>
        {busy ? "Adding…" : school ? "Add learners" : "Add child"}
      </button>
      {added.length > 0 && (
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="font-bold text-emerald-900">✅ Added — give each child their code:</p>
          <ul className="mt-2 grid gap-1">
            {added.map((a) => (
              <li key={a.code} className="flex justify-between gap-2">
                <span className="font-semibold">{a.name}</span>
                <span className="font-mono font-bold tracking-wider">{a.code}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => printCodes(space.name, added)} className="rounded-full bg-white px-4 py-2 text-sm font-bold">🖨️ Print codes</button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`ZIVA Literacy learner codes (${space.name}):\n${added.map((a) => `${a.name}: ${a.code}`).join("\n")}\n\nOpen https://learn.zivarukah.com/join/ and enter the code.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25d366] px-4 py-2 text-sm font-bold text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </form>
  );
}

function Classes({ space, onDone }: { space: Space; onDone: () => void }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<LevelId>("p1-3");
  const [error, setError] = useState<string | null>(null);
  const teachers = space.members;
  const save = async (classId: string | null, n: string, l: LevelId, teacher: string | null) => {
    setError(null);
    try {
      await call("lit_save_class", { p_group: space.id, p_class: classId, p_name: n, p_level: l, p_teacher: teacher });
      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work.");
    }
  };
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-lg font-extrabold">🏫 Classes</p>
      {space.classes.length === 0 && <p className="text-black/60">No classes yet. Add your first class below.</p>}
      {space.classes.map((c) => (
        <div key={c.id} className="flex flex-wrap items-center gap-2 rounded-xl bg-black/5 p-3">
          <span className="min-w-24 font-bold">{c.name}</span>
          <span className="text-sm text-black/60">{levelInfo(c.level)?.short}</span>
          <select
            value={c.teacherId ?? ""}
            onChange={(e) => save(c.id, c.name, c.level, e.target.value || null)}
            aria-label={`Teacher for ${c.name}`}
            className="ml-auto rounded-lg border border-black/15 bg-white px-2 py-1 text-sm"
          >
            <option value="">No teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
                {t.role === "head" ? " (head)" : ""}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={async () => {
              if (!confirm(`Delete class ${c.name}? Its learners stay, without a class.`)) return;
              try {
                await call("lit_delete_class", { p_class: c.id });
                onDone();
              } catch (e) {
                setError(e instanceof Error ? e.message : "That didn't work.");
              }
            }}
            className="rounded-full px-2 text-sm text-rose-700"
            aria-label={`Delete ${c.name}`}
          >
            🗑️
          </button>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) save(null, name, level, null).then(() => setName(""));
        }}
        className="flex flex-wrap gap-2"
      >
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. P2 Blue" maxLength={40} className={`${input} flex-1 min-w-32`} />
        <select value={level} onChange={(e) => setLevel(e.target.value as LevelId)} className="rounded-xl border-2 border-black/15 bg-white px-2 text-base">
          {LEVELS.map((l) => (
            <option key={l.id} value={l.id}>{l.short}</option>
          ))}
        </select>
        <button type="submit" className={primaryButton}>Add class</button>
      </form>
      {error && <p role="alert" className="font-semibold text-rose-700">{error}</p>}
    </div>
  );
}

function People({ space, onDone }: { space: Space; onDone: () => void }) {
  const [code, setCode] = useState(space.joinCode);
  const [error, setError] = useState<string | null>(null);
  const school = space.kind === "school";
  const manage = space.role === "parent" || space.role === "head";
  const run = async (fn: string, args: Record<string, unknown>) => {
    setError(null);
    try {
      await call(fn, args);
      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work.");
    }
  };
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-lg font-extrabold">{school ? "👩‍🏫 Teachers & heads" : "👨‍👩‍👧 Parents & guardians"}</p>
      <ul className="grid gap-2">
        {space.members.map((m) => (
          <li key={m.id} className="flex flex-wrap items-center gap-2 rounded-xl bg-black/5 p-3">
            <span className="font-semibold">
              {m.name} {m.me && <span className="text-sm text-black/50">(you)</span>}
            </span>
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold capitalize">{m.role}</span>
            <span className="ml-auto flex gap-2">
              {space.role === "head" && !m.me && (
                <button
                  type="button"
                  onClick={() => run("lit_set_member", { p_group: space.id, p_account: m.id, p_role: m.role === "head" ? "teacher" : "head" })}
                  className="text-xs font-bold text-ziva underline"
                >
                  {m.role === "head" ? "Make teacher" : "Make head"}
                </button>
              )}
              {manage && !m.me && (
                <button
                  type="button"
                  onClick={() => confirm(`Remove ${m.name}?`) && run("lit_set_member", { p_group: space.id, p_account: m.id, p_role: null })}
                  className="text-xs font-bold text-rose-700 underline"
                >
                  Remove
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
      {manage && code && (
        <div className="rounded-xl bg-amber-50 p-3">
          <p className="text-sm font-semibold">
            {school ? "Invite a teacher: they register, tap “Join with a code” and enter:" : "Invite another parent or guardian: they register, tap “Join with a code” and enter:"}
          </p>
          <ShareCode
            code={code}
            message={`Join ${space.name} on ZIVA Literacy 📚\n\n1. Open https://learn.zivarukah.com/account/\n2. Register with your phone number\n3. Tap “Join with a code” and enter: *${code}*`}
          />
          <button
            type="button"
            onClick={async () => {
              if (!confirm("Make a new invite code? The old one will stop working.")) return;
              try {
                setCode(await call<string>("lit_new_join_code", { p_group: space.id }));
              } catch (e) {
                setError(e instanceof Error ? e.message : "That didn't work.");
              }
            }}
            className="mt-2 text-xs font-bold text-black/60 underline"
          >
            Make a new invite code
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          const me = space.members.find((m) => m.me);
          if (me && confirm(`Leave ${space.name}? ${space.members.length === 1 ? "You are the only member — it and all its children's data will be deleted." : ""}`))
            run("lit_set_member", { p_group: space.id, p_account: me.id, p_role: null });
        }}
        className="justify-self-start text-sm font-bold text-rose-700 underline"
      >
        Leave {school ? "school" : "family"}
      </button>
      {error && <p role="alert" className="font-semibold text-rose-700">{error}</p>}
    </div>
  );
}

function LearnerTile({ l, onOpen, className }: { l: LearnerRow; onOpen: () => void; className?: string }) {
  const r = buildReport(l.progress);
  return (
    <button type="button" onClick={onOpen} className={`flex items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm active:scale-[0.99] ${className ?? ""}`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-xl font-extrabold text-[#14110c]">{l.name.slice(0, 1).toUpperCase()}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-lg font-extrabold">{l.name}</span>
        <span className="block text-xs text-black/60">
          {levelInfo(l.level)?.short} · {whenText(r.lastActive)} · {r.daysThisWeek} day{r.daysThisWeek === 1 ? "" : "s"} this week
        </span>
        {r.needs.length > 0 && <span className="block truncate text-xs font-semibold text-amber-800">👉 {r.needs.map((s) => s.label).join(", ")}</span>}
      </span>
      <span className="shrink-0 text-right">
        <Stars count={r.stars} size="text-xs" />
        <span className="block text-xs text-black/50">{r.activities} done</span>
      </span>
    </button>
  );
}

export function SpaceView({ space, onChanged }: { space: Space; onChanged: () => void }) {
  const school = space.kind === "school";
  const [tab, setTab] = useState<"learners" | "add" | "classes" | "people">("learners");
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(space.name);
  const learner = space.learners.find((l) => l.id === open) ?? null;

  const shown = useMemo(
    () => space.learners.filter((l) => filter === "all" || (filter === "none" ? !l.classId : l.classId === filter)),
    [space.learners, filter],
  );
  const reports = space.learners.map((l) => buildReport(l.progress));
  const activeWeek = reports.filter((r) => r.daysThisWeek > 0).length;
  const withStars = reports.filter((r) => r.activities > 0);
  const avg = withStars.length ? withStars.reduce((a, r) => a + r.avg, 0) / withStars.length : 0;

  const tabs: { id: typeof tab; label: string }[] = [
    { id: "learners", label: school ? `🧒 Learners (${space.learners.length})` : `🧒 Children (${space.learners.length})` },
    { id: "add", label: "➕ Add" },
    ...(school && space.role === "head" ? [{ id: "classes" as const, label: "🏫 Classes" }] : []),
    { id: "people", label: school ? "👩‍🏫 Staff" : "👨‍👩‍👧 Parents" },
  ];

  return (
    <section className="rounded-3xl bg-white/60 p-4 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-3xl">{school ? "🏫" : "🏠"}</span>
        {renaming ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await call("lit_rename_space", { p_group: space.id, p_name: newName }).catch(() => {});
              setRenaming(false);
              onChanged();
            }}
            className="flex flex-1 gap-2"
          >
            <input value={newName} onChange={(e) => setNewName(e.target.value)} maxLength={80} className={input} />
            <button type="submit" className="rounded-full bg-ziva px-4 font-bold text-white">Save</button>
          </form>
        ) : (
          <h2 className="min-w-0 flex-1 basis-48 text-2xl font-extrabold leading-tight">{space.name}</h2>
        )}
        <span className="rounded-full bg-ziva/10 px-3 py-1 text-sm font-bold text-ziva">{space.role === "head" ? "Head of school" : space.role === "teacher" ? "Teacher" : "Parent"}</span>
        {!renaming && space.role !== "teacher" && (
          <button type="button" onClick={() => setRenaming(true)} className="text-sm text-black/50 underline">Rename</button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-white p-3">
          <p className="text-2xl font-extrabold">{space.learners.length}</p>
          <p className="text-xs text-black/60">{school ? "learners" : "children"}</p>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <p className="text-2xl font-extrabold">{activeWeek}</p>
          <p className="text-xs text-black/60">practised this week</p>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <p className="text-2xl font-extrabold">{avg ? avg.toFixed(1) : "–"}</p>
          <p className="text-xs text-black/60">average stars</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${tab === t.id ? "bg-ziva text-white" : "bg-white text-black/70"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "learners" && (
          <div className="grid gap-3">
            {school && space.classes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border-2 border-black/15 bg-white px-3 py-2">
                  <option value="all">All classes</option>
                  {space.classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                  {space.role !== "teacher" && <option value="none">No class</option>}
                </select>
                {shown.length > 0 && (
                  <button type="button" onClick={() => printCodes(space.name, shown)} className="rounded-full bg-white px-4 py-2 text-sm font-bold">
                    🖨️ Print codes
                  </button>
                )}
              </div>
            )}
            {shown.length === 0 && (
              <p className="rounded-2xl bg-white p-4 text-black/60">
                No {school ? "learners" : "children"} yet.{" "}
                <button type="button" onClick={() => setTab("add")} className="font-bold text-ziva underline">Add {school ? "learners" : "a child"}</button>
              </p>
            )}
            {shown.map((l) => (
              <LearnerTile key={l.id} l={l} onOpen={() => setOpen(l.id)} />
            ))}
          </div>
        )}
        {tab === "add" && <AddLearners space={space} onDone={onChanged} />}
        {tab === "classes" && <Classes space={space} onDone={onChanged} />}
        {tab === "people" && <People space={space} onDone={onChanged} />}
      </div>

      {learner && (
        <LearnerReport
          learner={learner}
          classes={space.classes}
          canMoveClass={school && space.role === "head"}
          spaceName={space.name}
          spaceKind={space.kind}
          onClose={() => setOpen(null)}
          onChanged={onChanged}
        />
      )}
    </section>
  );
}
