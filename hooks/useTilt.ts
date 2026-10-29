"use client";

import { useEffect, useRef } from "react";

/** Solo con ratón y sin preferencia de movimiento reducido. */
const TILT_MEDIA =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Inclinación sutil que sigue al cursor: escribe --tilt-x y --tilt-y en el elemento,
 * como mucho una vez por frame (requestAnimationFrame).
 */
export function useTilt<T extends HTMLElement>(maxDeg: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = window.matchMedia(TILT_MEDIA);
    let frame = 0;
    let point: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const dx = point ? (point.x - rect.left) / rect.width - 0.5 : 0;
      const dy = point ? (point.y - rect.top) / rect.height - 0.5 : 0;
      el.style.setProperty("--tilt-x", `${(-dy * 2 * maxDeg).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(dx * 2 * maxDeg).toFixed(2)}deg`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !media.matches) return;
      point = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      point = null;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [maxDeg]);

  return ref;
}
