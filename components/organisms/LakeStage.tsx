"use client";

import type { CSSProperties, Ref } from "react";
import { LanternGlow } from "@/components/atoms/LanternGlow";
import { Fireflies } from "@/components/molecules/Fireflies";
import { FishingSpots } from "@/components/molecules/FishingSpots";
import { LakeAmbience } from "@/components/molecules/LakeAmbience";
import { LakeClosing } from "@/components/molecules/LakeClosing";
import { LakeLayers } from "@/components/molecules/LakeLayers";
import { RingGauge } from "@/components/molecules/RingGauge";
import { SceneGrade } from "@/components/molecules/SceneGrade";
import { BreachLayer } from "@/components/organisms/BreachLayer";
import { LakeScene } from "@/components/organisms/LakeScene";
import { QuantumWater } from "@/components/organisms/QuantumWater";
import { COPY } from "@/data/copy";
import { LAKE_ASSETS } from "@/data/lakeAssets";
import { useBreachSequence } from "@/hooks/useBreachSequence";
import { useParallax } from "@/hooks/useParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FIREFLY_COUNT } from "@/lib/constants";
import { isBetweenCasts } from "@/lib/fishing/engine";
import type { FeedbackCue } from "@/lib/fishing/feedback";
import { BOBBER_PERCENT } from "@/lib/fishing/scene";
import { fill, ringScore } from "@/lib/fishing/view";
import { cn } from "@/lib/utils";
import type { Creature, Depth, GameState } from "@/types/fishing";

interface LakeStageProps {
  readonly state: GameState;
  readonly creature: Creature | null;
  readonly shaking: boolean;
  /** Interruptor "Efectos": el lago cuántico. */
  readonly effects: boolean;
  /** Avisos del salto (rugido y chapoteo): vibración y sonido. */
  readonly onCue: (cue: FeedbackCue) => void;
  readonly spotsRef: Ref<HTMLDivElement>;
  readonly onPick: (depth: Depth) => void;
}

/** Capas detrás del juego (cielo a muelle) y delante (primer plano). */
const BACK_LAYERS = ["sky", "trees", "water", "dock"] as const;
const FRONT_LAYERS = ["foreground"] as const;
const DEPTHS: readonly Depth[] = ["shore", "mid", "deep"];

/**
 * La escena por capas dentro de un marco que la recorta por arriba (el muelle y el agua de
 * juego nunca se cortan): arte pintado detrás, el SVG del juego en medio, los puntos de
 * pesca y el anillo encima del agua, el primer plano delante y la gradación encima.
 */
export function LakeStage(props: LakeStageProps) {
  const { state, creature, shaking, effects, onCue, spotsRef, onPick } = props;
  const { experience: copy } = COPY;
  const parallaxRef = useParallax<HTMLDivElement>();
  const reduced = useReducedMotion();
  const breach = useBreachSequence(state.phase, creature, onCue);
  const shakePx = breach.stage === "splash" ? (breach.timeline?.shakePx ?? 0) : 0;
  const ringAt = state.depth ? BOBBER_PERCENT[state.depth] : null;
  return (
    <div
      ref={parallaxRef}
      className={cn(
        "lake-viewport",
        shaking && "is-shaking",
        shakePx > 0 && "is-breach-shaking",
      )}
      style={{ "--shake-px": `${shakePx}px` } as CSSProperties}
    >
      <div className="lake-canvas" data-testid="lake-canvas">
        <LakeLayers
          layers={BACK_LAYERS}
          after={{ water: <LakeAmbience />, dock: <LanternGlow /> }}
        />
        <LakeScene
          phase={state.phase}
          depth={state.depth}
          creature={creature}
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
        <div ref={spotsRef} className="lake-spots">
          {isBetweenCasts(state.phase) ? (
            <FishingSpots
              depths={DEPTHS}
              names={copy.depth}
              label={(name) => fill(copy.spot, { name })}
              onPick={onPick}
            />
          ) : null}
        </div>
        {state.phase === "fighting" && state.ring && ringAt ? (
          <RingGauge
            ring={state.ring}
            left={`${ringAt.x}%`}
            top={`${ringAt.y}%`}
            hitsLabel={ringScore(state.ring)}
            reduced={reduced}
          />
        ) : null}
        <LakeLayers layers={FRONT_LAYERS} />
        <SceneGrade />
      </div>
      {state.phase === "complete" ? <LakeClosing {...copy.closing} /> : null}
    </div>
  );
}
