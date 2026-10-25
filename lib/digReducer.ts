import type { DigAction, DigState } from "@/types/dig";
import { DIG_LAYERS_PER_CELL } from "./constants";

export function createInitialDigState(cellCount: number): DigState {
  return { layers: Array.from({ length: cellCount }, () => 0), lastDug: null, tick: 0 };
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
        };
      }
      case "digAll":
        return {
          ...state,
          layers: state.layers.map(() => DIG_LAYERS_PER_CELL),
          lastDug: null,
        };
      case "cover":
        return createInitialDigState(cellCount);
    }
  };
}

export function countFound(layers: readonly number[]): number {
  return layers.filter((n) => n >= DIG_LAYERS_PER_CELL).length;
}
