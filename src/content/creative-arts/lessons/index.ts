import type { Lesson } from "../types";
import { B7 } from "./b7";

const ALL: Lesson[] = [...B7];

export function findLesson(cls: string, code: string) {
  return ALL.find((l) => l.cls === cls && l.code === code) ?? null;
}

export const lessonCount = (cls: string) => ALL.filter((l) => l.cls === cls).length;
