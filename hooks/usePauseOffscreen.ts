"use client";

import { useEffect, useRef } from "react";

/**
 * Marca el elemento con data-offscreen mientras no se ve: el CSS pausa sus animaciones.
 * Escribe en el DOM directamente, sin re-render.
 */
export function usePauseOffscreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      element.toggleAttribute("data-offscreen", !entry?.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}
