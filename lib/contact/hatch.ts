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

/** Estado de todo el nido: la fase de cada huevo y la última cría que salió. */
export interface NestState<Id extends string> {
  readonly phases: Readonly<Record<Id, HatchPhase>>;
  /** Última cría que salió; `count` cambia en cada eclosión (aunque sea la misma). */
  readonly lastHatch: { readonly id: Id; readonly count: number } | null;
}

export type NestAction<Id extends string> =
  | { readonly type: "egg"; readonly id: Id; readonly event: HatchEvent }
  | { readonly type: "resetAll" };

export function initialNest<Id extends string>(ids: readonly Id[]): NestState<Id> {
  const phases = Object.fromEntries(ids.map((id) => [id, "idle"])) as Record<
    Id,
    HatchPhase
  >;
  return { phases, lastHatch: null };
}

export function nestReducer<Id extends string>(
  state: NestState<Id>,
  action: NestAction<Id>,
): NestState<Id> {
  if (action.type === "resetAll") {
    return initialNest(Object.keys(state.phases) as Id[]);
  }
  const before = state.phases[action.id];
  const after = hatchReducer(before, action.event);
  if (after === before) return state;
  const hatchedNow = after === "hatched";
  return {
    phases: { ...state.phases, [action.id]: after },
    lastHatch: hatchedNow
      ? { id: action.id, count: (state.lastHatch?.count ?? 0) + 1 }
      : state.lastHatch,
  };
}

/** Hay al menos un huevo abierto (para mostrar "Volver a los huevos"). */
export function anyOpen<Id extends string>(state: NestState<Id>): boolean {
  return (Object.values(state.phases) as HatchPhase[]).some(isOpen);
}
