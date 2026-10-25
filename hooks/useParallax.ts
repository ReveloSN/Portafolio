"use client";

import { useEffect, useRef } from "react";
import { PARALLAX_FRAME_MS } from "@/lib/constants";

/**
 * Publica la posición normalizada del puntero (-1..1) como variables CSS
 * (`--mx`, `--my`) y en píxeles (`--px`, `--py`) sobre el elemento.
 * Escribe como máximo una vez por frame (rAF con throttling) y evita renders de React.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    let lastPaint = 0;
    let target = { mx: 0, my: 0, px: 0, py: 0, inside: 0 };

    const paint = (now: number) => {
      frame = 0;
      if (now - lastPaint < PARALLAX_FRAME_MS) {
        frame = requestAnimationFrame(paint);
        return;
      }
      lastPaint = now;
      element.style.setProperty("--mx", target.mx.toFixed(3));
      element.style.setProperty("--my", target.my.toFixed(3));
      element.style.setProperty("--px", `${Math.round(target.px)}px`);
      element.style.setProperty("--py", `${Math.round(target.py)}px`);
      element.style.setProperty("--inside", String(target.inside));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      target = {
        mx: (px / rect.width - 0.5) * 2,
        my: (py / rect.height - 0.5) * 2,
        px,
        py,
        inside: 1,
      };
      schedule();
    };

    const onLeave = () => {
      target = { ...target, mx: 0, my: 0, inside: 0 };
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
