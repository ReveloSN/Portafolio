"use client";

import type { CSSProperties, Ref } from "react";
import { FossilSlab } from "@/components/molecules/FossilSlab";
import { PuzzlePiece } from "@/components/molecules/PuzzlePiece";
import type { BoardPiece, Point, PuzzleBoard, PuzzleState } from "@/types/puzzle";

interface FossilBoardProps {
  readonly ref: Ref<HTMLDivElement>;
  readonly board: PuzzleBoard;
  readonly height: number;
  readonly pieces: readonly BoardPiece[];
  readonly state: PuzzleState;
  /** `false` mientras el fósil está lejos: aún no se piden sus imágenes. */
  readonly showArt: boolean;
  readonly describedBy: string;
  readonly pxPerUnit: () => number;
  readonly onToggle: (index: number) => void;
  readonly onDrop: (index: number, offset: Point) => boolean;
  readonly onCancel: () => void;
}

/** Losa con sus huecos y, encima, cada pieza en la bandeja o ya encajada. */
export function FossilBoard({
  ref,
  board,
  height,
  pieces,
  state,
  showArt,
  describedBy,
  pxPerUnit,
  onToggle,
  onDrop,
  onCancel,
}: FossilBoardProps) {
  const ratio = {
    aspectRatio: `${board.width} / ${height}`,
    "--tray-top": `${(board.slabHeight / height) * 100}%`,
  } as CSSProperties;
  return (
    <div
      ref={ref}
      className="fossil-board"
      style={ratio}
      data-tray={height > board.slabHeight || undefined}
      data-testid="fossil-board"
    >
      <FossilSlab
        width={board.width}
        height={board.slabHeight}
        shapes={pieces.map((piece) => piece.shape)}
        placed={state.placed}
        showArt={showArt}
      />
      {pieces.map((piece, i) => {
        const placed = state.placed[i] ?? false;
        return (
          <PuzzlePiece
            key={piece.shape.id}
            shape={piece.shape}
            showArt={showArt}
            origin={placed ? piece.shape.slot : piece.trayOrigin}
            board={board}
            boardHeight={height}
            placed={placed}
            selected={state.selected === i}
            tag={piece.tag}
            label={piece.label}
            describedBy={describedBy}
            pxPerUnit={pxPerUnit}
            onToggle={() => onToggle(i)}
            onDrop={(offset) => onDrop(i, offset)}
            onCancel={onCancel}
          />
        );
      })}
    </div>
  );
}
