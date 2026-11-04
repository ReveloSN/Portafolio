"use client";

import { useEffect, useRef } from "react";
import { supportsScrollTimeline } from "@/lib/dom";

type Subscriber = () => void;

/** Un único listener de scroll (con rAF) compartido por todos los elementos visibles. */
const subscribers = new Set<Subscriber>();
let frame = 0;

function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    subscribers.forEach((update) => update());
  });
}

function subscribe(update: Subscriber) {
  if (subscribers.size === 0)
    window.addEventListener("scroll", onScroll, { passive: true });
  subscribers.add(update);
  update();
  return () => {
    subscribers.delete(update);
    if (subscribers.size === 0) window.removeEventListener("scroll", onScroll);
  };
}

/**
 * Paralaje de scroll. Con soporte de `animation-timeline: view()` lo hace el CSS
 * (clase `.art-parallax`); si no, un listener compartido escribe `--scroll-shift`.
 * En ambos casos marca `data-inview` para activar `will-change` solo en pantalla.
 */
export function useScrollParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cssDriven = supportsScrollTimeline();
    let unsubscribe: (() => void) | null = null;

    const update = () => {
      const rect = element.getBoundingClientRect();
      // -1 cuando entra por abajo, 1 cuando sale por arriba
      const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
      element.style.setProperty("--scroll-shift", (progress * 2 - 1).toFixed(3));
    };

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry?.isIntersecting ?? false;
      element.toggleAttribute("data-inview", visible);
      if (cssDriven || reducedMotion) return;
      if (visible && !unsubscribe) unsubscribe = subscribe(update);
      if (!visible && unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      unsubscribe?.();
    };
  }, []);

  return ref;
}
