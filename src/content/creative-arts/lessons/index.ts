import type { Lesson } from "../types";
import { B7 } from "./b7";
import { B8 } from "./b8";
import { B9 } from "./b9";
import { PRIMARY } from "./primary";
import { KG } from "./kg";

const ALL: Lesson[] = [...KG, ...PRIMARY, ...B7, ...B8, ...B9];

export function findLesson(cls: string, code: string) {
  return ALL.find((l) => l.cls === cls && l.code === code) ?? null;
}

export const lessonCount = (cls: string) => ALL.filter((l) => l.cls === cls).length;
