import type { DigAction, DigState } from "@/types/dig";
import { DIG_LAYERS_PER_CELL } from "./constants";

export function createInitialDigState(cellCount: number): DigState {
  return {
    layers: Array.from({ length: cellCount }, () => 0),
    lastDug: null,
    tick: 0,
    lastEvent: null,
  };
}

export function countFound(layers: readonly number[]): number {
  return layers.filter((n) => n >= DIG_LAYERS_PER_CELL).length;
}

/** Hay al menos una capa quitada en alguna cuadrícula. */
export function hasDug(layers: readonly number[]): boolean {
  return layers.some((n) => n > 0);
}

export function createDigReducer(cellCount: number) {
  return function digReducer(state: DigState, action: DigAction): DigState {
    switch (action.type) {
      case "dig": {
        const current = state.layers[action.index];
        if (current === undefined || current >= DIG_LAYERS_PER_CELL) return state;
        return {
          layers: state.layers.map((n, i) => (i === action.index ? n + 1 : n)),
          lastDug: action.index,
          tick: state.tick + 1,
          lastEvent: "dig",
        };
      }
      case "digAll":
        if (countFound(state.layers) >= state.layers.length) return state;
        return {
          ...state,
          layers: state.layers.map(() => DIG_LAYERS_PER_CELL),
          lastDug: null,
          lastEvent: "digAll",
        };
      case "cover":
        if (!hasDug(state.layers)) return state;
        return { ...createInitialDigState(cellCount), lastEvent: "cover" };
    }
  };
}
