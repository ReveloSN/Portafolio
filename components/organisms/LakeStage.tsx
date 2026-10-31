"use client";

import type { CSSProperties, ReactNode, Ref } from "react";
import { LanternGlow } from "@/components/atoms/LanternGlow";
import { Fireflies } from "@/components/molecules/Fireflies";
import { LakeAmbience } from "@/components/molecules/LakeAmbience";
import { LakeClosing } from "@/components/molecules/LakeClosing";
import { LakeLayers } from "@/components/molecules/LakeLayers";
import type { BucketInteraction } from "@/components/molecules/BaitBucket";
import { BaitBuckets } from "@/components/organisms/BaitBuckets";
import { BreachLayer } from "@/components/organisms/BreachLayer";
import { LakeScene } from "@/components/organisms/LakeScene";
import { QuantumWater } from "@/components/organisms/QuantumWater";
import { COPY } from "@/data/copy";
import { BAITS } from "@/data/creatures";
import { LAKE_ASSETS } from "@/data/lakeAssets";
import { useBreachSequence } from "@/hooks/useBreachSequence";
import { useParallax } from "@/hooks/useParallax";
import { FIREFLY_COUNT } from "@/lib/constants";
import { isBetweenCasts } from "@/lib/fishing/engine";
import type { FeedbackCue } from "@/lib/fishing/feedback";
import { cn } from "@/lib/utils";
import type { BaitId, Creature, GameState } from "@/types/fishing";

interface LakeStageProps {
  readonly state: GameState;
  readonly creature: Creature | null;
  readonly shaking: boolean;
  /** Interruptor "Efectos": el lago cuántico. */
  readonly effects: boolean;
  readonly interactionFor: (bait: BaitId) => BucketInteraction;
  /** Avisos del salto (rugido y chapoteo): vibración y sonido. */
  readonly onCue: (cue: FeedbackCue) => void;
  /** Capa del tamaño exacto de la escena (coordenadas del arrastre). */
  readonly canvasRef?: Ref<HTMLDivElement>;
  /** Capas extra sobre la escena (zona de enganche, carnada en arrastre). */
  readonly children?: ReactNode;
}

/** Capas detrás del juego (cielo a muelle) y delante (primer plano). */
const BACK_LAYERS = ["sky", "trees", "water", "dock"] as const;
const FRONT_LAYERS = ["foreground"] as const;

/**
 * La escena por capas: arte pintado detrás, el SVG del juego en medio y el primer plano
 * delante; encima, los baldes y el mensaje final. Todo se coloca en porcentajes de la
 * escena, así coincide en cualquier tamaño. El ratón mueve las capas (parallax).
 */
export function LakeStage({
  state,
  creature,
  shaking,
  effects,
  interactionFor,
  onCue,
  canvasRef,
  children,
}: LakeStageProps) {
  const { experience: copy } = COPY;
  const parallaxRef = useParallax<HTMLDivElement>();
  const breach = useBreachSequence(state.phase, creature, onCue);
  const shakePx = breach.stage === "splash" ? (breach.timeline?.shakePx ?? 0) : 0;
  return (
    <div
      className={cn(
        "lake-stage",
        shaking && "is-shaking",
        shakePx > 0 && "is-breach-shaking",
      )}
      style={{ "--shake-px": `${shakePx}px` } as CSSProperties}
    >
      <div ref={parallaxRef} className="lake-scenebox">
        <div ref={canvasRef} className="lake-canvas" data-testid="lake-canvas">
          <LakeLayers
            layers={BACK_LAYERS}
            after={{ water: <LakeAmbience />, dock: <LanternGlow /> }}
          />
          <LakeScene
            phase={state.phase}
            mode={state.mode}
            depth={state.depth}
            power={state.power}
            fight={state.fight}
            creature={creature}
            bait={state.baitAttached ? state.bait : null}
            breach={breach.stage}
            simpleShadow={!effects}
            assets={LAKE_ASSETS}
            label={copy.lakeLabel}
          />
          <QuantumWater
            phase={state.phase}
            depth={state.depth}
            creature={creature}
            enabled={effects}
          />
          <BreachLayer sequence={breach} depth={state.depth} />
          <Fireflies count={FIREFLY_COUNT.lake} className="lake-fireflies" />
          <LakeLayers layers={FRONT_LAYERS} />
          {children}
          {state.phase === "complete" ? <LakeClosing {...copy.closing} /> : null}
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
