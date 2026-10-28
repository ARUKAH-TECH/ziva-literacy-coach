"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TraceItem } from "@/content/handwriting";

// A tracing board. The child traces the dotted guide with a finger, stylus
// or mouse; "Check" compares their ink with the guide:
//   coverage — how much of the guide they traced,
//   accuracy — how much of their ink stayed near the guide.
// Everything happens on the device; drawings are not saved or sent.

const W = 800; // logical board width (scaled to the screen)
const FONT = `500 {size}px "Trebuchet MS", "Segoe UI", system-ui, sans-serif`;

interface Layout {
  h: number;
  lines: string[];
  size: number; // font size
  baselines: number[]; // y of each text line's baseline
}

function layoutFor(item: TraceItem, ctx: CanvasRenderingContext2D): Layout {
  if (item.kind === "stroke") return { h: 600, lines: [], size: 0, baselines: [] };
  const text = item.text;
  if (text.length <= 2) return { h: 600, lines: [text], size: 420, baselines: [440] };
  // Words/sentences: one or two lines, as big as fits.
  const words = text.split(" ");
  const tryLines = (n: number) => {
    if (n === 1) return [text];
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  };
  let best: Layout | null = null;
  for (const n of [1, 2]) {
    if (n === 2 && words.length < 2) continue;
    const lines = tryLines(n);
    let size = n === 1 ? 200 : 150;
    for (; size > 60; size -= 4) {
      ctx.font = FONT.replace("{size}", String(size));
      if (Math.max(...lines.map((l) => ctx.measureText(l).width)) <= W - 80) break;
    }
    const lineH = size * 1.55;
    const h = Math.round(size * 1.05 + (n - 1) * lineH + size * 0.42);
    const layout = { h, lines, size, baselines: lines.map((_, k) => Math.round(size * 1.05 + k * lineH)) };
    if (!best || size > best.size * 1.15) best = layout;
  }
  return best!;
}

function drawGuideLines(ctx: CanvasRenderingContext2D, layout: Layout) {
  for (const base of layout.baselines) {
    const s = layout.size;
    const top = base - s * 0.72;
    const mid = base - s * 0.5;
    const desc = base + s * 0.22;
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.strokeStyle = "#93c5fd";
    ctx.beginPath(); ctx.moveTo(20, top); ctx.lineTo(W - 20, top); ctx.stroke();
    ctx.strokeStyle = "#ef4444";
    ctx.beginPath(); ctx.moveTo(20, base); ctx.lineTo(W - 20, base); ctx.stroke();
    ctx.strokeStyle = "#93c5fd";
    ctx.beginPath(); ctx.moveTo(20, desc); ctx.lineTo(W - 20, desc); ctx.stroke();
    ctx.setLineDash([14, 12]);
    ctx.strokeStyle = "#cbd5e1";
    ctx.beginPath(); ctx.moveTo(20, mid); ctx.lineTo(W - 20, mid); ctx.stroke();
    ctx.setLineDash([]);
  }
}

/** Draws the guide shape in one style: "show" (dotted, for the child), "core" (thin, for scoring), "zone" (thick tolerance). */
function drawGuide(ctx: CanvasRenderingContext2D, item: TraceItem, layout: Layout, style: "show" | "core" | "zone") {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (item.kind === "stroke") {
    const p = new Path2D(item.path);
    ctx.scale(2, 2); // paths are written for a 400×300 board
    if (style === "show") {
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 16;
      ctx.stroke(p);
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 3;
      ctx.setLineDash([2, 10]);
      ctx.stroke(p);
    } else {
      ctx.strokeStyle = "#000";
      ctx.lineWidth = style === "core" ? 4 : 30;
      ctx.stroke(p);
    }
  } else {
    ctx.font = FONT.replace("{size}", String(layout.size));
    ctx.textBaseline = "alphabetic";
    layout.lines.forEach((line, k) => {
      const width = ctx.measureText(line).width;
      const x = (W - width) / 2;
      const y = layout.baselines[k];
      if (style === "show") {
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(line, x, y);
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = Math.max(2, layout.size / 60);
        ctx.setLineDash([3, layout.size / 22]);
        ctx.strokeText(line, x, y);
      } else if (style === "core") {
        ctx.fillStyle = "#000";
        ctx.fillText(line, x, y);
      } else {
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = layout.size / 7;
        ctx.fillText(line, x, y);
        ctx.strokeText(line, x, y);
      }
    });
  }
  ctx.restore();
}

function startPoint(item: TraceItem): [number, number] | null {
  if (item.kind !== "stroke") return null;
  const m = item.path.match(/M\s*([\d.]+)[ ,]([\d.]+)/);
  return m ? [Number(m[1]) * 2, Number(m[2]) * 2] : null;
}

type Point = [number, number];

export interface TraceScore {
  stars: number;
  coverage: number;
  accuracy: number;
  tip: string;
}

