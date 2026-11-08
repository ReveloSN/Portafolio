"use client";

import { useState } from "react";
import { stepPage } from "@/lib/pager";

/** Sentido del último paso: elige cómo se pasa la hoja. */
export type PageDirection = "forward" | "back";

interface PagerState {
  readonly index: number;
  /** Hoja que se acaba de pasar: se ve mientras gira y luego se oculta. */
  readonly previous: number | null;
  /** Sin dirección hasta el primer paso: la página inicial no se anima al cargar. */
  readonly direction: PageDirection | null;
}

/** Paginación de un libro: página actual, hoja anterior, sentido y los controles. */
export function usePager(total: number) {
  const [state, setState] = useState<PagerState>({
    index: 0,
    previous: null,
    direction: null,
  });
  const goTo = (target: number) =>
    setState((current) => {
      const index = stepPage(target, 0, total);
      if (index === current.index) return current;
      return {
        index,
        previous: current.index,
        direction: index > current.index ? "forward" : "back",
      };
    });
  return {
    ...state,
    canPrev: state.index > 0,
    canNext: state.index < total - 1,
    prev: () => goTo(state.index - 1),
    next: () => goTo(state.index + 1),
    goTo,
  };
}
