"use client";

import { useEffect, type RefObject } from "react";
import { LANTERN } from "@/data/abyss";
import type { DepthState } from "@/hooks/useDepthProgress";
import type { FrameLoop } from "@/lib/abyss/frame";
import {
  approach,
  boxCenter,
  hasSettled,
  inertiaFactor,
  isLit,
  type Point,
} from "@/lib/abyss/lantern";
import { listen } from "@/lib/dom";

const CARD = ".dive-card";
/** Capa de la linterna: recibe --lx / --ly (solo ella y sus hijos recalculan estilo). */
const LIGHT = ".dive-lantern";
const TOUCH_EVENTS = ["touchstart", "touchmove", "touchend", "touchcancel"] as const;
/** Sin tarjeta activa (superficie), la linterna descansa aquí (fracción del escenario). */
const REST = { x: 0.5, y: 0.55 } as const;
/** Duración de un frame a 60 Hz, para el primer paso tras un reposo. */
const FIRST_STEP_MS = 1000 / 60;

interface PointerLightRefs {
  readonly dive: RefObject<HTMLElement | null>;
  readonly stage: RefObject<HTMLElement | null>;
  readonly list: RefObject<HTMLElement | null>;
  readonly depth: RefObject<DepthState>;
}

/**
 * Linterna de buceo: sigue al ratón con inercia (independiente de la frecuencia de la
 * pantalla), al dedo mientras toca y, si no, a la tarjeta enfocada o a la activa. Escribe
 * --lx y --ly en la capa de la linterna y data-lit en las tarjetas que alcanza el haz;
 * nada pasa por el estado de React. Comparte el bucle de frames de la sección: lee las
 * cajas en la fase de lectura y escribe después, sin escuchar el scroll por su cuenta.
 * Con `enabled` en false (movimiento reducido) no hace nada.
 */
export function usePointerLight(
  frame: FrameLoop,
  { dive, stage, list, depth }: PointerLightRefs,
  enabled: boolean,
) {
  useEffect(() => {
    const root = dive.current;
    const scene = stage.current;
    if (!enabled || !root || !scene) return;
    const beam = scene.querySelector<HTMLElement>(LIGHT) ?? scene;
    let pointer: Point | null = null;
    let focused: HTMLElement | null = null;
    let light: Point | null = null;
    let radius = 0;
    let last: number | null = null;
    let inView = false;
    // Medidas de la fase de lectura
    let items: HTMLElement[] = [];
    let stageBox: DOMRect | null = null;
    let boxes: DOMRect[] = [];

    const measureRadius = () => {
      radius = parseFloat(getComputedStyle(scene).getPropertyValue("--beam-r")) || 0;
    };

    const measure = () => {
      items = Array.from(list.current?.querySelectorAll<HTMLElement>(CARD) ?? []);
      stageBox = scene.getBoundingClientRect();
      boxes = items.map((card) => card.getBoundingClientRect());
    };

    /** Objetivo en coordenadas de la ventana. */
    const goal = (box: DOMRect): Point => {
      const onFocus = boxes[focused ? items.indexOf(focused) : -1];
      if (onFocus) return boxCenter(onFocus);
      if (pointer) return pointer;
      const active = boxes[depth.current?.active ?? -1];
      if (active) return boxCenter(active);
      return { x: box.left + box.width * REST.x, y: box.top + box.height * REST.y };
    };

    const apply = (now: number) => {
      if (!stageBox) return false;
      const target = goal(stageBox);
      const elapsed = last === null ? FIRST_STEP_MS : now - last;
      const next = light
        ? approach(light, target, inertiaFactor(LANTERN.lerp, elapsed))
        : target;
      light = next;
      beam.style.setProperty("--lx", `${(next.x - stageBox.left).toFixed(1)}px`);
      beam.style.setProperty("--ly", `${(next.y - stageBox.top).toFixed(1)}px`);
      items.forEach((card, i) => {
        const box = boxes[i];
        card.toggleAttribute("data-lit", box ? isLit(next, box, radius) : false);
      });
      const moving = !hasSettled(next, target);
      last = moving ? now : null;
      return moving;
    };
    const kick = () => {
      if (inView) frame.request();
    };

    const onMouse = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      focused = null;
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      pointer = touch ? { x: touch.clientX, y: touch.clientY } : null;
      kick();
    };
    const onFocus = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(CARD);
      focused = card;
      if (card?.matches(":focus-visible")) {
        card.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      kick();
    };
    const onBlur = (event: FocusEvent) => {
      const next = event.relatedTarget as HTMLElement | null;
      if (!next?.closest(CARD)) focused = null;
      kick();
    };
    const onResize = () => {
      measureRadius();
      kick();
    };

    measureRadius();
    const remove = frame.add({ measure, apply });
    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      kick();
    });
    observer.observe(root);
    const passive = { passive: true } as const;
    const off = [
      listen(root, "pointermove", onMouse, passive),
      listen(root, "pointerleave", onLeave),
      ...TOUCH_EVENTS.map((type) => listen(root, type, onTouch, passive)),
      listen(root, "focusin", onFocus),
      listen(root, "focusout", onBlur),
      listen(window, "resize", onResize),
    ];
    return () => {
      remove();
      observer.disconnect();
      off.forEach((stop) => stop());
    };
  }, [frame, dive, stage, list, depth, enabled]);
}
