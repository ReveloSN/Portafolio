"use client";

import { useEffect, useRef } from "react";
import { supportsScrollTimeline } from "@/lib/dom";

/** Mide (solo lee el DOM) y devuelve la escritura que se hará después. */
type Subscriber = () => () => void;

/**
 * Margen del observador: el borde que lo dispara queda lejos de la pantalla. Con margen 0,
 * una capa apoyada justo en el borde (la hoja del Hero al saltar a Sobre mí) cambiaba
 * `data-inview` en cada cuadro y repintaba la página sin parar.
 */
const NEAR_MARGIN = "25% 0px";

/** Un único listener de scroll (con rAF) compartido por todos los elementos visibles. */
const subscribers = new Set<Subscriber>();
let frame = 0;

/** Primero todas las lecturas, luego todas las escrituras: un solo layout por frame. */
function flush() {
  const writes = [...subscribers].map((measure) => measure());
  writes.forEach((write) => write());
}

function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    flush();
  });
}

function subscribe(update: Subscriber) {
  if (subscribers.size === 0)
    window.addEventListener("scroll", onScroll, { passive: true });
  subscribers.add(update);
  // Varias capas pueden entrar a la vez: se miden juntas en el próximo cuadro.
  onScroll();
  return () => {
    subscribers.delete(update);
    if (subscribers.size === 0) window.removeEventListener("scroll", onScroll);
  };
}

/**
 * Paralaje de scroll. Con soporte de `animation-timeline: view()` lo hace el CSS
 * (clase `.art-parallax`) y el hook no hace nada. Si no, un listener compartido escribe
 * `--scroll-shift` y `data-inview` activa `will-change` solo cerca de la pantalla.
 */
export function useScrollParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || supportsScrollTimeline()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let unsubscribe: (() => void) | null = null;

    const update = () => {
      const rect = element.getBoundingClientRect();
      // -1 cuando entra por abajo, 1 cuando sale por arriba
      const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
      const shift = (progress * 2 - 1).toFixed(3);
      return () => element.style.setProperty("--scroll-shift", shift);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        element.toggleAttribute("data-inview", visible);
        if (visible && !unsubscribe) unsubscribe = subscribe(update);
        if (!visible && unsubscribe) {
          unsubscribe();
          unsubscribe = null;
        }
      },
      { rootMargin: NEAR_MARGIN },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      unsubscribe?.();
    };
  }, []);

  return ref;
}