export function TracePad({ item, onChecked }: { item: TraceItem; onChecked: (score: TraceScore) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Point[][]>([]);
  const drawing = useRef<Point[] | null>(null);
  const [layout, setLayout] = useState<Layout>({ h: 600, lines: [], size: 0, baselines: [] });
  const [hasInk, setHasInk] = useState(false);

  const paint = useCallback(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, W, layout.h);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, layout.h);
    if (item.kind === "text") drawGuideLines(ctx, layout);
    drawGuide(ctx, item, layout, "show");
    const start = startPoint(item);
    if (start) {
      ctx.fillStyle = "#16a34a";
      ctx.beginPath();
      ctx.arc(start[0], start[1], 16, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "#0b69a8";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = item.kind === "text" ? Math.max(10, layout.size / 16) : 14;
    for (const s of [...strokes.current, ...(drawing.current ? [drawing.current] : [])]) {
      ctx.beginPath();
      s.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      if (s.length === 1) ctx.lineTo(s[0][0] + 0.1, s[0][1]);
      ctx.stroke();
    }
  }, [item, layout]);

  // New item: work out the layout and reset the ink.
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const l = layoutFor(item, c.getContext("2d")!);
    c.width = W;
    c.height = l.h;
    strokes.current = [];
    drawing.current = null;
    setHasInk(false);
    setLayout(l);
  }, [item]);

  useEffect(() => paint(), [paint]);

  const toPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();
    return [((e.clientX - rect.left) / rect.width) * W, ((e.clientY - rect.top) / rect.height) * layout.h];
  };

  function check() {
    // Score on a small grid (fast on cheap phones).
    const gw = 200;
    const gh = Math.round((layout.h / W) * gw);
    const make = () => {
      const off = document.createElement("canvas");
      off.width = gw;
      off.height = gh;
      const ctx = off.getContext("2d", { willReadFrequently: true })!;
      ctx.scale(gw / W, gh / layout.h);
      return { off, ctx };
    };
    const inkWidth = item.kind === "text" ? Math.max(10, layout.size / 16) : 14;
    const drawInk = (ctx: CanvasRenderingContext2D, width: number) => {
      ctx.strokeStyle = "#000";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = width;
      for (const s of strokes.current) {
        ctx.beginPath();
        s.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        if (s.length === 1) ctx.lineTo(s[0][0] + 0.1, s[0][1]);
        ctx.stroke();
      }
    };
    const pixels = (ctx: CanvasRenderingContext2D) => ctx.getImageData(0, 0, gw, gh).data;

    const core = make(); drawGuide(core.ctx, item, layout, "core");
    const zone = make(); drawGuide(zone.ctx, item, layout, "zone");
    const inkWide = make(); drawInk(inkWide.ctx, item.kind === "text" ? layout.size / 6 : 46);
    const inkThin = make(); drawInk(inkThin.ctx, inkWidth);
    const c = pixels(core.ctx), z = pixels(zone.ctx), iw = pixels(inkWide.ctx), it = pixels(inkThin.ctx);

    let coreN = 0, covered = 0, inkN = 0, inside = 0;
    for (let k = 3; k < c.length; k += 4) {
      if (c[k] > 100) { coreN++; if (iw[k] > 100) covered++; }
      if (it[k] > 100) { inkN++; if (z[k] > 100) inside++; }
    }
    const coverage = coreN ? covered / coreN : 0;
    const accuracy = inkN ? inside / inkN : 0;
    const score = coverage * 0.6 + accuracy * 0.4;
    const stars = score >= 0.9 ? 5 : score >= 0.8 ? 4 : score >= 0.7 ? 3 : score >= 0.55 ? 2 : score >= 0.4 ? 1 : 0;
    const tip =
      coverage < 0.7 ? "Trace the whole shape — follow every part of the dotted guide." :
      accuracy < 0.75 ? "Try to stay on the dotted line." :
      stars === 5 ? "Beautiful, neat writing!" : "Nice! Go slowly for even neater writing.";
    onChecked({ stars, coverage, accuracy, tip });
  }

  return (
    <div className="flex flex-col gap-3">
      <canvas
        ref={canvas}
        aria-label={`Tracing board: ${item.label}`}
        className="w-full touch-none rounded-3xl border-4 border-ziva/20 bg-white shadow-inner"
        style={{ aspectRatio: `${W} / ${layout.h}` }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drawing.current = [toPoint(e)];
          paint();
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          drawing.current.push(toPoint(e));
          paint();
        }}
        onPointerUp={() => {
          if (drawing.current) strokes.current.push(drawing.current);
          drawing.current = null;
          setHasInk(strokes.current.length > 0);
          paint();
        }}
        onPointerCancel={() => {
          drawing.current = null;
          paint();
        }}
      />
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            strokes.current.pop();
            setHasInk(strokes.current.length > 0);
            paint();
          }}
          disabled={!hasInk}
          className="min-h-12 rounded-full border-2 border-black/15 bg-white px-5 text-lg font-bold disabled:opacity-40"
        >
          ↩️ Undo
        </button>
        <button
          type="button"
          onClick={() => {
            strokes.current = [];
            setHasInk(false);
            paint();
          }}
          disabled={!hasInk}
          className="min-h-12 rounded-full border-2 border-black/15 bg-white px-5 text-lg font-bold disabled:opacity-40"
        >
          🧽 Clear
        </button>
        <button type="button" onClick={check} disabled={!hasInk} className="min-h-12 rounded-full bg-ziva px-6 text-lg font-bold text-white shadow disabled:opacity-40">
          ✅ Check
        </button>
      </div>
    </div>
  );
}
