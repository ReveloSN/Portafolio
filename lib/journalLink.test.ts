import { describe, expect, it } from "vitest";
import { BONE_SHAPES } from "@/data/fossilPuzzle";
import { sortedExperience } from "./collections";
import { boneLabelsByEntry } from "./journalLink";

describe("boneLabelsByEntry", () => {
  const labels = boneLabelsByEntry(sortedExperience, BONE_SHAPES);

  it("da un hueso distinto a cada experiencia", () => {
    const values = sortedExperience.map((entry) => labels[entry.id]);
    expect(values.every(Boolean)).toBe(true);
    expect(new Set(values).size).toBe(sortedExperience.length);
  });

  it("sigue el orden del puzle: la experiencia i es el hueso i", () => {
    sortedExperience.forEach((entry, i) => {
      expect(labels[entry.id]).toBe(BONE_SHAPES[i]?.label);
    });
  });
});
