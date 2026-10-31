import { useMemo } from "react";
import { BreachActor } from "@/components/molecules/BreachActor";
import { Droplets } from "@/components/molecules/Droplets";
import { QuantumRipples } from "@/components/molecules/QuantumRipples";
import { SplashLayers } from "@/components/molecules/SplashLayers";
import { BREACH_FALL_TILT, BREACH_SPRITES } from "@/data/breach";
import { LAKE_ART, LAKE_ASSETS } from "@/data/lakeAssets";
import type { BreachSequence } from "@/hooks/useBreachSequence";
import { makeDroplets } from "@/lib/fishing/breach";
import { BOBBER_PERCENT, waterlineAt } from "@/lib/fishing/scene";
import type { Depth } from "@/types/fishing";
import type { LakeArtId, LakeAsset } from "@/types/lake";

interface BreachLayerProps {
  readonly sequence: BreachSequence;
  readonly depth: Depth | null;
}

/** Semilla de las gotas: el mismo salto siempre salpica igual. */
const DROP_SEED = 0xb4ea;
const PARTICLES = Array.from({ length: 10 }, (_, i) => `particle-${i + 1}` as LakeArtId);

const asset = (id: LakeArtId | undefined): LakeAsset | null => {
  const art = id ? LAKE_ART[id] : undefined;
  return art ? { src: art.src, width: art.width, height: art.height } : null;
};

const DROP_SPRITES = PARTICLES.map(asset).filter((sprite) => sprite !== null);

/** El salto de la criatura al picar: decorativo, por encima del juego y bajo el follaje. */
export function BreachLayer({ sequence, depth }: BreachLayerProps) {
  const { stage, creature, timeline, reduced } = sequence;
  const drops = useMemo(
    () => (timeline ? makeDroplets(timeline.droplets, DROP_SEED) : []),
    [timeline],
  );
  const back = asset("splash-back");
  const front = asset("splash-front");
  if (stage === "idle" || !creature || !timeline || !depth || !back || !front)
    return null;

  const spot = BOBBER_PERCENT[depth];
  const waterline = waterlineAt(depth);
  const sprites = timeline.sprite === "breach" ? BREACH_SPRITES[creature.id] : undefined;
  const open = asset(sprites?.open) ?? LAKE_ASSETS.creatures[creature.id];
  const closed = asset(sprites?.closed);
  return (
    <div
      className="breach-layer"
      aria-hidden="true"
      data-testid="breach"
      data-stage={stage}
      data-creature={creature.id}
    >
      {reduced ? null : (
        <SplashLayers
          stage={stage}
          back={back}
          front={front}
          x={spot.x}
          waterline={waterline}
          width={timeline.width}
        />
      )}
      <BreachActor
        stage={stage}
        timeline={timeline}
        open={open}
        closed={closed}
        x={spot.x}
        waterline={waterline}
        fallDeg={BREACH_FALL_TILT[creature.id] ?? timeline.rotate.fall}
        reduced={reduced}
      />
      {stage === "splash" && !reduced ? (
        <>
          <Droplets
            drops={drops}
            sprites={DROP_SPRITES}
            x={spot.x}
            waterline={waterline}
          />
          <QuantumRipples x={spot.x} y={waterline} burst />
        </>
      ) : null}
    </div>
  );
}
