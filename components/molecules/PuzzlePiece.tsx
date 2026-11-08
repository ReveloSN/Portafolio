"use client";

import type { CSSProperties } from "react";
import { BoneShape } from "@/components/atoms/BoneShape";
import { usePieceDrag } from "@/hooks/usePieceDrag";
import { PUZZLE_TRAY_SCALE } from "@/data/fossilPuzzle";
import type { BoneShape as BoneShapeData, Point, PuzzleBoard } from "@/types/puzzle";

interface PuzzlePieceProps {
  readonly shape: BoneShapeData;
  /** Esquina actual en unidades del tablero (bandeja o hueco). */
  readonly origin: Point;
  readonly board: PuzzleBoard;
  readonly boardHeight: number;
  readonly placed: boolean;
  readonly selected: boolean;
  /** Texto corto visible sobre el hueso (el año de inicio). */
  readonly tag: string;
  readonly label: string;
  readonly describedBy: string;
  readonly pxPerUnit: () => number;
  readonly onToggle: () => void;
  readonly onDrop: (offset: Point) => boolean;
  readonly onCancel: () => void;
}

const percent = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Una pieza del fósil: un botón real que se arrastra con el puntero o se mueve con el
 * teclado. Encajada, queda fija en la losa y fuera del orden de tabulación.
 */
export function PuzzlePiece({
  shape,
  origin,
  board,
  boardHeight,
  placed,
  selected,
  tag,
  label,
  describedBy,
  pxPerUnit,
  onToggle,
  onDrop,
  onCancel,
}: PuzzlePieceProps) {
  const { ref, handlers } = usePieceDrag<HTMLButtonElement>({
    enabled: !placed,
    selected,
    layoutKey: `${origin.x},${origin.y}`,
    pxPerUnit,
    keyStep: board.keyStep,
    keyStepLarge: board.keyStepLarge,
    onToggle,
    onDrop,
    onCancel,
  });
  const style: CSSProperties = {
    left: percent(origin.x, board.width),
    top: percent(origin.y, boardHeight),
    width: percent(shape.size.width * (placed ? 1 : PUZZLE_TRAY_SCALE), board.width),
    height: percent(shape.size.height * (placed ? 1 : PUZZLE_TRAY_SCALE), boardHeight),
  };

  return (
    <button
      ref={ref}
      type="button"
      className="fossil-piece"
      style={style}
      disabled={placed}
      aria-hidden={placed || undefined}
      aria-pressed={placed ? undefined : selected}
      aria-label={label}
      aria-describedby={describedBy}
      data-placed={placed || undefined}
      data-testid="fossil-piece"
      {...handlers}
    >
      <BoneShape shape={shape} className="fossil-bone" />
      {!placed && (
        <span className="fossil-piece-tag" aria-hidden="true">
          <span>{tag}</span>
        </span>
      )}
    </button>
  );
}
