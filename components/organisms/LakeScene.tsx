import { Bobber, type BobberState } from "@/components/worlds/lake/Bobber";
import { CanoeReturn } from "@/components/worlds/lake/CanoeReturn";
import { CreatureShadow } from "@/components/worlds/lake/CreatureShadow";
import { FishingLine } from "@/components/worlds/lake/FishingLine";
import { KidSprite } from "@/components/worlds/lake/KidSprite";
import { LakeReeds } from "@/components/worlds/lake/LakeReeds";
import { LeapingCreature } from "@/components/worlds/lake/LeapingCreature";
import { Rod } from "@/components/worlds/lake/Rod";
import { kidPose, rodAngle } from "@/lib/fishing/pose";
import {
  BOBBER_AT,
  dangleFrom,
  LAKE_VIEWBOX,
  PULL_JITTER,
  rodTip,
  SHADOW_RX,
} from "@/lib/fishing/scene";
import type {
  BaitId,
  Creature,
  Depth,
  FightState,
  GameMode,
  GamePhase,
} from "@/types/fishing";
import type { LakeAssets } from "@/types/lake";

interface LakeSceneProps {
  readonly phase: GamePhase;
  readonly mode: GameMode;
  readonly depth: Depth | null;
  readonly power: number;
  readonly fight: FightState;
  /** La que pica o pelea, o la recién capturada. */
  readonly creature: Creature | null;
  /** Carnada enganchada en el anzuelo (se ve colgando hasta lanzar). */
  readonly attachedBait: BaitId | null;
  /** Sin efectos, la criatura se insinúa con una sombra simple bajo la boya. */
  readonly simpleShadow: boolean;
  readonly assets: LakeAssets;
  readonly label: string;
}

const IN_WATER: ReadonlySet<GamePhase> = new Set(["waiting", "bite", "fighting"]);
const LEAPING: ReadonlySet<GamePhase> = new Set(["caught", "complete"]);
const JITTER_SPEED = 0.05;
const BOBBER_STATE: Partial<Readonly<Record<GamePhase, BobberState>>> = {
  waiting: "floating",
  bite: "biting",
  fighting: "fighting",
};

/**
 * Lo que se juega sobre las capas pintadas: juncos, niño, caña, hilo, boya, sombra, salto
 * y canoa. El arte llega por `assets` y la geometría de lib/fishing/scene.ts.
 */
export function LakeScene({
  phase,
  mode,
  depth,
  power,
  fight,
  creature,
  attachedBait,
  simpleShadow,
  assets,
  label,
}: LakeSceneProps) {
  const angle = rodAngle(phase, power, fight, mode);
  const tip = rodTip(angle);
  const target = depth ? BOBBER_AT[depth] : dangleFrom(tip);
  const inWater = IN_WATER.has(phase);
  const bobber = inWater ? target : dangleFrom(tip);
  const fighting = phase === "fighting";
  const biting = phase === "bite";
  const jitter = fighting
    ? Math.sin(fight.elapsedMs * JITTER_SPEED) * fight.fishPull * PULL_JITTER
    : 0;
  const strain = mode === "challenge" ? fight.tension : fight.progress;
  const showShadow =
    simpleShadow && creature !== null && (phase === "waiting" || biting);
  const leaping = creature !== null && LEAPING.has(phase) && depth !== null;

  return (
    <svg
      className="lakesvg"
      viewBox={`0 0 ${LAKE_VIEWBOX.width} ${LAKE_VIEWBOX.height}`}
      role="img"
      aria-label={label}
      data-phase={phase}
    >
      <LakeReeds />
      {showShadow ? (
        <CreatureShadow
          x={target.x}
          y={target.y}
          rx={SHADOW_RX[creature.size]}
          biting={biting}
        />
      ) : null}
      <KidSprite pose={kidPose(phase)} />
      <Rod angle={angle} tugging={biting || fighting} flicking={phase === "waiting"} />
      <FishingLine
        from={tip}
        x={bobber.x + jitter}
        y={bobber.y}
        tautness={!inWater || fighting ? 0.5 + strain / 2 : biting ? 0.3 : 0}
      />
      <Bobber
        x={bobber.x}
        y={bobber.y}
        state={BOBBER_STATE[phase] ?? "dangling"}
        jitter={jitter}
        bait={attachedBait && !inWater ? assets.baits[attachedBait] : null}
      />
      {leaping ? (
        <LeapingCreature
          key={creature.id}
          x={target.x}
          y={target.y}
          size={creature.size}
          asset={assets.creatures[creature.id]}
        />
      ) : null}
      {phase === "complete" ? <CanoeReturn asset={assets.canoe} /> : null}
    </svg>
  );
}
