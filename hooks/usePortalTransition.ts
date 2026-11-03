"use client";

import { createContext, useContext } from "react";

/** Solo la acción: así los enlaces no se vuelven a pintar en cada fase del velo. */
export interface PortalApi {
  /** Cruza el portal hacia otra ruta interna. */
  readonly navigate: (href: string) => void;
}

export const PortalContext = createContext<PortalApi | null>(null);

/** Acceso al portal desde cualquier enlace o botón; `null` fuera de `PortalProvider`. */
export function usePortalTransition() {
  return useContext(PortalContext);
}
