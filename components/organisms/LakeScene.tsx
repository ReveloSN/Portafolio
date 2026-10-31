import { Bobber, type BobberState } from "@/components/worlds/lake/Bobber";
import { CanoeReturn } from "@/components/worlds/lake/CanoeReturn";
import { CreatureShadow } from "@/components/worlds/lake/CreatureShadow";
import { FishingLine } from "@/components/worlds/lake/FishingLine";
import { HookedBait } from "@/components/worlds/lake/HookedBait";
import { LakeArt } from "@/components/worlds/lake/LakeArt";
import { LeapingCreature } from "@/components/worlds/lake/LeapingCreature";
import { ProvisionalKid } from "@/components/worlds/lake/ProvisionalKid";
import { Rod } from "@/components/worlds/lake/Rod";
import {
  BOBBER_AT,
  LAKE_VIEWBOX,
  PULL_JITTER,
  DANGLE,
  HOOK_POINT,
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
const FULL_VIEW = { x: 0, y: 0, w: LAKE_VIEWBOX.width, h: LAKE_VIEWBOX.height };

/**
 * Escena del lago por capas: fondo, caña, hilo, boya, sombra, salto, canoa y primer
 * plano. El arte llega por `assets`; la escena solo decide qué se ve en cada fase.
 */
export function LakeScene({
  phase,
  mode,
  depth,
  power,
  fight,
  creature,
  attachedBait,
  assets,
  label,
}: LakeSceneProps) {
  const target = depth ? BOBBER_AT[depth] : DANGLE;
  const inWater = IN_WATER.has(phase);
  const bobber = inWater ? target : DANGLE;
  const fighting = phase === "fighting";
  const biting = phase === "bite";
  const jitter = fighting
    ? Math.sin(fight.elapsedMs * JITTER_SPEED) * fight.fishPull * PULL_JITTER
    : 0;
  const tension = mode === "challenge" ? fight.tension : fight.progress;
  const showShadow = creature !== null && (phase === "waiting" || biting);
  const leaping = creature !== null && LEAPING.has(phase) && depth !== null;

  return (
    <svg
      className="lakesvg"
      viewBox={`0 0 ${LAKE_VIEWBOX.width} ${LAKE_VIEWBOX.height}`}
      role="img"
      aria-label={label}
      data-phase={phase}
    >
      <LakeArt asset={assets.backdrop} box={FULL_VIEW} />
      {showShadow ? (
        <CreatureShadow
          x={target.x}
          y={target.y}
          rx={SHADOW_RX[creature.size]}
          biting={biting}
        />
      ) : null}
      <ProvisionalKid />
      <Rod power={phase === "casting" ? power : 0} tugging={biting || fighting} />
      <FishingLine
        x={inWater ? bobber.x + jitter : HOOK_POINT.x}
        y={inWater ? bobber.y : HOOK_POINT.y}
        tautness={!inWater || fighting ? 0.5 + tension / 2 : biting ? 0.3 : 0}
      />
      {attachedBait && !inWater ? <HookedBait bait={attachedBait} /> : null}
      <Bobber
        x={bobber.x}
        y={bobber.y}
        state={BOBBER_STATE[phase] ?? "dangling"}
        jitter={jitter}
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
      <LakeArt asset={assets.foreground} box={FULL_VIEW} />
    </svg>
  );
}
