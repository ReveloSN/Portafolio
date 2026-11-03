import { describe, expect, it } from "vitest";
import { DIG_LAYERS_PER_CELL } from "./constants";
import {
  countFound,
  createDigReducer,
  createInitialDigState,
  hasDug,
} from "./digReducer";

const CELLS = 3;
const reduce = createDigReducer(CELLS);

describe("createInitialDigState", () => {
  it("empieza sin capas quitadas ni eventos", () => {
    expect(createInitialDigState(CELLS)).toEqual({
      layers: [0, 0, 0],
      lastDug: null,
      tick: 0,
      lastEvent: null,
    });
  });
});

describe("dig", () => {
  it("quita una capa de la cuadrícula indicada y registra el golpe", () => {
    const next = reduce(createInitialDigState(CELLS), { type: "dig", index: 1 });
    expect(next.layers).toEqual([0, 1, 0]);
    expect(next.lastDug).toBe(1);
    expect(next.tick).toBe(1);
    expect(next.lastEvent).toBe("dig");
  });

  it("incrementa tick en cada golpe aunque sea la misma cuadrícula", () => {
    let state = createInitialDigState(CELLS);
    state = reduce(state, { type: "dig", index: 0 });
    state = reduce(state, { type: "dig", index: 0 });
    expect(state.tick).toBe(2);
    expect(state.layers[0]).toBe(2);
  });

  it("no hace nada más allá de la última capa (devuelve el mismo estado)", () => {
    let state = createInitialDigState(CELLS);
    for (let i = 0; i < DIG_LAYERS_PER_CELL; i += 1) {
      state = reduce(state, { type: "dig", index: 2 });
    }
    expect(state.layers[2]).toBe(DIG_LAYERS_PER_CELL);
    expect(reduce(state, { type: "dig", index: 2 })).toBe(state);
  });

  it("ignora índices fuera de rango", () => {
    const state = createInitialDigState(CELLS);
    expect(reduce(state, { type: "dig", index: CELLS })).toBe(state);
    expect(reduce(state, { type: "dig", index: -1 })).toBe(state);
  });

  it("no muta el estado anterior", () => {
    const state = createInitialDigState(CELLS);
    reduce(state, { type: "dig", index: 0 });
    expect(state.layers).toEqual([0, 0, 0]);
  });
});

describe("digAll", () => {
  it("deja todas las cuadrículas excavadas y limpia lastDug", () => {
    const dug = reduce(createInitialDigState(CELLS), { type: "dig", index: 0 });
    const next = reduce(dug, { type: "digAll" });
    expect(next.layers).toEqual(Array(CELLS).fill(DIG_LAYERS_PER_CELL));
    expect(next.lastDug).toBeNull();
    expect(next.tick).toBe(dug.tick);
    expect(next.lastEvent).toBe("digAll");
  });

  it("no cambia el estado si ya estaba todo excavado", () => {
    const all = reduce(createInitialDigState(CELLS), { type: "digAll" });
    expect(reduce(all, { type: "digAll" })).toBe(all);
  });
});

describe("cover", () => {
  it("vuelve al estado inicial y registra el evento", () => {
    const all = reduce(createInitialDigState(CELLS), { type: "digAll" });
    const next = reduce(all, { type: "cover" });
    expect(next).toEqual({ ...createInitialDigState(CELLS), lastEvent: "cover" });
  });

  it("no cambia el estado si no hay nada excavado", () => {
    const initial = createInitialDigState(CELLS);
    expect(reduce(initial, { type: "cover" })).toBe(initial);
  });

  it("reinicia tick y lastDug", () => {
    const dug = reduce(createInitialDigState(CELLS), { type: "dig", index: 1 });
    const next = reduce(dug, { type: "cover" });
    expect(next.tick).toBe(0);
    expect(next.lastDug).toBeNull();
  });
});

describe("countFound", () => {
  it("cuenta solo las cuadrículas con todas las capas quitadas", () => {
    expect(countFound([0, 1, DIG_LAYERS_PER_CELL - 1])).toBe(0);
    expect(countFound([DIG_LAYERS_PER_CELL, 1, DIG_LAYERS_PER_CELL])).toBe(2);
    expect(countFound([])).toBe(0);
  });
});

describe("hasDug", () => {
  it("detecta si alguna capa fue quitada", () => {
    expect(hasDug([0, 0, 0])).toBe(false);
    expect(hasDug([0, 1, 0])).toBe(true);
    expect(hasDug([])).toBe(false);
  });
});
