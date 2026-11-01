"use client";

import { useRef } from "react";
import { LakeHud } from "@/components/organisms/LakeHud";
import { LakeStage } from "@/components/organisms/LakeStage";
import { COPY } from "@/data/copy";
import { CREATURES } from "@/data/creatures";
import type { FishingGameApi } from "@/hooks/useFishingGame";
import { useEffectsToggle } from "@/hooks/useEffectsToggle";
import { useGameFeedback } from "@/hooks/useGameFeedback";
import { isBetweenCasts } from "@/lib/fishing/engine";
import { actionLabel, gameStatus, isActionIdle, sceneCreature } from "@/lib/fishing/view";
import type { Depth } from "@/types/fishing";

interface FishingGameProps {
  readonly game: FishingGameApi;
}

/** El lago jugable: la escena a todo el ancho y una interfaz casi invisible encima. */
export function FishingGame({ game }: FishingGameProps) {
  const { experience: copy } = COPY;
  const { state } = game;
  const feedback = useGameFeedback(state.phase);
  const effects = useEffectsToggle();
  const creature = sceneCreature(state);
  const actionRef = useRef<HTMLButtonElement>(null);
  const spotsRef = useRef<HTMLDivElement>(null);

  // Entre intentos la ficha lleva el foco a los puntos de pesca; si no, juega.
  const onAction = () => {
    if (!isBetweenCasts(state.phase)) return game.press();
    spotsRef.current?.querySelector("button")?.focus();
  };
  // Tras elegir un punto, el foco vuelve a la ficha: la picada y el anillo se juegan ahí.
  const onPick = (depth: Depth) => {
    game.cast(depth);
    actionRef.current?.focus({ preventScroll: true });
  };

  return (
    <section aria-label={copy.gameLabel} className="lake" data-testid="fishing-game">
      <LakeStage
        state={state}
        creature={creature}
        shaking={feedback.shaking}
        effects={effects.enabled}
        onCue={feedback.cue}
        spotsRef={spotsRef}
        onPick={onPick}
      />
      <LakeHud
        status={gameStatus(state)}
        actionLabel={actionLabel(state)}
        idle={isActionIdle(state)}
        urgent={state.phase === "bite"}
        onPress={onAction}
        actionRef={actionRef}
        count={state.caught.length}
        total={CREATURES.length}
        labels={copy}
        toggles={[
          {
            label: copy.relaxed,
            checked: state.mode === "relaxed",
            onChange: (next) => game.setMode(next ? "relaxed" : "challenge"),
            testId: "relaxed-toggle",
          },
          {
            label: copy.sound,
            checked: feedback.soundOn,
            onChange: feedback.toggleSound,
            testId: "sound-toggle",
          },
          {
            label: copy.effects,
            checked: effects.enabled,
            onChange: effects.setEnabled,
            testId: "effects-toggle",
          },
        ]}
        onRevealAll={game.revealAll}
        onReset={game.reset}
      />
    </section>
  );
}
