"use client";

import { useEffect } from "react";
import { listen, whenLoaded } from "@/lib/dom";

/** Con cualquiera de estos gestos manda la persona: ya no se recoloca. */
const USER_MOVES = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

/**
 * Entrada directa a una sección (`/#contacto`). El navegador salta al ancla antes de que
 * llegue la serif del diario, que encoge los libros una línea, y solo a veces compensa: la
 * sección quedaba 21 px bajo la barra. Con la carga y las fuentes listas se vuelve a
 * alinear, una sola vez.
 */
export function useAnchorSettle() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    let active = true;
    const cancel = () => {
      active = false;
    };
    const stops = USER_MOVES.map((type) =>
      listen(window, type, cancel, { once: true, passive: true }),
    );
    const settle = () => {
      if (!active) return;
      active = false;
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    const unlisten = whenLoaded(() => {
      document.fonts.ready.then(() => requestAnimationFrame(settle));
    });
    return () => {
      cancel();
      unlisten();
      stops.forEach((stop) => stop());
    };
  }, []);
}
