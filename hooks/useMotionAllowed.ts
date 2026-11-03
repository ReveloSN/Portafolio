"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
/** En el servidor (y al hidratar) no se anima nada: el cliente lo activa después. */
const getServerSnapshot = () => false;

/** `false` si la persona pidió movimiento reducido; sigue el cambio en vivo. */
export function useMotionAllowed() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
