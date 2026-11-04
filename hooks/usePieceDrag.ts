"use client";

import {
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Point } from "@/types/puzzle";

/** Movimiento (px) por debajo del cual un gesto cuenta como toque y no como arrastre. */
const TAP_TOLERANCE_PX = 6;
const SNAP_MS = 260;
const SNAP_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const ZERO: Point = { x: 0, y: 0 };

const KEY_DIRECTIONS: Readonly<Record<string, Point>> = {
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
};

interface PieceDragOptions {
  /** `false` para piezas ya encajadas. */
  readonly enabled: boolean;
  readonly selected: boolean;
  /** Clave de la posición en el tablero: si cambia, la pieza se movió de sitio. */
  readonly layoutKey: string;
  /** Píxeles por unidad del tablero (cambia con el ancho de la pantalla). */
  readonly pxPerUnit: () => number;
  readonly keyStep: number;
  readonly keyStepLarge: number;
  /** Toque o Enter sin mover: tomar o soltar la pieza. */
  readonly onToggle: () => void;
  /** Suelta la pieza desplazada `offset` unidades; devuelve `true` si encajó. */
  readonly onDrop: (offset: Point) => boolean;
  readonly onCancel: () => void;
}

/**
 * Arrastre de una pieza con Pointer Events y `transform` (sin re-render por frame) y
 * movimiento por teclado. Al encajar, la pieza viaja desde donde se soltó hasta su
 * hueco; al fallar, vuelve a la bandeja. Con movimiento reducido todo es instantáneo.
 */
export function usePieceDrag<T extends HTMLElement>(options: PieceDragOptions) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const offset = useRef<Point>(ZERO);
  const gesture = useRef<{ start: Point; base: Point; moved: boolean } | null>(null);
  const frame = useRef(0);
  const flipFrom = useRef<DOMRect | null>(null);
  const opts = useRef(options);
  useLayoutEffect(() => {
    opts.current = options;
  });

  const paint = () => {
    frame.current = 0;
    const { x, y } = offset.current;
    if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const animateBack = () => {
    const el = ref.current;
    const from = el?.style.transform;
    offset.current = ZERO;
    if (!el) return;
    el.style.transform = "";
    if (!reduced && from && from !== "none") {
      el.animate([{ transform: from }, { transform: "none" }], {
        duration: SNAP_MS,
        easing: SNAP_EASING,
      });
    }
  };

  const drop = () => {
    const el = ref.current;
    const unit = opts.current.pxPerUnit();
    if (!el || unit <= 0) return animateBack();
    flipFrom.current = el.getBoundingClientRect();
    const moved = { x: offset.current.x / unit, y: offset.current.y / unit };
    if (!opts.current.onDrop(moved)) {
      flipFrom.current = null;
      animateBack();
    }
  };

  // Encajó: la pieza cambia de sitio y viaja desde donde se soltó (FLIP).
  useLayoutEffect(() => {
    const el = ref.current;
    const before = flipFrom.current;
    flipFrom.current = null;
    offset.current = ZERO;
    if (!el) return;
    el.style.transform = "";
    if (!before || reduced) return;
    const after = el.getBoundingClientRect();
    const dx = before.left - after.left;
    const dy = before.top - after.top;
    if (dx || dy) {
      el.animate(
        [{ transform: `translate3d(${dx}px, ${dy}px, 0)` }, { transform: "none" }],
        { duration: SNAP_MS, easing: SNAP_EASING },
      );
    }
  }, [options.layoutKey, reduced]);

  // Si la pieza deja de estar tomada (Esc, reinicio, otra pieza), vuelve a la bandeja.
  useEffect(() => {
    if (!options.selected && !gesture.current && offset.current !== ZERO) animateBack();
    // animateBack solo lee refs: no hace falta como dependencia
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.selected]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const handlers = {
    onPointerDown(event: PointerEvent<T>) {
      if (!opts.current.enabled || event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      gesture.current = {
        start: { x: event.clientX, y: event.clientY },
        base: offset.current,
        moved: false,
      };
      event.currentTarget.dataset.dragging = "true";
    },
    onPointerMove(event: PointerEvent<T>) {
      const g = gesture.current;
      if (!g) return;
      const dx = event.clientX - g.start.x;
      const dy = event.clientY - g.start.y;
      if (Math.hypot(dx, dy) > TAP_TOLERANCE_PX) g.moved = true;
      offset.current = { x: g.base.x + dx, y: g.base.y + dy };
      if (!frame.current) frame.current = requestAnimationFrame(paint);
    },
    onPointerUp(event: PointerEvent<T>) {
      const g = gesture.current;
      gesture.current = null;
      delete event.currentTarget.dataset.dragging;
      if (!g) return;
      if (g.moved) drop();
      else opts.current.onToggle();
    },
    onPointerCancel(event: PointerEvent<T>) {
      gesture.current = null;
      delete event.currentTarget.dataset.dragging;
      animateBack();
    },
    onKeyDown(event: KeyboardEvent<T>) {
      if (!opts.current.selected) return;
      if (event.key === "Escape") {
        event.preventDefault();
        animateBack();
        opts.current.onCancel();
        return;
      }
      const dir = KEY_DIRECTIONS[event.key];
      if (!dir) return;
      event.preventDefault();
      const { keyStep, keyStepLarge, pxPerUnit } = opts.current;
      const step = (event.shiftKey ? keyStepLarge : keyStep) * pxPerUnit();
      offset.current = {
        x: offset.current.x + dir.x * step,
        y: offset.current.y + dir.y * step,
      };
      paint();
    },
    /** Solo el clic del teclado (Enter o Espacio, `detail === 0`); el puntero va arriba. */
    onClick(event: MouseEvent<T>) {
      if (event.detail !== 0 || !opts.current.enabled) return;
      const { x, y } = offset.current;
      if (opts.current.selected && (x || y)) drop();
      else opts.current.onToggle();
    },
  };

  return { ref, handlers };
}
