import { describe, expect, it } from "vitest";
import type { ExperienceEntry } from "@/types/experience";
import { createInitialPuzzleState, puzzleReducer } from "./fossilPuzzle";
import { describePuzzleEvent, type PuzzleAnnounceCopy } from "./puzzleAnnouncement";

const COPY: PuzzleAnnounceCopy = {
  select: "{bone} tomado",
  cancel: "{bone} soltado",
  place: "{bone}: {title} en {organization}, {period}. {placed} de {total}",
  miss: "{bone} no encaja",
  placeAll: "completo {placed} de {total}",
  reset: "reiniciado",
};

const entry = (id: string): ExperienceEntry => ({
  id,
  kind: "work",
  startYear: 2024,
  endYear: null,
  periodLabel: "2024 – Hoy",
  title: "Cargo",
  organization: "Empresa",
  achievements: [],
});

const PIECES = [
  { bone: "el cráneo", entry: entry("a") },
  { bone: "la cola", entry: entry("b") },
];

describe("describePuzzleEvent", () => {
  it("no anuncia nada al empezar", () => {
    expect(describePuzzleEvent(createInitialPuzzleState(2), PIECES, COPY)).toBe("");
  });

  it("al encajar dice qué experiencia reveló y el progreso", () => {
    const state = puzzleReducer(createInitialPuzzleState(2), { type: "place", index: 1 });
    expect(describePuzzleEvent(state, PIECES, COPY)).toBe(
      "la cola: Cargo en Empresa, 2024 – Hoy. 1 de 2",
    );
  });

  it("anuncia el fallo con el nombre del hueso", () => {
    const state = puzzleReducer(createInitialPuzzleState(2), { type: "miss", index: 0 });
    expect(describePuzzleEvent(state, PIECES, COPY)).toBe("el cráneo no encaja");
  });

  it("armar todo anuncia el total", () => {
    const state = puzzleReducer(createInitialPuzzleState(2), { type: "placeAll" });
    expect(describePuzzleEvent(state, PIECES, COPY)).toBe("completo 2 de 2");
  });
});
