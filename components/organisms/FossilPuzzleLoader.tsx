"use client";

import dynamic from "next/dynamic";
import { createContext, useContext } from "react";
import { ExperienceList } from "@/components/molecules/ExperienceList";
import { PUZZLE_BOARD } from "@/data/fossilPuzzle";
import { useCopy } from "@/hooks/useLocale";
import { buildBoardPieces } from "@/lib/puzzlePieces";
import type { ExperienceEntry } from "@/types/experience";
import type { BoneShape } from "@/types/puzzle";

interface PuzzleData {
  /** Experiencia de la más reciente a la más antigua: una por hueso. */
  readonly entries: readonly ExperienceEntry[];
  /** Huesos con su nombre en el idioma de la página. */
  readonly bones: readonly BoneShape[];
}

/** El hueco de carga de `dynamic` no recibe props: lee los datos de aquí. */
const PuzzleDataContext = createContext<PuzzleData>({ entries: [], bones: [] });

/**
 * Mientras llega el puzle (o si no hay JS) la experiencia ya está en la página: oculta a
 * la vista pero legible por lectores de pantalla, y visible sin JS. El hueco reserva el
 * alto del tablero para que nada salte al cargar.
 */
function PuzzleFallback() {
  const { entries, bones } = useContext(PuzzleDataContext);
  const { experience: copy } = useCopy();
  const { height } = buildBoardPieces(entries, bones, PUZZLE_BOARD, copy.pieceLabel);
  return (
    <div className="mt-fluid-4">
      <div
        aria-hidden="true"
        className="fossil-placeholder rounded-[24px] [@media(scripting:none)]:hidden"
        style={{ aspectRatio: `${PUZZLE_BOARD.width} / ${height}` }}
      />
      <div className="sr-only [@media(scripting:none)]:not-sr-only">
        <ExperienceList
          entries={entries}
          kindLabels={{ academic: copy.academic, work: copy.work }}
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

export function FossilPuzzleLoader({ entries, bones }: PuzzleData) {
  return (
    <PuzzleDataContext value={{ entries, bones }}>
      <FossilPuzzle entries={entries} bones={bones} />
    </PuzzleDataContext>
  );
}
