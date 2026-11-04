"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { PUZZLE_BOARD } from "@/data/fossilPuzzle";
import {
  createInitialPuzzleState,
  fitsSlot,
  isComplete,
  puzzleReducer,
} from "@/lib/fossilPuzzle";
import type { BoneShape, Point } from "@/types/puzzle";

interface PieceGeometry {
  readonly shape: BoneShape;
  readonly trayOrigin: Point;
}

/**
 * Estado del fósil y las acciones que lo cambian. Soltar una pieza decide si encaja
 * según la distancia a su hueco; tras encajar con el teclado, el foco pasa a la
 * siguiente pieza libre (o al resultado, si el fósil quedó completo).
 */
export function useFossilPuzzle(pieces: readonly PieceGeometry[]) {
  const [state, dispatch] = useReducer(
    puzzleReducer,
    pieces.length,
    createInitialPuzzleState,
  );
  const board = useRef<HTMLDivElement>(null);
  const result = useRef<HTMLHeadingElement>(null);
  const complete = isComplete(state);

  const pxPerUnit = useCallback(
    () => (board.current?.clientWidth ?? 0) / PUZZLE_BOARD.width,
    [],
  );

  const drop = (index: number, offset: Point) => {
    const piece = pieces[index];
    if (!piece) return false;
    const moved = { x: piece.trayOrigin.x + offset.x, y: piece.trayOrigin.y + offset.y };
    const fits = fitsSlot(
      moved,
      piece.shape.slot,
      piece.shape.size,
      PUZZLE_BOARD.snapTolerance,
    );
    dispatch(fits ? { type: "place", index } : { type: "miss", index });
    return fits;
  };

  const toggle = (index: number) =>
    dispatch(state.selected === index ? { type: "cancel" } : { type: "select", index });

  // Una pieza encajada queda deshabilitada: si tenía el foco, este no se pierde.
  useEffect(() => {
    if (state.lastEvent !== "place" && state.lastEvent !== "placeAll") return;
    const active = document.activeElement;
    const lost =
      !active || active === document.body || (active as HTMLButtonElement).disabled;
    if (!lost) return;
    if (complete) result.current?.focus();
    else
      board.current
        ?.querySelector<HTMLButtonElement>(".fossil-piece:not(:disabled)")
        ?.focus();
  }, [state, complete]);

  return {
    state,
    complete,
    board,
    result,
    pxPerUnit,
    drop,
    toggle,
    cancel: () => dispatch({ type: "cancel" }),
    placeSelected: () => {
      if (state.selected !== null) dispatch({ type: "place", index: state.selected });
    },
    placeAll: () => dispatch({ type: "placeAll" }),
    reset: () => dispatch({ type: "reset" }),
  };
}
