/** Zona del lago donde cae el anzuelo, según la fuerza del lanzamiento. */
export type Depth = "shore" | "mid" | "deep";

export type BaitId = "worm" | "minnow" | "firefly";

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

import type { LakePieceId } from "./lake";

/** Estrategia de cada criatura: dónde vive, qué come, cómo pelea y qué revela. */
export interface Creature {
  readonly id: CreatureId;
  readonly name: string;
  readonly depth: Depth;
  readonly baits: readonly BaitId[];
  /** 0 (dócil) a 1 (feroz): escala sus tirones y el tiempo que tarda en soltarse. */
  readonly difficulty: number;
  readonly size: CreatureSize;
  /** Una fase por tramo de progreso: el megalodón cambia de patrón a mitad de pelea. */
  readonly phases: readonly PullPattern[];
  /** Capturas previas necesarias para que aparezca. */
  readonly unlockAfter: number;
  /** Id de la entrada de experiencia que revela. */
  readonly experienceId: string;
  /** Dibujo pintado de la criatura (registro LAKE_ART). */
  readonly art: LakePieceId;
  readonly breach: BreachClass;
}

export interface Bait {
  readonly id: BaitId;
  readonly label: string;
  readonly hint: string;
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

export type BlockReason = "noBait";

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
  /** Carnada tomada de un balde; se consume al terminar cada intento. */
  readonly bait: BaitId | null;
  /** Solo con la carnada enganchada en la caña se puede lanzar. */
  readonly baitAttached: boolean;
  /** Por qué no pasó lo que el jugador intentó (p. ej. lanzar sin carnada). */
  readonly blocked: BlockReason | null;
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
  | { readonly type: "pickBait"; readonly bait: BaitId }
  | { readonly type: "attachBait" }
  | { readonly type: "detachBait" }
  | { readonly type: "setMode"; readonly mode: GameMode }
  | { readonly type: "press"; readonly now: number }
  | { readonly type: "release"; readonly now: number }
  | { readonly type: "tick"; readonly now: number; readonly dt: number }
  | { readonly type: "reseed"; readonly seed: number }
  | { readonly type: "revealAll" }
  | { readonly type: "reset" };
