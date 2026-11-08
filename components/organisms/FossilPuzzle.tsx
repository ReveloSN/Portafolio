"use client";

import { FossilBoard } from "@/components/molecules/FossilBoard";
import { FossilFinding } from "@/components/molecules/FossilFinding";
import { PuzzleToolbar } from "@/components/molecules/PuzzleToolbar";
import { COPY } from "@/data/copy";
import { BONE_SHAPES, PUZZLE_BOARD } from "@/data/fossilPuzzle";
import { useFossilPuzzle } from "@/hooks/useFossilPuzzle";
import { countPlaced } from "@/lib/fossilPuzzle";
import { describePuzzleEvent } from "@/lib/puzzleAnnouncement";
import { buildBoardPieces } from "@/lib/puzzlePieces";
import { interpolate } from "@/lib/utils";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";

interface FossilPuzzleProps {
  /** Una experiencia real por fragmento de la ilustración. */
  readonly entries: readonly ExperienceEntry[];
}

const { experience: copy } = COPY;
const KIND_LABELS: Readonly<Record<ExperienceKind, string>> = {
  academic: copy.academic,
  work: copy.work,
};
const INSTRUCTIONS_ID = "fossil-instrucciones";
const RESULT_ID = "fossil-resultado";

/** Fósil tipo puzle: cada pieza encajada revela una experiencia; completo, la lista entera. */
export default function FossilPuzzle({ entries }: FossilPuzzleProps) {
  const { pieces, height } = buildBoardPieces(
    entries,
    BONE_SHAPES,
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
  const placed = countPlaced(state);
  const shown = state.lastPlaced;
  const announcement = describePuzzleEvent(
    state,
    pieces.map((piece, i) => ({ bone: piece.shape.label, entry: entries[i]! })),
    copy.announce,
  );

  return (
    <div className="mt-fluid-4 flex flex-col gap-5" data-testid="fossil-puzzle">
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
          kindLabel={shown === null ? null : KIND_LABELS[entries[shown]!.kind]}
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
