/**
 * Fases del portal:
 * - `idle`: el velo no se ve.
 * - `closing`: las dos mitades oscuras se cierran sobre la página actual.
 * - `covered`: pantalla oscura; aquí se cambia de ruta y se disimula la carga.
 * - `opening`: las mitades se abren revelando la luz y la página nueva.
 */
export type PortalPhase = "idle" | "closing" | "covered" | "opening";

export interface PortalState {
  readonly phase: PortalPhase;
  /** Ruta de destino mientras el portal está en tránsito. */
  readonly href: string | null;
  /** `true` durante la carga y apertura inicial del documento. */
  readonly entrance: boolean;
}

export type PortalAction =
  | { readonly type: "navigate"; readonly href: string }
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

/** Datos mínimos de un clic para decidir si el portal lo intercepta. */
export interface PortalClick {
  readonly button: number;
  readonly metaKey: boolean;
  readonly ctrlKey: boolean;
  readonly shiftKey: boolean;
  readonly altKey: boolean;
  readonly defaultPrevented: boolean;
}
