"use client";

import { useEffect, useRef, useState } from "react";

/**
 * `true` mientras el elemento está en pantalla (a diferencia de useInView, sigue
 * observando): sirve para pausar animaciones en bucle cuando nadie las ve.
 */
export function useOnScreen<T extends HTMLElement>(threshold = 0) {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry?.isIntersecting ?? false),
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, onScreen };
}
