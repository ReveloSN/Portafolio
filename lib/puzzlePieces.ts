import type { ExperienceEntry } from "@/types/experience";
import type { BoardPiece, BoneShape, PuzzleBoard } from "@/types/puzzle";
import { layoutTray } from "./fossilPuzzle";
import { interpolate } from "./utils";

export interface BoardSetup {
  readonly pieces: readonly BoardPiece[];
  /** Alto total del tablero: losa más bandeja. */
  readonly height: number;
}

/**
 * Asigna a cada experiencia (ya ordenada, la más reciente primero) un hueso en orden y
 * le da su sitio en la bandeja. `labelTemplate` admite `{n}`, `{bone}` y `{year}`.
 */
export function buildBoardPieces(
  entries: readonly ExperienceEntry[],
  shapes: readonly BoneShape[],
  board: PuzzleBoard,
  labelTemplate: string,
): BoardSetup {
  const used = shapes.slice(0, entries.length);
  const tray = layoutTray(
    used.map((shape) => shape.size),
    board,
  );
  const pieces = used.map((shape, i): BoardPiece => {
    const year = String(entries[i]!.startYear);
    return {
      shape,
      trayOrigin: tray.positions[i]!,
      tag: year,
      label: interpolate(labelTemplate, { n: i + 1, bone: shape.label, year }),
    };
  });
  return { pieces, height: board.slabHeight + tray.height };
}
