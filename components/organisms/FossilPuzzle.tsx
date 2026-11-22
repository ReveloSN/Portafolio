"use client";

import { useEffect } from "react";
import { FossilBoard } from "@/components/molecules/FossilBoard";
import { FossilFinding } from "@/components/molecules/FossilFinding";
import { PuzzleToolbar } from "@/components/molecules/PuzzleToolbar";
import { PUZZLE_BOARD } from "@/data/fossilPuzzle";
import { useExperienceLink } from "@/hooks/useExperienceLink";
import { useFossilPuzzle } from "@/hooks/useFossilPuzzle";
import { useInView } from "@/hooks/useInView";
import { useCopy } from "@/hooks/useLocale";
import { countPlaced } from "@/lib/fossilPuzzle";
import { describePuzzleEvent } from "@/lib/puzzleAnnouncement";
import { buildBoardPieces } from "@/lib/puzzlePieces";
import { interpolate } from "@/lib/utils";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";
import type { BoneShape } from "@/types/puzzle";

interface FossilPuzzleProps {
  /** Una experiencia real por fragmento de la ilustración. */
  readonly entries: readonly ExperienceEntry[];
  /** Huesos con su nombre en el idioma de la página, en el orden de `entries`. */
  readonly bones: readonly BoneShape[];
}

const INSTRUCTIONS_ID = "fossil-instrucciones";
const RESULT_ID = "fossil-resultado";
/** El arte de los huesos se pide una pantalla y media antes de llegar al fósil. */
const ART_MARGIN = "150% 0px";

/** Fósil tipo puzle: cada pieza encajada revela una experiencia; completo, la lista entera. */
export default function FossilPuzzle({ entries, bones }: FossilPuzzleProps) {
  const { experience: copy } = useCopy();
  const kindLabels: Readonly<Record<ExperienceKind, string>> = {
    academic: copy.academic,
    work: copy.work,
  };
  const { pieces, height } = buildBoardPieces(
    entries,
    bones,
    PUZZLE_BOARD,
    copy.pieceLabel,
  );
  const {
    state,
    complete,
    board,
    result,
    pxPerUnit,
    drop,
    toggle,
    cancel,
    placeSelected,
    placeAll,
    reset,
  } = useFossilPuzzle(pieces);
  const { ref: nearRef, inView: near } = useInView<HTMLDivElement>(0, ART_MARGIN);
  const placed = countPlaced(state);
  const shown = state.lastPlaced;
  // Al encajar un hueso, su diario abre la página de esa experiencia (vínculo con los libros).
  const reveal = useExperienceLink()?.reveal;
  const revealedId =
    state.lastEvent === "place" && shown !== null ? entries[shown]?.id : undefined;
  useEffect(() => {
    if (revealedId) reveal?.(revealedId);
  }, [revealedId, reveal]);
  const announcement = describePuzzleEvent(
    state,
    pieces.map((piece, i) => ({ bone: piece.shape.label, entry: entries[i]! })),
    copy.announce,
  );

  return (
    <div
      ref={nearRef}
      className="mt-fluid-4 flex flex-col gap-5"
      data-testid="fossil-puzzle"
    >
      <p
        id={INSTRUCTIONS_ID}
        className="text-fluid-sm max-w-[60ch] leading-normal opacity-85"
      >
        {copy.instructions}
      </p>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>
      <PuzzleToolbar
        groupLabel={copy.toolbarLabel}
        progress={interpolate(copy.progress, { placed, total: entries.length })}
        placeSelectedLabel={copy.placeSelected}
        placeAllLabel={copy.placeAll}
        resetLabel={copy.reset}
        canPlaceSelected={state.selected !== null}
        complete={complete}
        started={placed > 0}
        onPlaceSelected={placeSelected}
        onPlaceAll={placeAll}
        onReset={reset}
      />
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,2.4fr)_minmax(16rem,1fr)]">
        <FossilBoard
          ref={board}
          board={PUZZLE_BOARD}
          height={complete ? PUZZLE_BOARD.slabHeight : height}
          pieces={pieces}
          showArt={near}
          state={state}
          describedBy={INSTRUCTIONS_ID}
          pxPerUnit={pxPerUnit}
          onToggle={toggle}
          onDrop={drop}
          onCancel={cancel}
        />
        <FossilFinding
          kicker={copy.findingKicker}
          emptyText={copy.findingEmpty}
          entry={shown === null ? null : (entries[shown] ?? null)}
          boneLabel={shown === null ? null : (pieces[shown]?.shape.label ?? null)}
          kindLabel={shown === null ? null : kindLabels[entries[shown]!.kind]}
          journalHref={shown === null ? null : `#diario-${entries[shown]!.kind}`}
          journalLabel={copy.readInJournal}
        />
      </div>
      {complete && (
        <section aria-labelledby={RESULT_ID} className="mt-fluid-3">
          <h3
            id={RESULT_ID}
            ref={result}
            tabIndex={-1}
            className="font-display text-fluid-2xl mb-fluid-3 leading-tight font-extrabold"
          >
            {copy.completeTitle}
          </h3>
        </section>
      )}
    </div>
  );
}
