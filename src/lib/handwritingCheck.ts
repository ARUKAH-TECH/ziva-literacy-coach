// On-phone check of handwriting on paper. The photo never leaves the phone.
//
// It cannot read WHICH letters were written (that needs the online AI check);
// it measures how the writing looks:
//   - size:    are the letters about the same height?
//   - line:    does each line of writing stay level (on the line)?
//   - spacing: are the gaps between letters even, with clear word gaps?
//   - slant:   do the letters lean the same way?
//   - neat:    few stray marks and scribbles?
// From these it gives stars, strengths and next steps.

export interface PaperCheck {
  ok: true;
  stars: number;
  letters: number;
  lines: number;
  scores: { size: number; line: number; spacing: number; slant: number; neat: number }; // 0–1 each
  strengths: string[];
  next: string[];
}

export interface PaperProblem {
  ok: false;
  message: string;
}

interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  n: number; // ink pixels
  sx: number;
  sy: number;
  sxx: number;
  syy: number;
  sxy: number;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const median = (a: number[]) => {
  if (!a.length) return 0;
  const s = [...a].sort((p, q) => p - q);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const mean = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const cv = (a: number[]) => {
  if (a.length < 2) return 0;
  const m = mean(a);
  if (!m) return 0;
  return Math.sqrt(mean(a.map((v) => (v - m) ** 2))) / m;
};

async function loadBitmap(file: Blob): Promise<ImageBitmap | HTMLImageElement> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("bad image"));
        img.src = url;
      });
      return img;
    } finally {
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }
}

/** Grey pixels (0–255) of the photo, longest side `maxEdge`. */
async function greyPixels(file: Blob, maxEdge = 900) {
  const bmp = await loadBitmap(file);
  const w0 = "naturalWidth" in bmp ? bmp.naturalWidth : bmp.width;
  const h0 = "naturalHeight" in bmp ? bmp.naturalHeight : bmp.height;
  const scale = Math.min(1, maxEdge / Math.max(w0, h0));
  const w = Math.max(1, Math.round(w0 * scale));
  const h = Math.max(1, Math.round(h0 * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(bmp as CanvasImageSource, 0, 0, w, h);
  if ("close" in bmp) bmp.close();
  const rgba = ctx.getImageData(0, 0, w, h).data;
  const grey = new Float32Array(w * h);
  const blueish = new Uint8Array(w * h);
  for (let i = 0, p = 0; i < grey.length; i++, p += 4) {
    const r = rgba[p], g = rgba[p + 1], b = rgba[p + 2];
    grey[i] = 0.299 * r + 0.587 * g + 0.114 * b;
    // Printed exercise-book lines are usually light blue/red: remember them.
    blueish[i] = (b - r > 35 && b > 120) || (r - g > 60 && r - b > 40 && r > 150) ? 1 : 0;
  }
  return { w, h, grey, blueish };
}

/** Dark-on-light ink mask using a local (adaptive) threshold. */
function inkMask(w: number, h: number, grey: Float32Array, blueish: Uint8Array) {
  const integral = new Float64Array((w + 1) * (h + 1));
  for (let y = 0; y < h; y++) {
    let row = 0;
    for (let x = 0; x < w; x++) {
      row += grey[y * w + x];
      integral[(y + 1) * (w + 1) + x + 1] = integral[y * (w + 1) + x + 1] + row;
    }
  }
  const r = Math.max(8, Math.round(Math.max(w, h) / 24));
  const mask = new Uint8Array(w * h);
  let darkSum = 0, lightSum = 0, darkN = 0, lightN = 0;
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - r), y1 = Math.min(h, y + r + 1);
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - r), x1 = Math.min(w, x + r + 1);
      const area = (y1 - y0) * (x1 - x0);
      const sum = integral[y1 * (w + 1) + x1] - integral[y0 * (w + 1) + x1] - integral[y1 * (w + 1) + x0] + integral[y0 * (w + 1) + x0];
      const local = sum / area;
      const v = grey[y * w + x];
      if (v < local - 22 && !blueish[y * w + x]) {
        mask[y * w + x] = 1;
        darkSum += v;
        darkN++;
      } else {
        lightSum += v;
        lightN++;
      }
    }
  }
  const contrast = darkN && lightN ? lightSum / lightN - darkSum / darkN : 0;
  return { mask, contrast, inkShare: darkN / (w * h) };
}

