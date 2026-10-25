"use client";

import { useCallback, useMemo, useReducer } from "react";
import { countFound, createDigReducer, createInitialDigState } from "@/lib/digReducer";
import type { DigState } from "@/types/dig";

export interface DigSiteApi {
  readonly state: DigState;
  readonly found: number;
  readonly dig: (index: number) => void;
  readonly digAll: () => void;
  readonly cover: () => void;
}

export function useDigSite(cellCount: number): DigSiteApi {
  const reducer = useMemo(() => createDigReducer(cellCount), [cellCount]);
  const [state, dispatch] = useReducer(reducer, cellCount, createInitialDigState);

  const dig = useCallback((index: number) => dispatch({ type: "dig", index }), []);
  const digAll = useCallback(() => dispatch({ type: "digAll" }), []);
  const cover = useCallback(() => dispatch({ type: "cover" }), []);

  return { state, found: countFound(state.layers), dig, digAll, cover };
}
