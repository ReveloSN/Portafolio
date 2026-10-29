"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import {
  FLIP_DRAG_TOLERANCE_PX,
  FLIP_DURATION_MS,
  FLIP_HOVER_DELAY_MS,
} from "@/lib/constants";

interface UseFlipOptions {
  /** Controlado desde fuera; si se omite, el hook guarda su propio estado. */
  readonly flipped?: boolean;
  readonly onFlip?: (next: boolean) => void;
}

const TOGGLE_KEYS = new Set(["Enter", " "]);

/**
 * Estado del giro y sus eventos: hover con ratón (con demora), clic o toque que
 * alterna (ignorando arrastres y scroll), Enter/Espacio que alternan y Escape que vuelve.
 */
export function useFlip({ flipped: controlled, onFlip }: UseFlipOptions = {}) {
  const [own, setOwn] = useState(false);
  const [turning, setTurning] = useState(false);
  const flipped = controlled ?? own;
  const current = useRef(flipped);
  const hoverTimer = useRef<number>(undefined);
  const settleTimer = useRef<number>(undefined);
  const pressStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    current.current = flipped;
  }, [flipped]);

  useEffect(
    () => () => {
      window.clearTimeout(hoverTimer.current);
      window.clearTimeout(settleTimer.current);
    },
    [],
  );

  const flipTo = useCallback(
    (next: boolean) => {
      if (current.current === next) return;
      current.current = next;
      setOwn(next);
      onFlip?.(next);
      setTurning(true);
      window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => setTurning(false), FLIP_DURATION_MS);
    },
    [onFlip],
  );

  const handlers = {
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = window.setTimeout(() => flipTo(true), FLIP_HOVER_DELAY_MS);
    },
    onPointerLeave: (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      window.clearTimeout(hoverTimer.current);
      flipTo(false);
    },
    onPointerDown: (event: PointerEvent) => {
      pressStart.current = { x: event.clientX, y: event.clientY };
    },
    onClick: (event: MouseEvent) => {
      const start = pressStart.current;
      pressStart.current = null;
      const dragged =
        start !== null &&
        Math.hypot(event.clientX - start.x, event.clientY - start.y) >
          FLIP_DRAG_TOLERANCE_PX;
      if (dragged) return;
      window.clearTimeout(hoverTimer.current);
      flipTo(!current.current);
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        flipTo(false);
        return;
      }
      if (!TOGGLE_KEYS.has(event.key)) return;
      event.preventDefault();
      if (!event.repeat) flipTo(!current.current);
    },
  };

  return { flipped, turning, handlers };
}
