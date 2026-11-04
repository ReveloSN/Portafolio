"use client";

import dynamic from "next/dynamic";
import { ExperienceList } from "@/components/molecules/ExperienceList";
import { COPY } from "@/data/copy";
import { BONE_SHAPES, PUZZLE_BOARD } from "@/data/fossilPuzzle";
import { sortedExperience } from "@/lib/collections";
import { buildBoardPieces } from "@/lib/puzzlePieces";

const { experience: copy } = COPY;
const KIND_LABELS = { academic: copy.academic, work: copy.work } as const;
const { height } = buildBoardPieces(
  sortedExperience,
  BONE_SHAPES,
  PUZZLE_BOARD,
  copy.pieceLabel,
);

/**
 * Mientras llega el puzle (o si no hay JS) la experiencia ya está en la página: oculta a
 * la vista pero legible por lectores de pantalla, y visible sin JS. El hueco reserva el
 * alto del tablero para que nada salte al cargar.
 */
function PuzzleFallback() {
  return (
    <div className="mt-fluid-4">
      <div
        aria-hidden="true"
        className="fossil-placeholder rounded-[24px] [@media(scripting:none)]:hidden"
        style={{ aspectRatio: `${PUZZLE_BOARD.width} / ${height}` }}
      />
      <div className="sr-only [@media(scripting:none)]:not-sr-only">
        <ExperienceList
          entries={sortedExperience}
          kindLabels={KIND_LABELS}
          achievementsLabel={copy.achievements}
        />
      </div>
    </div>
  );
}

const FossilPuzzle = dynamic(() => import("@/components/organisms/FossilPuzzle"), {
  ssr: false,
  loading: PuzzleFallback,
});

export function FossilPuzzleLoader() {
  return <FossilPuzzle entries={sortedExperience} />;
}
