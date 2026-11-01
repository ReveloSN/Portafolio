"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ABYSS_ZONES, DIVE_LAYOUT } from "@/data/abyss";
import { activeIndexAt, diveProgress, zoneAt } from "@/lib/abyss/depth";

export interface DepthState {
  readonly depth: number;
  readonly surface: number;
  /** Índice de la tarjeta activa; -1 en la superficie. */
  readonly active: number;
}

/** Decimales de las variables CSS: suficiente para un movimiento suave. */
const PRECISION = 4;

/** Marca la tarjeta activa (data-active en su <li>) sin pasar por React. */
function markActive(list: HTMLElement | null, active: number) {
  if (!list) return;
  Array.from(list.children).forEach((item, index) =>
    item.toggleAttribute("data-active", index === active),
  );
}

/**
 * Avance de la inmersión con el scroll: un único listener pasivo y requestAnimationFrame.
 * Publica en la sección --depth (0 a 1), --surface (salida de la primera pantalla) y
 * --active, más data-zone y data-inview para el CSS. Sin re-render por frame: devuelve
 * una ref que lee la linterna.
 */
export function useDepthProgress(
  diveRef: RefObject<HTMLElement | null>,
  listRef: RefObject<HTMLElement | null>,
  count: number,
) {
  const state = useRef<DepthState>({ depth: 0, surface: 0, active: -1 });

  useEffect(() => {
    const dive = diveRef.current;
    if (!dive) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = dive.getBoundingClientRect();
      const { depth, surface } = diveProgress(box.top, box.height, window.innerHeight);
      const active = activeIndexAt(depth, count, DIVE_LAYOUT);
      dive.style.setProperty("--depth", depth.toFixed(PRECISION));
      dive.style.setProperty("--surface", surface.toFixed(PRECISION));
      dive.style.setProperty("--active", String(active));
      dive.dataset.zone = zoneAt(depth, ABYSS_ZONES);
      markActive(listRef.current, active);
      state.current = { depth, surface, active };
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new IntersectionObserver(([entry]) => {
      dive.toggleAttribute("data-inview", Boolean(entry?.isIntersecting));
    });
    observer.observe(dive);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [diveRef, listRef, count]);

  return state;
}
