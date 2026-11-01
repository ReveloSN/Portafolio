import { HOOK_AIR_LIFT } from "@/data/breach";
import { isHookInAir } from "@/lib/fishing/breach";
import { rodAngle } from "@/lib/fishing/pose";
import {
  BOBBER_AT,
  dangleFrom,
  heightUnits,
  rodTip,
  type ScenePoint,
} from "@/lib/fishing/scene";
import type { BreachStage, Depth, GamePhase } from "@/types/fishing";

/** Colgando de la caña, flotando a la espera, hundida por la picada o en plena pelea. */
export type BobberState = "dangling" | "floating" | "biting" | "fighting";

export interface RigInput {
  readonly phase: GamePhase;
  readonly depth: Depth | null;
  readonly breach: BreachStage;
}

/** Dónde va cada parte del aparejo en este fotograma (unidades del SVG). */
export interface Rig {
  readonly angle: number;
  readonly tip: ScenePoint;
  /** La boya no se ve mientras la criatura salta. */
  readonly bobber: { readonly point: ScenePoint; readonly state: BobberState } | null;
  readonly line: { readonly end: ScenePoint; readonly tautness: number };
  /** El anzuelo colgando en el aire, hasta que la criatura lo muerde. */
  readonly hookInAir: ScenePoint | null;
}

/** Al lanzar, la boya ya va hacia su punto (la transición CSS dibuja el vuelo). */
const IN_WATER: ReadonlySet<GamePhase> = new Set([
  "casting",
  "waiting",
  "bite",
  "fighting",
]);
const BOBBER_STATE: Partial<Readonly<Record<GamePhase, BobberState>>> = {
  casting: "floating",
  waiting: "floating",
  bite: "biting",
  fighting: "fighting",
};
const TAUTNESS: Partial<Readonly<Record<GamePhase, number>>> = {
  bite: 0.3,
  fighting: 1,
};
const SLACK_DANGLING = 0.5;
const TAUT = 1;

/** Caña, sedal, boya y anzuelo según la fase del juego y la del salto. */
export function rigLayout({ phase, depth, breach }: RigInput): Rig {
  const angle = rodAngle(phase);
  const tip = rodTip(angle);
  const target = depth ? BOBBER_AT[depth] : dangleFrom(tip);

  if (breach !== "idle" && (phase === "bite" || phase === "fighting")) {
    const hookInAir = isHookInAir(breach)
      ? { x: target.x, y: target.y - heightUnits(HOOK_AIR_LIFT) }
      : null;
    return {
      angle,
      tip,
      bobber: null,
      line: { end: hookInAir ?? target, tautness: TAUT },
      hookInAir,
    };
  }

  const inWater = IN_WATER.has(phase);
  const point = inWater ? target : dangleFrom(tip);
  return {
    angle,
    tip,
    bobber: { point, state: BOBBER_STATE[phase] ?? "dangling" },
    line: { end: point, tautness: inWater ? (TAUTNESS[phase] ?? 0) : SLACK_DANGLING },
    hookInAir: null,
  };
}
