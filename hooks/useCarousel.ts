"use client";

import { useCallback, useState } from "react";
import { carouselOffset, wrapIndex, type CarouselOffset } from "@/lib/carousel";

export interface CarouselApi {
  readonly index: number;
  readonly count: number;
  readonly next: () => void;
  readonly prev: () => void;
  readonly goTo: (index: number) => void;
  /** Posición relativa al elemento activo, normalizada a -1, 0 o 1. */
  readonly offsetOf: (index: number) => CarouselOffset;
}

/** Sin avance automático: el cambio de testimonio solo ocurre por acción del visitante (WCAG 2.2.2). */
export function useCarousel(count: number): CarouselApi {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => wrapIndex(i + 1, count)), [count]);
  const prev = useCallback(() => setIndex((i) => wrapIndex(i - 1, count)), [count]);
  const goTo = useCallback(
    (target: number) => setIndex(wrapIndex(target, count)),
    [count],
  );

  const offsetOf = useCallback(
    (item: number): CarouselOffset => carouselOffset(item, index, count),
    [index, count],
  );

  return { index, count, next, prev, goTo, offsetOf };
}
