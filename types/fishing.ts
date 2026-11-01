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

/** Fuerza con la que tira la criatura (0 a 1) en función del tiempo de pelea (ms). */
export type PullPattern = (elapsedMs: number) => number;

/** Anillo de cada criatura: aciertos que pide, velocidad de la aguja (grados/s) y zona. */
export interface RingTuning {
  readonly hits: number;
  readonly speed: number;
  readonly zoneDeg: number;
}

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

import type { LakePieceId } from "./lake";

/** Estrategia de cada criatura: dónde vive, qué come, cómo pelea y qué revela. */
export interface Creature {
  readonly id: CreatureId;
  readonly name: string;
  readonly depth: Depth;
  /** 0 (dócil) a 1 (feroz): escala sus tirones y el tiempo que tarda en soltarse. */
  readonly difficulty: number;
  readonly size: CreatureSize;
  /** Una fase por tramo de progreso: el megalodón cambia de patrón a mitad de pelea. */
  readonly phases: readonly PullPattern[];
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
  | "lineBroken"
  | "complete";

/** Por qué terminó un intento sin captura. */
export type EscapeReason = "noBite" | "locked" | "slipped" | "fought";

export interface FightState {
  readonly tension: number;
  readonly progress: number;
  readonly fishPull: number;
  /** Tiempo seguido con la tensión en rojo (ms). */
  readonly overTensionMs: number;
  readonly elapsedMs: number;
}

export interface GameState {
  readonly phase: GamePhase;
  readonly mode: GameMode;
  /** Estado del generador pseudoaleatorio: avanza con cada sorteo. */
  readonly seed: number;
  readonly castStartedAt: number | null;
  readonly power: number;
  readonly depth: Depth | null;
  readonly hooked: CreatureId | null;
  readonly biteAt: number | null;
  /** Solo en modo desafío: cuándo se suelta la criatura si no se confirma la picada. */
  readonly biteDeadline: number | null;
  readonly holding: boolean;
  readonly fight: FightState;
  readonly caught: readonly CreatureId[];
  readonly lastCatch: CreatureId | null;
  readonly escapeReason: EscapeReason | null;
}

export type GameAction =
  | { readonly type: "setMode"; readonly mode: GameMode }
  | { readonly type: "press"; readonly now: number }
  | { readonly type: "release"; readonly now: number }
  | { readonly type: "tick"; readonly now: number; readonly dt: number }
  | { readonly type: "reseed"; readonly seed: number }
  | { readonly type: "revealAll" }
  | { readonly type: "reset" };
