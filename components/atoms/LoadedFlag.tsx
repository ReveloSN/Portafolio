"use client";

import { useLoadedFlag } from "@/hooks/useLoadedFlag";

/** Avisa al CSS que el documento terminó de cargar (arte diferido). No pinta nada. */
export function LoadedFlag() {
  useLoadedFlag();
  return null;
}
