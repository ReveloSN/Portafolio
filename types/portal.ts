import type { ReactNode } from "react";

/**
 * Fases del portal:
 * - `idle`: el velo no se ve.
 * - `closing`: las dos mitades oscuras se cierran sobre la página actual.
 * - `covered`: pantalla oscura; aquí se cambia de ruta y se disimula la carga.
 * - `opening`: las mitades se abren revelando la luz y la página nueva.
 */
export type PortalPhase = "idle" | "closing" | "covered" | "opening";

/** Arte de los bordes del velo (registro en `components/worlds/portalSkins.tsx`). */
export type PortalSkinKey = "vines" | "jaws";

export interface PortalState {
  readonly phase: PortalPhase;
  /** Ruta de destino mientras el portal está en tránsito. */
  readonly href: string | null;
  readonly skin: PortalSkinKey;
  /** `true` solo durante la apertura con la que se entra al sitio. */
  readonly entrance: boolean;
}

export type PortalAction =
  | { readonly type: "navigate"; readonly href: string; readonly skin: PortalSkinKey }
  | { readonly type: "covered" }
  | { readonly type: "arrived" }
  | { readonly type: "settled" }
  | { readonly type: "skip" };

export interface PortalTiming {
  /** Cierre de las mitades (ms). */
  readonly closeMs: number;
  /** Apertura tras navegar (ms). */
  readonly openMs: number;
}

/** Bordes recortados de cada mitad del velo y, si la necesita, su propia duración de entrada. */
export interface PortalSkin {
  readonly top: ReactNode;
  readonly bottom: ReactNode;
  /** Duración de la apertura al cargar el sitio (ms). */
  readonly enterMs: number;
}

/** Datos mínimos de un clic para decidir si el portal lo intercepta. */
export interface PortalClick {
  readonly button: number;
  readonly metaKey: boolean;
  readonly ctrlKey: boolean;
  readonly shiftKey: boolean;
  readonly altKey: boolean;
  readonly defaultPrevented: boolean;
}
