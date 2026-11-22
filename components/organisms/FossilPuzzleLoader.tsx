"use client";

import dynamic from "next/dynamic";
import { createContext, useContext } from "react";
import { ExperienceList } from "@/components/molecules/ExperienceList";
import { FossilFinding } from "@/components/molecules/FossilFinding";
import { PuzzleToolbar } from "@/components/molecules/PuzzleToolbar";
import { PUZZLE_BOARD } from "@/data/fossilPuzzle";
import { useCopy } from "@/hooks/useLocale";
import { buildBoardPieces } from "@/lib/puzzlePieces";
import { interpolate } from "@/lib/utils";
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

/** Los controles del hueco de carga no hacen nada: solo ocupan su sitio, ocultos. */
const noop = () => {};

/**
 * Mientras llega el puzle (o si no hay JS) la experiencia ya está en la página: oculta a
 * la vista pero legible por lectores de pantalla, y visible sin JS. El hueco repite la
 * estructura del puzle (instrucciones, controles, tablero y ficha): solo con el alto del
 * tablero, todo lo de abajo saltaba hasta 390 px al llegar, y con él los enlaces #contacto.
 */
function PuzzleFallback() {
  const { entries, bones } = useContext(PuzzleDataContext);
  const { experience: copy } = useCopy();
  const { height } = buildBoardPieces(entries, bones, PUZZLE_BOARD, copy.pieceLabel);
  return (
    <div className="mt-fluid-4">
      <div
        aria-hidden="true"
        inert
        data-fossil-reserve
        className="flex flex-col gap-5 [@media(scripting:none)]:hidden"
      >
        <p className="text-fluid-sm invisible max-w-[60ch] leading-normal">
          {copy.instructions}
        </p>
        <div className="invisible">
          <PuzzleToolbar
            groupLabel={copy.toolbarLabel}
            progress={interpolate(copy.progress, { placed: 0, total: entries.length })}
            placeSelectedLabel={copy.placeSelected}
            placeAllLabel={copy.placeAll}
            resetLabel={copy.reset}
            canPlaceSelected={false}
            complete={false}
            started={false}
            onPlaceSelected={noop}
            onPlaceAll={noop}
            onReset={noop}
          />
        </div>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,2.4fr)_minmax(16rem,1fr)]">
          <div
            className="fossil-placeholder w-full rounded-[24px]"
            style={{ aspectRatio: `${PUZZLE_BOARD.width} / ${height}` }}
          />
          <div className="invisible">
            <FossilFinding
              kicker={copy.findingKicker}
              emptyText={copy.findingEmpty}
              entry={null}
              boneLabel={null}
              kindLabel={null}
            />
          </div>
        </div>
      </div>
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
