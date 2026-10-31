import { BAIT_AIR_LIFT } from "@/data/breach";
import { isBaitInAir } from "@/lib/fishing/breach";
import { rodAngle } from "@/lib/fishing/pose";
import {
  BOBBER_AT,
  dangleFrom,
  heightUnits,
  PULL_JITTER,
  rodTip,
  type ScenePoint,
} from "@/lib/fishing/scene";
import type {
  BreachStage,
  Depth,
  FightState,
  GameMode,
  GamePhase,
} from "@/types/fishing";

/** Colgando de la caña, flotando a la espera, hundida por la picada o en plena pelea. */
export type BobberState = "dangling" | "floating" | "biting" | "fighting";

export interface RigInput {
  readonly phase: GamePhase;
  readonly mode: GameMode;
  readonly depth: Depth | null;
  readonly power: number;
  readonly fight: FightState;
  readonly breach: BreachStage;
}

/** Dónde va cada parte del aparejo en este fotograma (unidades del SVG). */
export interface Rig {
  readonly angle: number;
  readonly tip: ScenePoint;
  /** La boya no se ve mientras la criatura salta. */
  readonly bobber: { readonly point: ScenePoint; readonly state: BobberState } | null;
  readonly line: { readonly end: ScenePoint; readonly tautness: number };
  /** El cebo colgando en el aire, hasta que la criatura lo muerde. */
  readonly baitInAir: ScenePoint | null;
  readonly jitter: number;
}

const IN_WATER: ReadonlySet<GamePhase> = new Set(["waiting", "bite", "fighting"]);
const BOBBER_STATE: Partial<Readonly<Record<GamePhase, BobberState>>> = {
  waiting: "floating",
  bite: "biting",
  fighting: "fighting",
};
const JITTER_SPEED = 0.05;
const TAUT = 1;
const BITE_TAUTNESS = 0.3;

/** Caña, sedal, boya y cebo según la fase del juego y la del salto. */
export function rigLayout({ phase, mode, depth, power, fight, breach }: RigInput): Rig {
  const angle = rodAngle(phase, power, fight, mode);
  const tip = rodTip(angle);
  const target = depth ? BOBBER_AT[depth] : dangleFrom(tip);

  if (phase === "bite" && breach !== "idle") {
    const baitInAir = isBaitInAir(breach)
      ? { x: target.x, y: target.y - heightUnits(BAIT_AIR_LIFT) }
      : null;
    return {
      angle,
      tip,
      bobber: null,
      line: { end: baitInAir ?? target, tautness: TAUT },
      baitInAir,
      jitter: 0,
    };
  }

  const inWater = IN_WATER.has(phase);
  const fighting = phase === "fighting";
  const point = inWater ? target : dangleFrom(tip);
  const jitter = fighting
    ? Math.sin(fight.elapsedMs * JITTER_SPEED) * fight.fishPull * PULL_JITTER
    : 0;
  const strain = mode === "challenge" ? fight.tension : fight.progress;
  const tautness =
    !inWater || fighting ? 0.5 + strain / 2 : phase === "bite" ? BITE_TAUTNESS : 0;
  return {
    angle,
    tip,
    bobber: { point, state: BOBBER_STATE[phase] ?? "dangling" },
    line: { end: { x: point.x + jitter, y: point.y }, tautness },
    baitInAir: null,
    jitter,
  };
}
