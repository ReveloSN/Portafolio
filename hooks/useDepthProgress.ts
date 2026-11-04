"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ABYSS_ZONES, DIVE_LAYOUT } from "@/data/abyss";
import { activeIndexAt, diveProgress, zoneAt } from "@/lib/abyss/depth";
import type { FrameLoop } from "@/lib/abyss/frame";
import { supportsScrollTimeline } from "@/lib/dom";

export interface DepthState {
  readonly depth: number;
  readonly surface: number;
  /** Índice de la tarjeta activa; -1 en la superficie. */
  readonly active: number;
}

interface DepthRefs {
  readonly dive: RefObject<HTMLElement | null>;
  readonly stage: RefObject<HTMLElement | null>;
  readonly list: RefObject<HTMLElement | null>;
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
 * Avance de la inmersión con el scroll: el único listener de scroll de la sección (pasivo)
 * pide un frame al bucle compartido. Publica en la sección data-zone y data-inview para el
 * CSS y, solo si el navegador no tiene animaciones ligadas al scroll, --depth (0 a 1) y
 * --surface (salida de la primera pantalla) en el escenario (con ellas, el CSS mueve las
 * capas en el compositor y escribirlas en cada frame recalcularía todo el escenario);
 * solo escribe lo que cambió, y fuera de pantalla no hace nada. Sin re-render por frame:
 * devuelve una ref que lee la linterna.
 */
export function useDepthProgress(
  frame: FrameLoop,
  { dive, stage, list }: DepthRefs,
  count: number,
  enabled: boolean,
) {
  const state = useRef<DepthState>({ depth: 0, surface: 0, active: -1 });

  useEffect(() => {
    const root = dive.current;
    const scene = stage.current;
    if (!enabled || !root || !scene) return;
    const cssDriven = supportsScrollTimeline();
    let inView = false;
    let top = 0;
    let height = 0;
    let viewport = 0;
    /** Lo último escrito: al cambiar la lista (filtros) se vuelve a marcar la placa. */
    let written = { depth: "", surface: "", zone: "" };
    let marked = { active: Number.NaN, first: null as Element | null };

    const measure = () => {
      const box = root.getBoundingClientRect();
      top = box.top;
      height = box.height;
      viewport = window.innerHeight;
    };
    const apply = () => {
      const { depth, surface } = diveProgress(top, height, viewport);
      const active = activeIndexAt(depth, count, DIVE_LAYOUT);
      const depthText = depth.toFixed(PRECISION);
      const surfaceText = surface.toFixed(PRECISION);
      if (!cssDriven && depthText !== written.depth)
        scene.style.setProperty("--depth", depthText);
      if (!cssDriven && surfaceText !== written.surface)
        scene.style.setProperty("--surface", surfaceText);
      const zone = zoneAt(depth, ABYSS_ZONES);
      if (zone !== written.zone) root.dataset.zone = zone;
      written = { depth: depthText, surface: surfaceText, zone };
      const first = list.current?.firstElementChild ?? null;
      if (active !== marked.active || first !== marked.first) {
        markActive(list.current, active);
        marked = { active, first };
      }
      state.current = { depth, surface, active };
      return false;
    };
    const schedule = () => {
      if (inView) frame.request();
    };

    const remove = frame.add({ measure, apply });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      root.toggleAttribute("data-inview", inView);
      // Al salir también se actualiza una vez, para dejar --depth en 0 o 1
      frame.request();
    });
    observer.observe(root);
    frame.request();
    return () => {
      remove();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [frame, dive, stage, list, count, enabled]);

  return state;
}
