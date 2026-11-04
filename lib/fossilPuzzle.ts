import type { Point, PuzzleAction, PuzzleBoard, PuzzleState, Size } from "@/types/puzzle";
import { seeded } from "./seeded";

/* ------------------------------------------------------------------ */
/* Estado: un reducer puro con todos los eventos del puzle              */
/* ------------------------------------------------------------------ */

export function createInitialPuzzleState(count: number): PuzzleState {
  return {
    placed: Array.from({ length: count }, () => false),
    selected: null,
    lastPlaced: null,
    lastEvent: null,
    lastIndex: null,
  };
}

const inRange = (state: PuzzleState, index: number) =>
  index >= 0 && index < state.placed.length;

export function puzzleReducer(state: PuzzleState, action: PuzzleAction): PuzzleState {
  switch (action.type) {
    case "select":
      if (!inRange(state, action.index) || state.placed[action.index]) return state;
      return {
        ...state,
        selected: action.index,
        lastEvent: "select",
        lastIndex: action.index,
      };
    case "cancel":
      if (state.selected === null) return state;
      return { ...state, selected: null, lastEvent: "cancel", lastIndex: state.selected };
    case "place": {
      if (!inRange(state, action.index) || state.placed[action.index]) return state;
      const placed = state.placed.map((done, i) => done || i === action.index);
      return {
        placed,
        selected: null,
        lastPlaced: action.index,
        lastEvent: "place",
        lastIndex: action.index,
      };
    }
    case "miss":
      if (!inRange(state, action.index)) return state;
      return { ...state, selected: null, lastEvent: "miss", lastIndex: action.index };
    case "placeAll":
      if (isComplete(state)) return state;
      return {
        ...state,
        placed: state.placed.map(() => true),
        selected: null,
        lastEvent: "placeAll",
        lastIndex: null,
      };
    case "reset":
      return { ...createInitialPuzzleState(state.placed.length), lastEvent: "reset" };
  }
}

export const countPlaced = (state: PuzzleState) => state.placed.filter(Boolean).length;

export const isComplete = (state: PuzzleState) =>
  state.placed.length > 0 && state.placed.every(Boolean);

/* ------------------------------------------------------------------ */
/* Geometría: todo en unidades del tablero                              */
/* ------------------------------------------------------------------ */

export const centerOf = (origin: Point, size: Size): Point => ({
  x: origin.x + size.width / 2,
  y: origin.y + size.height / 2,
});

/** ¿El centro de la pieza quedó lo bastante cerca del centro de su hueco? */
export function fitsSlot(
  pieceOrigin: Point,
  slot: Point,
  size: Size,
  tolerance: number,
): boolean {
  const a = centerOf(pieceOrigin, size);
  const b = centerOf(slot, size);
  return Math.hypot(a.x - b.x, a.y - b.y) <= tolerance;
}

/** Traslada un desplazamiento en píxeles de pantalla a unidades del tablero. */
export const pxToUnits = (px: number, boardWidthPx: number, boardWidth: number) =>
  boardWidthPx > 0 ? (px * boardWidth) / boardWidthPx : 0;

/** Sal fija del barajado: las piezas salen siempre en el mismo desorden (sin hidratación rota). */
const TRAY_SALT = 7;

/** Orden de las piezas en la bandeja: barajado fijo que nunca coincide con el del esqueleto. */
export function trayOrder(count: number): readonly number[] {
  const order = Array.from({ length: count }, (_, i) => i).sort(
    (a, b) => seeded(a, TRAY_SALT) - seeded(b, TRAY_SALT),
  );
  const identity = order.every((value, i) => value === i);
  return identity && count > 1 ? [...order.slice(1), order[0]!] : order;
}

export interface TrayLayout {
  /** Esquina de cada pieza en la bandeja, por índice de pieza (no por orden). */
  readonly positions: readonly Point[];
  /** Alto total de la bandeja, incluidos los márgenes. */
  readonly height: number;
}

/**
 * Coloca las piezas en filas dentro de la bandeja (debajo de la losa), en el orden
 * barajado, centrando cada fila. Si no caben en una fila, abre otra.
 */
export function layoutTray(sizes: readonly Size[], board: PuzzleBoard): TrayLayout {
  const { width, slabHeight, trayPadding: pad, trayGap: gap } = board;
  const maxRow = width - pad * 2;
  const rows: number[][] = [[]];
  let rowWidth = 0;
  for (const index of trayOrder(sizes.length)) {
    const w = sizes[index]!.width;
    const row = rows[rows.length - 1]!;
    if (row.length > 0 && rowWidth + gap + w > maxRow) {
      rows.push([index]);
      rowWidth = w;
    } else {
      row.push(index);
      rowWidth += (row.length > 1 ? gap : 0) + w;
    }
  }

  const positions: Point[] = Array.from({ length: sizes.length }, () => ({ x: 0, y: 0 }));
  let top = slabHeight + pad;
  for (const row of rows) {
    const rowHeight = Math.max(...row.map((i) => sizes[i]!.height));
    const used =
      row.reduce((sum, i) => sum + sizes[i]!.width, 0) + gap * (row.length - 1);
    let left = (width - used) / 2;
    for (const i of row) {
      const size = sizes[i]!;
      positions[i] = { x: left, y: top + (rowHeight - size.height) / 2 };
      left += size.width + gap;
    }
    top += rowHeight + gap;
  }
  return { positions, height: top - gap + pad - slabHeight };
}
