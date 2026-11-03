"use client";

import { createContext, useContext } from "react";
import type { PortalPhase } from "@/types/portal";

export interface PortalApi {
  readonly phase: PortalPhase;
  /** Cruza el portal hacia otra ruta interna. */
  readonly navigate: (href: string) => void;
}

export const PortalContext = createContext<PortalApi | null>(null);

/** Acceso al portal desde cualquier enlace o botón; `null` fuera de `PortalProvider`. */
export function usePortalTransition() {
  return useContext(PortalContext);
}
