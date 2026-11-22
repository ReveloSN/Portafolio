"use client";

import { useAnchorSettle } from "@/hooks/useAnchorSettle";
import { useLoadedFlag } from "@/hooks/useLoadedFlag";

/** Lo que pasa al terminar la carga: suelta el arte diferido y alinea el ancla. No pinta nada. */
export function LoadedFlag() {
  useLoadedFlag();
  useAnchorSettle();
  return null;
}
