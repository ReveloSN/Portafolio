/** Fases de un huevo del nido. */
export type HatchPhase = "idle" | "hover" | "cracking" | "hatched";

export type HatchEvent =
  | { readonly type: "enter" }
  | { readonly type: "leave" }
  /** `instant`: con movimiento reducido el huevo pasa directo a cría. */
  | { readonly type: "activate"; readonly instant: boolean }
  | { readonly type: "cracked" }
  | { readonly type: "reset" };

/** Tiempos de la eclosión (ms). El CSS los recibe como variables. */
export const HATCH_TIMING = {
  shake: 400,
  cracks: 250,
  flash: 150,
  rise: 450,
  reducedFade: 250,
} as const;

/** Del clic a que la cría empieza a subir: temblor, grietas y destello. */
export const CRACK_MS = HATCH_TIMING.shake + HATCH_TIMING.cracks + HATCH_TIMING.flash;

/** Transiciones puras: un evento que no aplica deja la fase como estaba. */
export function hatchReducer(phase: HatchPhase, event: HatchEvent): HatchPhase {
  switch (event.type) {
    case "enter":
      return phase === "idle" ? "hover" : phase;
    case "leave":
      return phase === "hover" ? "idle" : phase;
    case "activate":
      if (phase === "idle" || phase === "hover")
        return event.instant ? "hatched" : "cracking";
      return phase;
    case "cracked":
      return phase === "cracking" ? "hatched" : phase;
    case "reset":
      return "idle";
  }
}

/** El huevo ya no está entero (se está abriendo o ya salió la cría). */
export const isOpen = (phase: HatchPhase) => phase === "cracking" || phase === "hatched";
