import type { BoneShape } from "@/types/puzzle";
import type { ExperienceEntry } from "@/types/experience";

/**
 * Hueso del fósil que corresponde a cada experiencia. El puzle reparte los huesos en el
 * orden de `entries` (ver `buildBoardPieces`): la experiencia i es el hueso i.
 */
export function boneLabelsByEntry(
  entries: readonly ExperienceEntry[],
  shapes: readonly BoneShape[],
): Readonly<Record<string, string>> {
  const labels: Record<string, string> = {};
  entries.forEach((entry, i) => {
    const shape = shapes[i];
    if (shape) labels[entry.id] = shape.label;
  });
  return labels;
}
