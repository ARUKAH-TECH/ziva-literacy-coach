// The optional online AI check of a handwriting photo (zivarukah.com reads
// it with an AI service and returns feedback; the photo is not stored).

export const AI_CHECK_URL = "https://zivarukah.com/api/literacy/handwriting";

export interface AiFeedback {
  ok: true;
  readText: string;
  matchesTarget: boolean;
  stars: number;
  summary: string;
  letters: { letter: string; issue: string; tip: string }[];
  strengths: string[];
  nextSteps: string[];
}

export async function aiCheckHandwriting(image: string, target: string, level: string): Promise<AiFeedback | { ok: false; message: string }> {
  if (typeof navigator !== "undefined" && !navigator.onLine) return { ok: false, message: "You're offline. The AI check needs internet." };
  try {
    const res = await fetch(AI_CHECK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, target, level }),
    });
    const data = await res.json();
    if (!data || data.ok !== true) return { ok: false, message: data?.message || "The AI check didn't work. Please try again." };
    return data as AiFeedback;
  } catch {
    return { ok: false, message: "Couldn't reach the AI checker. Check your internet and try again." };
  }
}
