import { Bobber } from "@/components/worlds/lake/Bobber";
import { CanoeReturn } from "@/components/worlds/lake/CanoeReturn";
import { CreatureShadow } from "@/components/worlds/lake/CreatureShadow";
import { FishingLine } from "@/components/worlds/lake/FishingLine";
import { HangingHook } from "@/components/worlds/lake/HangingHook";
import { KidSprite } from "@/components/worlds/lake/KidSprite";
import { LakeReeds } from "@/components/worlds/lake/LakeReeds";
import { LeapingCreature } from "@/components/worlds/lake/LeapingCreature";
import { Rod } from "@/components/worlds/lake/Rod";
import { kidPose } from "@/lib/fishing/pose";
import { rigLayout } from "@/lib/fishing/rig";
import { BOBBER_AT, LAKE_VIEWBOX, SHADOW_RX } from "@/lib/fishing/scene";
import type { BreachStage, Creature, Depth, GamePhase } from "@/types/fishing";
import type { LakeAssets } from "@/types/lake";

interface LakeSceneProps {
  readonly phase: GamePhase;
  readonly depth: Depth | null;
  /** La que pica o pelea, o la recién capturada. */
  readonly creature: Creature | null;
  /** Fase visual del salto (la boya se oculta mientras dura). */
  readonly breach: BreachStage;
  /** Sin efectos, la criatura se insinúa con una sombra simple bajo la boya. */
  readonly simpleShadow: boolean;
  readonly assets: LakeAssets;
  readonly label: string;
}

const LEAPING: ReadonlySet<GamePhase> = new Set(["caught", "complete"]);

/**
 * Lo que se juega sobre las capas pintadas: juncos, niño, caña, sedal, boya, anzuelo, sombra,
 * salto final y canoa. La posición de cada parte la decide rigLayout().
 */
export function LakeScene(props: LakeSceneProps) {
  const { phase, depth, creature, breach, simpleShadow, assets, label } = props;
  const rig = rigLayout({ phase, depth, breach });
  const target = depth ? BOBBER_AT[depth] : null;
  const biting = phase === "bite";
  const showShadow =
    simpleShadow &&
    creature !== null &&
    target !== null &&
    (phase === "waiting" || biting);
  const leaping = creature !== null && LEAPING.has(phase) && target !== null;

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
      <Rod
        angle={rig.angle}
        tugging={biting || phase === "fighting"}
        flicking={phase === "casting"}
      />
      <FishingLine
        from={rig.tip}
        x={rig.line.end.x}
        y={rig.line.end.y}
        tautness={rig.line.tautness}
      />
      {rig.bobber ? (
        <Bobber x={rig.bobber.point.x} y={rig.bobber.point.y} state={rig.bobber.state} />
      ) : null}
      {rig.hookInAir ? (
        <HangingHook hook={assets.hook} x={rig.hookInAir.x} y={rig.hookInAir.y} />
      ) : null}
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
