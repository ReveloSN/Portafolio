"use client";

import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";

const PRESS_KEYS = new Set([" ", "Enter"]);
const PRIMARY_BUTTON = 0;

/**
 * Una pulsación en el instante exacto: al bajar el dedo, el ratón o la tecla (Espacio o
 * Enter), no al soltar como un clic. El anillo mide el tiempo, así que cuenta cada milisegundo.
 * Devuelve los manejadores para un botón real: el foco se queda en él todo el juego.
 */
export function usePressInput(onPress: () => void) {
  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== PRIMARY_BUTTON) return;
      event.currentTarget.focus({ preventScroll: true });
      onPress();
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (!PRESS_KEYS.has(event.key)) return;
      event.preventDefault();
      if (!event.repeat) onPress();
    },
    /** El clic que sigue a la pulsación no cuenta dos veces. */
    onClick: (event: MouseEvent<HTMLElement>) => event.preventDefault(),
    /** Un toque largo no abre el menú contextual del sistema. */
    onContextMenu: (event: MouseEvent<HTMLElement>) => event.preventDefault(),
  };
}
