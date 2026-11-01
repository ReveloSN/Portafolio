/** Zona del lago donde cae el anzuelo, según la fuerza del lanzamiento. */
export type Depth = "shore" | "mid" | "deep";

export type CreatureId =
  "lepidotes" | "ammonite" | "coelacanth" | "ichthyosaur" | "mosasaur" | "megalodon";

/** Tamaño de la sombra bajo el agua y del salto al capturarla. */
export type CreatureSize = "small" | "medium" | "large" | "huge";

/** Cómo sale del agua al picar: arco corto, salto vertical o salto gigante. */
export type BreachClass = "small" | "mid" | "giant";

/** Fases visuales del salto (no frenan al motor). */
export type BreachStage = "idle" | "bulge" | "rise" | "snap" | "fall" | "splash";

/** Anillo de cada criatura: aciertos que pide, velocidad de la aguja (grados/s) y zona. */
export interface RingTuning {
  readonly hits: number;
  readonly speed: number;
  readonly zoneDeg: number;
}

import type { LakePieceId } from "./lake";

/** Cada criatura: dónde vive, cómo pelea en el anillo y qué revela. */
export interface Creature {
  readonly id: CreatureId;
  readonly name: string;
  readonly depth: Depth;
  /** 0 (dócil) a 1 (feroz): cuanto más feroz, antes se suelta si no se engancha. */
  readonly difficulty: number;
  readonly size: CreatureSize;
  /** Su anillo: aciertos que pide, velocidad de la aguja y ancho de la zona. */
  readonly ring: RingTuning;
  /** Capturas previas necesarias para que aparezca. */
  readonly unlockAfter: number;
  /** Id de la entrada de experiencia que revela. */
  readonly experienceId: string;
  /** Dibujo pintado de la criatura (registro LAKE_ART). */
  readonly art: LakePieceId;
  readonly breach: BreachClass;
}

export type GameMode = "relaxed" | "challenge";

export type GamePhase =
  | "idle"
  | "casting"
  | "waiting"
  | "bite"
  | "fighting"
  | "caught"
  | "escaped"
  | "complete";

/** Por qué terminó un intento sin captura. */
export type EscapeReason = "noBite" | "locked" | "slipped" | "missed";

/**
 * Minijuego del anillo. La aguja está en `angleAt` grados en el instante `since` (ms) y
 * gira a `speed` grados por segundo; la zona va de `zoneStart` a `zoneStart + zoneDeg`.
 */
export interface RingState {
  readonly needed: number;
  readonly hits: number;
  readonly misses: number;
  readonly zoneStart: number;
  readonly zoneDeg: number;
  readonly speed: number;
  readonly angleAt: number;
  readonly since: number;
  /** Resultado de la última pulsación, para anunciarlo. */
  readonly last: "hit" | "miss" | null;
}

export interface GameState {
  readonly phase: GamePhase;
  readonly mode: GameMode;
  /** Estado del generador pseudoaleatorio: avanza con cada sorteo. */
  readonly seed: number;
  readonly depth: Depth | null;
  /** La boya en vuelo cae al agua en este instante. */
  readonly landsAt: number | null;
  readonly hooked: CreatureId | null;
  readonly biteAt: number | null;
  /** Solo en modo desafío: cuándo se suelta la criatura si no se confirma la picada. */
  readonly biteDeadline: number | null;
  readonly ring: RingState | null;
  readonly caught: readonly CreatureId[];
  readonly lastCatch: CreatureId | null;
  readonly escapeReason: EscapeReason | null;
}

export type GameAction =
  | { readonly type: "setMode"; readonly mode: GameMode }
  | { readonly type: "cast"; readonly depth: Depth; readonly now: number }
  | { readonly type: "press"; readonly now: number }
  | { readonly type: "tick"; readonly now: number }
  | { readonly type: "reseed"; readonly seed: number }
  | { readonly type: "revealAll" }
  | { readonly type: "reset" };
