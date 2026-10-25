"use client";

import { useCallback, useState } from "react";

export interface CarouselApi {
  readonly index: number;
  readonly count: number;
  readonly next: () => void;
  readonly prev: () => void;
  readonly goTo: (index: number) => void;
  /** Posición relativa al elemento activo, normalizada a -1, 0 o 1. */
  readonly offsetOf: (index: number) => -1 | 0 | 1;
}

export function useCarousel(count: number): CarouselApi {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const goTo = useCallback((target: number) => setIndex(target), []);

  const offsetOf = useCallback(
    (item: number): -1 | 0 | 1 => {
      const diff = (((item - index) % count) + count) % count;
      if (diff === 0) return 0;
      return diff === 1 ? 1 : -1;
    },
    [index, count],
  );

  return { index, count, next, prev, goTo, offsetOf };
}
