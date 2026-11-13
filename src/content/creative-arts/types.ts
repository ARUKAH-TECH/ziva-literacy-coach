import type { ClassId } from "./curriculum";

/** Pictures drawn in code (work offline, no downloads). */
export type DiagramId =
  | "elements"
  | "principles"
  | "colour-wheel"
  | "shading"
  | "design-process"
  | "nature-to-design"
  | "drawing-tools"
  | "still-life"
  | "clay-steps"
  | "pattern-techniques"
  | "solfa-scale"
  | "note-values"
  | "conducting"
  | "dance-map"
  | "display-plan"
  | "appraisal-guide"
  | "print-making"
  | "weaving"
  | "tempo-dynamics"
  | "musical-forms"
  | "casting"
  | "folding"
  | "triads"
  | "stage-areas"
  | "texture-colour"
  | "value-scale"
  | "three-d"
  | "adinkra"
  | "kg-shapes"
  | "kg-colours"
  | "kg-lines"
  | "kg-draw-house"
  | "kg-draw-face"
  | "kg-patterns";

export interface LessonSection {
  heading: string;
  text?: string;
  points?: string[];
  diagram?: DiagramId;
}

export interface LessonQuestion {
  q: string;
  options: string[];
  /** Index of the right option. */
  answer: number;
  explain?: string;
}

/** One detailed lesson inside a content standard (opens on its own page). */
export interface Topic {
  title: string;
  emoji?: string;
  /** Explanation paragraphs, in simple, complete sentences. */
  explain: string[];
  diagram?: DiagramId;
  /** Worked examples or real-life examples: [heading, explanation]. */
  examples?: [string, string][];
  /** How to do it, step by step. */
  steps?: { title: string; items: string[] };
  /** "Did you know?" fact. */
  fact?: string;
  /** Short summary points to remember. */
  remember: string[];
  /** 2–3 quick questions to check understanding. */
  check: LessonQuestion[];
}

export interface Lesson {
  cls: ClassId;
  /** Content standard number, e.g. "1.1.1". */
  code: string;
  title: string;
  emoji: string;
  /** One or two sentences: what the learner will be able to do. */
  intro: string;
  sections: LessonSection[];
  /** Detailed lessons (when present they replace `sections`). */
  topics?: Topic[];
  /** Key words and their meanings. */
  words: [string, string][];
  materials?: string[];
  practical?: { title: string; steps: string[]; safety?: string };
  quiz: LessonQuestion[];
  /** Exam-style written questions with a model answer (JHS: BECE style). */
  written: { q: string; answer: string }[];
}