/** Connected groups of ink (8-neighbour flood fill). */
function components(w: number, h: number, mask: Uint8Array): Box[] {
  const seen = new Uint8Array(w * h);
  const boxes: Box[] = [];
  const stack: number[] = [];
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || seen[start]) continue;
    const b: Box = { x0: w, y0: h, x1: 0, y1: 0, n: 0, sx: 0, sy: 0, sxx: 0, syy: 0, sxy: 0 };
    stack.push(start);
    seen[start] = 1;
    while (stack.length) {
      const i = stack.pop()!;
      const x = i % w, y = (i - x) / w;
      b.n++;
      b.sx += x; b.sy += y; b.sxx += x * x; b.syy += y * y; b.sxy += x * y;
      if (x < b.x0) b.x0 = x;
      if (x > b.x1) b.x1 = x;
      if (y < b.y0) b.y0 = y;
      if (y > b.y1) b.y1 = y;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= w) continue;
          const j = yy * w + xx;
          if (mask[j] && !seen[j]) {
            seen[j] = 1;
            stack.push(j);
          }
        }
      }
    }
    boxes.push(b);
  }
  return boxes;
}

/** Lean of a mark in degrees from upright (positive = leans right). */
function slantOf(b: Box) {
  const mx = b.sx / b.n, my = b.sy / b.n;
  const cxx = b.sxx / b.n - mx * mx;
  const cyy = b.syy / b.n - my * my;
  const cxy = b.sxy / b.n - mx * my;
  // Principal axis angle from the x-axis; convert to lean from vertical.
  const theta = 0.5 * Math.atan2(2 * cxy, cxx - cyy);
  let fromVertical = 90 - (-theta * 180) / Math.PI;
  if (fromVertical > 90) fromVertical -= 180;
  return { lean: fromVertical, elongation: Math.max(cxx, cyy) / Math.max(1e-6, Math.min(cxx, cyy)) };
}

