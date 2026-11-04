import { describe, expect, it } from "vitest";
import { BONE_SHAPES, PUZZLE_BOARD, PUZZLE_PIECES } from "@/data/fossilPuzzle";
import { EXPERIENCE } from "@/data/experience";
import {
  countPlaced,
  createInitialPuzzleState,
  fitsSlot,
  isComplete,
  layoutTray,
  puzzleReducer,
  pxToUnits,
  trayOrder,
} from "./fossilPuzzle";

const start = createInitialPuzzleState(3);

describe("puzzleReducer", () => {
  it("empieza sin piezas encajadas ni seleccionadas", () => {
    expect(countPlaced(start)).toBe(0);
    expect(start.selected).toBeNull();
    expect(isComplete(start)).toBe(false);
  });

  it("encajar una pieza la marca, suelta la selección y la deja como ficha", () => {
    const selected = puzzleReducer(start, { type: "select", index: 1 });
    const next = puzzleReducer(selected, { type: "place", index: 1 });
    expect(next.placed).toEqual([false, true, false]);
    expect(next.selected).toBeNull();
    expect(next.lastPlaced).toBe(1);
    expect(next.lastEvent).toBe("place");
  });

  it("no selecciona ni vuelve a encajar una pieza ya encajada", () => {
    const placed = puzzleReducer(start, { type: "place", index: 0 });
    expect(puzzleReducer(placed, { type: "select", index: 0 })).toBe(placed);
    expect(puzzleReducer(placed, { type: "place", index: 0 })).toBe(placed);
  });

  it("un fallo devuelve la pieza sin encajarla", () => {
    const selected = puzzleReducer(start, { type: "select", index: 2 });
    const next = puzzleReducer(selected, { type: "miss", index: 2 });
    expect(next.placed).toEqual([false, false, false]);
    expect(next.selected).toBeNull();
    expect(next.lastEvent).toBe("miss");
    expect(next.lastIndex).toBe(2);
  });

  it("cancelar suelta la pieza tomada", () => {
    const selected = puzzleReducer(start, { type: "select", index: 2 });
    const next = puzzleReducer(selected, { type: "cancel" });
    expect(next.selected).toBeNull();
    expect(next.lastEvent).toBe("cancel");
    expect(puzzleReducer(next, { type: "cancel" })).toBe(next);
  });

  it("armar todo completa el fósil y reiniciar lo vacía", () => {
    const all = puzzleReducer(start, { type: "placeAll" });
    expect(isComplete(all)).toBe(true);
    const again = puzzleReducer(all, { type: "reset" });
    expect(countPlaced(again)).toBe(0);
    expect(again.lastEvent).toBe("reset");
  });

  it("ignora índices fuera de rango", () => {
    expect(puzzleReducer(start, { type: "place", index: 9 })).toBe(start);
    expect(puzzleReducer(start, { type: "select", index: -1 })).toBe(start);
  });
});

describe("fitsSlot", () => {
  const size = { width: 100, height: 50 };
  it("encaja dentro de la tolerancia", () => {
    expect(fitsSlot({ x: 130, y: 210 }, { x: 100, y: 200 }, size, 40)).toBe(true);
  });
  it("no encaja lejos del hueco", () => {
    expect(fitsSlot({ x: 300, y: 200 }, { x: 100, y: 200 }, size, 40)).toBe(false);
  });
});

describe("pxToUnits", () => {
  it("escala según el ancho real del tablero", () => {
    expect(pxToUnits(50, 500, 1000)).toBe(100);
    expect(pxToUnits(50, 0, 1000)).toBe(0);
  });
});

describe("trayOrder", () => {
  it("es una permutación distinta del orden del esqueleto", () => {
    for (const count of [6, 7, 8]) {
      const order = trayOrder(count);
      expect([...order].sort((a, b) => a - b)).toEqual([...Array(count).keys()]);
      expect(order).not.toEqual([...Array(count).keys()]);
    }
  });
});

describe("layoutTray", () => {
  it("deja cada pieza dentro de la bandeja, sin solaparse con la losa ni con otra", () => {
    const sizes = BONE_SHAPES.map((shape) => shape.size);
    const { positions, height } = layoutTray(sizes, PUZZLE_BOARD);
    const boxes = positions.map((p, i) => ({ ...p, ...sizes[i]! }));
    for (const box of boxes) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(PUZZLE_BOARD.width);
      expect(box.y).toBeGreaterThanOrEqual(PUZZLE_BOARD.slabHeight);
      expect(box.y + box.height).toBeLessThanOrEqual(PUZZLE_BOARD.slabHeight + height);
    }
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i]!;
        const b = boxes[j]!;
        const overlap =
          a.x < b.x + b.width &&
          b.x < a.x + a.width &&
          a.y < b.y + b.height &&
          b.y < a.y + a.height;
        expect(overlap).toBe(false);
      }
    }
  });
});

describe("datos del fósil", () => {
  it("hay entre 6 y 8 experiencias y una forma para cada una", () => {
    expect(EXPERIENCE.length).toBeGreaterThanOrEqual(PUZZLE_PIECES.min);
    expect(EXPERIENCE.length).toBeLessThanOrEqual(PUZZLE_PIECES.max);
    expect(BONE_SHAPES.length).toBeGreaterThanOrEqual(PUZZLE_PIECES.max);
  });

  it("cada hueco cabe en la losa", () => {
    for (const shape of BONE_SHAPES) {
      expect(shape.slot.x + shape.size.width).toBeLessThanOrEqual(PUZZLE_BOARD.width);
      expect(shape.slot.y + shape.size.height).toBeLessThanOrEqual(
        PUZZLE_BOARD.slabHeight,
      );
    }
  });
});
