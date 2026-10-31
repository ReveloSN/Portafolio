import type { ReactNode } from "react";
import type { BucketInteraction } from "@/components/molecules/BaitBucket";
import { BaitBuckets } from "@/components/organisms/BaitBuckets";
import { LakeScene } from "@/components/organisms/LakeScene";
import { COPY } from "@/data/copy";
import { BAITS } from "@/data/creatures";
import { LAKE_ASSETS } from "@/data/lakeAssets";
import { isBetweenCasts } from "@/lib/fishing/engine";
import { cn } from "@/lib/utils";
import type { BaitId, Creature, GameState } from "@/types/fishing";

interface LakeStageProps {
  readonly state: GameState;
  readonly creature: Creature | null;
  readonly shaking: boolean;
  readonly interactionFor: (bait: BaitId) => BucketInteraction;
  /** Capas extra sobre la escena (zona de enganche, carnada en arrastre). */
  readonly children?: ReactNode;
}

/**
 * La escena y lo que vive encima: los baldes del muelle y el mensaje final. Todo se
 * posiciona en porcentajes de la escena, así coincide en cualquier tamaño.
 */
export function LakeStage({
  state,
  creature,
  shaking,
  interactionFor,
  children,
}: LakeStageProps) {
  const { experience: copy } = COPY;
  return (
    <div className={cn("lake-stage", shaking && "is-shaking")}>
      <div className="lake-scenebox">
        <div className="lake-canvas" data-testid="lake-canvas">
          <LakeScene
            phase={state.phase}
            mode={state.mode}
            depth={state.depth}
            power={state.power}
            fight={state.fight}
            creature={creature}
            attachedBait={state.baitAttached ? state.bait : null}
            assets={LAKE_ASSETS}
            label={copy.lakeLabel}
          />
          {children}
          {state.phase === "complete" ? (
            <div className="lake-closing" data-testid="closing-message">
              <p className="font-display text-fluid-xl font-extrabold">
                {copy.closing.title}
              </p>
              <p className="text-fluid-sm mt-1 opacity-85">{copy.closing.text}</p>
            </div>
          ) : null}
        </div>
        <BaitBuckets
          baits={BAITS}
          assets={LAKE_ASSETS.buckets}
          selected={state.bait}
          disabled={!isBetweenCasts(state.phase)}
          labels={copy.buckets}
          interactionFor={interactionFor}
        />
      </div>
    </div>
  );
}
