"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const reducedNow = () => window.matchMedia(REDUCED_MOTION).matches;
/** En el servidor no se sabe: se asume movimiento normal y el cliente corrige al hidratar. */
const reducedOnServer = () => false;

/**
 * Interruptor "Efectos": activado por defecto y apagado con prefers-reduced-motion, hasta
 * que la persona lo cambie a mano.
 */
export function useEffectsToggle() {
  const reduced = useSyncExternalStore(subscribe, reducedNow, reducedOnServer);
  const [choice, setChoice] = useState<boolean | null>(null);
  const enabled = choice ?? !reduced;
  const setEnabled = useCallback((next: boolean) => setChoice(next), []);
  return { enabled, setEnabled };
}
