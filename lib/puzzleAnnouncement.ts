import type { ExperienceEntry } from "@/types/experience";
import type { PuzzleEvent, PuzzleState } from "@/types/puzzle";
import { countPlaced } from "./fossilPuzzle";
import { interpolate } from "./utils";

export type PuzzleAnnounceCopy = Readonly<Record<PuzzleEvent, string>>;

export interface PieceInfo {
  /** Nombre del hueso ("el cráneo"). */
  readonly bone: string;
  readonly entry: ExperienceEntry;
}

/** Texto para la región viva: un solo anuncio por cada evento del puzle. */
export function describePuzzleEvent(
  state: PuzzleState,
  pieces: readonly PieceInfo[],
  copy: PuzzleAnnounceCopy,
): string {
  if (!state.lastEvent) return "";
  const piece = state.lastIndex === null ? undefined : pieces[state.lastIndex];
  return interpolate(copy[state.lastEvent], {
    bone: piece?.bone ?? "",
    title: piece?.entry.title ?? "",
    organization: piece?.entry.organization ?? "",
    period: piece?.entry.periodLabel ?? "",
    placed: countPlaced(state),
    total: state.placed.length,
  });
}
