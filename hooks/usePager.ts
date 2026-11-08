"use client";

import { useState } from "react";
import { stepPage } from "@/lib/pager";

/** Sentido del último paso: elige la animación de la página que entra. */
export type PageDirection = "forward" | "back";

/** Paginación de un libro: página actual, sentido del último paso y los dos botones. */
export function usePager(total: number) {
  // Sin dirección hasta el primer paso: la página inicial no se anima al cargar.
  const [state, setState] = useState<{ index: number; direction: PageDirection | null }>({
    index: 0,
    direction: null,
  });
  const go = (delta: number) =>
    setState((current) => ({
      index: stepPage(current.index, delta, total),
      direction: delta > 0 ? "forward" : "back",
    }));
  return {
    index: state.index,
    direction: state.direction,
    canPrev: state.index > 0,
    canNext: state.index < total - 1,
    prev: () => go(-1),
    next: () => go(1),
  };
}
