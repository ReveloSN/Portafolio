"use client";

import { useEffect, type RefObject } from "react";
import { LANTERN } from "@/data/abyss";
import type { DepthState } from "@/hooks/useDepthProgress";
import { approach, boxCenter, hasSettled, isLit, type Point } from "@/lib/abyss/lantern";
import { listen } from "@/lib/dom";

const CARD = ".dive-card";
const TOUCH_EVENTS = ["touchstart", "touchmove", "touchend", "touchcancel"] as const;
/** Sin tarjeta activa (superficie), la linterna descansa aquí (fracción del escenario). */
const REST = { x: 0.5, y: 0.55 } as const;

interface PointerLightRefs {
  readonly dive: RefObject<HTMLElement | null>;
  readonly stage: RefObject<HTMLElement | null>;
  readonly list: RefObject<HTMLElement | null>;
  readonly depth: RefObject<DepthState>;
}

/**
 * Linterna de buceo: sigue al ratón con inercia (lerp en requestAnimationFrame), al dedo
 * mientras toca y, si no, a la tarjeta enfocada o a la activa. Escribe --lx y --ly en la
 * sección y data-lit en las tarjetas que alcanza el haz; nada pasa por el estado de React.
 * Con prefers-reduced-motion no hay inercia y se queda en la tarjeta activa.
 */
export function usePointerLight({ dive, stage, list, depth }: PointerLightRefs) {
  useEffect(() => {
    const root = dive.current;
    const scene = stage.current;
    if (!root || !scene) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointer: Point | null = null;
    let focused: HTMLElement | null = null;
    let light: Point | null = null;
    let radius = 0;
    let frame = 0;
    let inView = false;

    const cards = () =>
      Array.from(list.current?.querySelectorAll<HTMLElement>(CARD) ?? []);
    const measure = () => {
      radius = parseFloat(getComputedStyle(scene).getPropertyValue("--beam-r")) || 0;
    };

    /** Objetivo en coordenadas de la ventana. */
    const goal = (stageBox: DOMRect, boxes: readonly DOMRect[]): Point => {
      if (focused) return boxCenter(focused.getBoundingClientRect());
      if (pointer && !reduced.matches) return pointer;
      const active = boxes[depth.current?.active ?? -1];
      if (active) return boxCenter(active);
      return {
        x: stageBox.left + stageBox.width * REST.x,
        y: stageBox.top + stageBox.height * REST.y,
      };
    };

    const tick = () => {
      frame = 0;
      const items = cards();
      const stageBox = scene.getBoundingClientRect();
      const boxes = items.map((card) => card.getBoundingClientRect());
      const target = goal(stageBox, boxes);
      const factor = reduced.matches ? 1 : LANTERN.lerp;
      const next = light ? approach(light, target, factor) : target;
      light = next;
      root.style.setProperty("--lx", `${(next.x - stageBox.left).toFixed(1)}px`);
      root.style.setProperty("--ly", `${(next.y - stageBox.top).toFixed(1)}px`);
      items.forEach((card, i) => {
        const box = boxes[i];
        card.toggleAttribute("data-lit", box ? isLit(next, box, radius) : false);
      });
      if (!hasSettled(next, target)) frame = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame && inView) frame = requestAnimationFrame(tick);
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
        card.scrollIntoView({
          block: "center",
          behavior: reduced.matches ? "auto" : "smooth",
        });
      }
      kick();
    };
    const onBlur = (event: FocusEvent) => {
      const next = event.relatedTarget as HTMLElement | null;
      if (!next?.closest(CARD)) focused = null;
      kick();
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
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
      listen(window, "scroll", kick, passive),
      listen(window, "resize", onResize),
    ];
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      off.forEach((remove) => remove());
    };
  }, [dive, stage, list, depth]);
}
