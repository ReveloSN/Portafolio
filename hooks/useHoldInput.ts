"use client";

import {
  useCallback,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";

interface HoldCallbacks {
  readonly onPress: () => void;
  readonly onRelease: () => void;
}

const HOLD_KEYS = new Set([" ", "Enter"]);
const PRIMARY_BUTTON = 0;

/**
 * Pulsar y mantener con puntero (ratón, toque, lápiz) o con Espacio/Enter. Devuelve los
 * manejadores para un botón real: el foco se queda en él durante todo el juego.
 */
export function useHoldInput({ onPress, onRelease }: HoldCallbacks) {
  const held = useRef(false);

  const start = useCallback(() => {
    if (held.current) return;
    held.current = true;
    onPress();
  }, [onPress]);

  const end = useCallback(() => {
    if (!held.current) return;
    held.current = false;
    onRelease();
  }, [onRelease]);

  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== PRIMARY_BUTTON) return;
      event.currentTarget.setPointerCapture?.(event.pointerId);
      event.currentTarget.focus({ preventScroll: true });
      start();
    },
    onPointerUp: end,
    onPointerCancel: end,
    onLostPointerCapture: end,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (!HOLD_KEYS.has(event.key)) return;
      event.preventDefault();
      if (!event.repeat) start();
    },
    onKeyUp: (event: KeyboardEvent<HTMLElement>) => {
      if (!HOLD_KEYS.has(event.key)) return;
      event.preventDefault();
      end();
    },
    onBlur: end,
    /** Un toque largo no abre el menú contextual del sistema. */
    onContextMenu: (event: MouseEvent<HTMLElement>) => event.preventDefault(),
  };
}
