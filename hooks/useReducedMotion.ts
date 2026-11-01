"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const reducedNow = () => window.matchMedia(REDUCED_MOTION).matches;
/** En el servidor no se sabe: se asume movimiento normal y el cliente corrige al hidratar. */
const reducedOnServer = () => false;

/** prefers-reduced-motion, al día si la persona lo cambia con la página abierta. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, reducedNow, reducedOnServer);
}
