"use client";

import { useEffect, useRef } from "react";
import { PARALLAX_FRAME_MS } from "@/lib/constants";

/** Capas que se mueven con el puntero dentro de una escena. */
const LAYERS = ".px, [data-pointer-layer]";

/**
 * Publica la posición normalizada del puntero (-1..1) como variables CSS
 * (`--mx`, `--my`) y en píxeles (`--px`, `--py`) sobre cada capa que se mueve. Son
 * propiedades heredadas: en el contenedor obligaban a recalcular el estilo de toda la
 * escena en cada cuadro. Una escena sin capas marcadas las recibe en el contenedor.
 * Escribe como máximo una vez por frame (rAF con throttling) y evita renders de React.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (reducedMotion.matches || coarsePointer.matches) return;

    const layers = [...element.querySelectorAll<HTMLElement>(LAYERS)];
    const outputs = layers.length > 0 ? layers : [element];
    let frame = 0;
    let lastPaint = 0;
    let point = { x: 0, y: 0 };
    let inside = false;

    const paint = (now: number) => {
      frame = 0;
      if (now - lastPaint < PARALLAX_FRAME_MS) {
        frame = requestAnimationFrame(paint);
        return;
      }
      lastPaint = now;
      // Una sola lectura por cuadro y antes de escribir.
      const rect = element.getBoundingClientRect();
      const px = point.x - rect.left;
      const py = point.y - rect.top;
      const values = {
        "--mx": (inside ? (px / rect.width - 0.5) * 2 : 0).toFixed(3),
        "--my": (inside ? (py / rect.height - 0.5) * 2 : 0).toFixed(3),
        // Al salir, la luz se apaga donde quedó.
        ...(inside
          ? { "--px": `${Math.round(px)}px`, "--py": `${Math.round(py)}px` }
          : {}),
        "--inside": inside ? "1" : "0",
      };
      for (const output of outputs) {
        for (const [name, value] of Object.entries(values)) {
          output.style.setProperty(name, value);
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      point = { x: event.clientX, y: event.clientY };
      inside = true;
      schedule();
    };

    const onLeave = () => {
      inside = false;
      schedule();
    };

    element.addEventListener("pointermove", onMove, { passive: true });
    element.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