export async function checkPaperHandwriting(file: Blob): Promise<PaperCheck | PaperProblem> {
  let px;
  try {
    px = await greyPixels(file);
  } catch {
    return { ok: false, message: "That picture couldn't be opened. Please try another photo." };
  }
  const { w, h, grey, blueish } = px;
  const { mask, contrast, inkShare } = inkMask(w, h, grey, blueish);
  if (contrast < 35) {
    return { ok: false, message: "The photo is too dark or blurry. Take it in good light, hold the phone still, and fill the screen with the writing." };
  }
  if (inkShare > 0.3) {
    return { ok: false, message: "Too much is dark in this photo. Put the paper on a plain table and photograph only the writing." };
  }

  const edge = Math.round(Math.min(w, h) * 0.025);
  const all = components(w, h, mask).filter(
    (b) => b.x0 > edge && b.y0 > edge && b.x1 < w - edge && b.y1 < h - edge && b.x1 - b.x0 < w * 0.5 && b.y1 - b.y0 < h * 0.5,
  );
  const sizes = all.map((b) => b.n);
  const big = median(sizes.filter((n) => n > 12)) || 0;
  const letters = all.filter((b) => b.n >= Math.max(15, big * 0.12) && b.y1 - b.y0 >= 4);
  const specks = all.filter((b) => b.n < Math.max(15, big * 0.12)).length;
  if (letters.length < 2) {
    return { ok: false, message: "No writing found. Write with a dark pencil or pen, then photograph it closer." };
  }

  // Group marks into lines of writing by their vertical middle.
  const heights = letters.map((b) => b.y1 - b.y0 + 1);
  const hMed = median(heights);
  const byY = [...letters].sort((a, b) => (a.y0 + a.y1) / 2 - (b.y0 + b.y1) / 2);
  const rows: Box[][] = [];
  for (const b of byY) {
    const cy = (b.y0 + b.y1) / 2;
    const row = rows[rows.length - 1];
    if (row && Math.abs(cy - mean(row.map((r) => (r.y0 + r.y1) / 2))) < hMed * 0.9) row.push(b);
    else rows.push([b]);
  }
  const textRows = rows.filter((r) => r.length >= 2);

  // 1. Size: letter heights alike (ignore tall/tail letters by using the middle half).
  const sorted = [...heights].sort((a, b) => a - b);
  const core = sorted.slice(Math.floor(sorted.length * 0.2), Math.ceil(sorted.length * 0.8));
  const size = clamp01(1 - (cv(core.length >= 2 ? core : heights) - 0.12) / 0.45);

  // 2. Line: bottoms of letters in each row sit on a straight line.
  const lineErrors: number[] = [];
  for (const row of textRows) {
    const xs = row.map((b) => (b.x0 + b.x1) / 2);
    const ys = row.map((b) => b.y1);
    const mx = mean(xs), my = mean(ys);
    const sxx = mean(xs.map((x) => (x - mx) ** 2)) || 1;
    const slope = mean(xs.map((x, i) => (x - mx) * (ys[i] - my))) / sxx;
    const resid = ys.map((y, i) => Math.abs(y - (my + slope * (xs[i] - mx))));
    lineErrors.push(median(resid) / hMed + Math.min(0.5, Math.abs(slope)) * 0.6);
  }
  const line = textRows.length ? clamp01(1 - (mean(lineErrors) - 0.08) / 0.4) : 0.6;

  // 3. Spacing: even gaps between letters; word gaps clearly bigger.
  const letterGaps: number[] = [];
  let wordGaps = 0, touching = 0;
  for (const row of textRows) {
    const r = [...row].sort((a, b) => a.x0 - b.x0);
    for (let i = 1; i < r.length; i++) {
      const gap = r[i].x0 - r[i - 1].x1;
      if (gap < -hMed * 0.15) touching++;
      else if (gap > hMed * 0.9) wordGaps++;
      else letterGaps.push(Math.max(0, gap));
    }
  }
  const spacing = clamp01(1 - (cv(letterGaps) - 0.35) / 0.9 - Math.min(0.4, touching / Math.max(1, letters.length)));

  // 4. Slant: letters lean the same way (only clearly tall marks count).
  // Only long thin strokes (l, t, i, h, d…) show slant reliably; round letters are ignored.
  const leans = letters.map(slantOf).filter((s) => s.elongation > 4).map((s) => s.lean);
  const leanSpread = leans.length >= 3 ? Math.sqrt(mean(leans.map((l) => (l - mean(leans)) ** 2))) : 10;
  const slant = leans.length >= 3 ? clamp01(1 - (leanSpread - 12) / 22) : 0.75;

  // 5. Neat: few specks/scribbles compared with letters.
  const messy = letters.filter((b) => b.n / ((b.x1 - b.x0 + 1) * (b.y1 - b.y0 + 1)) > 0.55 && b.n > big * 2).length;
  const neat = clamp01(1 - specks / Math.max(1, letters.length) / 1.5 - (messy / letters.length) * 1.5);

  const scores = { size, line, spacing, slant, neat };
  const total = size * 0.25 + line * 0.25 + spacing * 0.2 + slant * 0.15 + neat * 0.15;
  const stars = Math.max(1, Math.min(5, Math.round(total * 5)));

  const strengths: string[] = [];
  const next: string[] = [];
  const add = (score: number, good: string, needs: string) => (score >= 0.7 ? strengths.push(good) : next.push(needs));
  add(size, "Your letters are a steady size.", "Make your letters the same size — small letters should all reach the same height.");
  add(line, "Your writing sits nicely on the line.", "Keep your letters sitting on the line. Use lined paper and rest each letter on it.");
  add(spacing, "Good, even spacing.", "Space your letters evenly. Leave a finger space between words.");
  add(slant, "Your letters lean the same way.", "Keep your letters standing straight (or all leaning the same way).");
  add(neat, "Neat — very few stray marks.", "Write slowly to avoid extra marks. Rub out mistakes gently.");
  if (touching > letters.length * 0.2) next.push("Some letters are crowded together — give each letter its own space.");
  if (textRows.length === 0) next.push("Write in a straight row across the page.");

  return { ok: true, stars, letters: letters.length, lines: Math.max(1, textRows.length), scores, strengths, next };
}

/** Smaller JPEG for the online AI check (about 1024px, ~100–250 KB). */
export async function photoForUpload(file: Blob, maxEdge = 1024): Promise<string> {
  const bmp = await loadBitmap(file);
  const w0 = "naturalWidth" in bmp ? bmp.naturalWidth : bmp.width;
  const h0 = "naturalHeight" in bmp ? bmp.naturalHeight : bmp.height;
  const scale = Math.min(1, maxEdge / Math.max(w0, h0));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w0 * scale);
  canvas.height = Math.round(h0 * scale);
  canvas.getContext("2d")!.drawImage(bmp as CanvasImageSource, 0, 0, canvas.width, canvas.height);
  if ("close" in bmp) bmp.close();
  return canvas.toDataURL("image/jpeg", 0.8);
}
