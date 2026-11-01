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
 * Publica en el escenario --depth (0 a 1), --surface (salida de la primera pantalla) y
 * --active (solo ahí: cambiar una variable recalcula el estilo de todo lo que cuelga del
 * elemento), y en la sección data-zone y data-inview para el CSS. Sin re-render por
 * frame: devuelve una ref que lee la linterna.
 */
export function useDepthProgress(
  diveRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  listRef: RefObject<HTMLElement | null>,
  count: number,
) {
  const state = useRef<DepthState>({ depth: 0, surface: 0, active: -1 });

  useEffect(() => {
    const dive = diveRef.current;
    const stage = stageRef.current;
    if (!dive || !stage) return;
    let frame = 0;
    /** Última placa marcada: al cambiar la lista (filtros) se vuelve a marcar. */
    let marked = Number.NaN;

    const update = () => {
      frame = 0;
      const box = dive.getBoundingClientRect();
      const { depth, surface } = diveProgress(box.top, box.height, window.innerHeight);
      const active = activeIndexAt(depth, count, DIVE_LAYOUT);
      stage.style.setProperty("--depth", depth.toFixed(PRECISION));
      stage.style.setProperty("--surface", surface.toFixed(PRECISION));
      stage.style.setProperty("--active", String(active));
      const zone = zoneAt(depth, ABYSS_ZONES);
      if (dive.dataset.zone !== zone) dive.dataset.zone = zone;
      if (active !== marked) markActive(listRef.current, active);
      marked = active;
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
  }, [diveRef, stageRef, listRef, count]);

  return state;
}
