"use client";

import { PhaseMeter } from "@/components/molecules/PhaseMeter";
import { LakeHud } from "@/components/organisms/LakeHud";
import { LakeStage } from "@/components/organisms/LakeStage";
import { COPY } from "@/data/copy";
import { CREATURES } from "@/data/creatures";
import type { FishingGameApi } from "@/hooks/useFishingGame";
import { useEffectsToggle } from "@/hooks/useEffectsToggle";
import { useGameFeedback } from "@/hooks/useGameFeedback";
import { actionLabel, gameStatus, isActionIdle, sceneCreature } from "@/lib/fishing/view";

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

  return (
    <section aria-label={copy.gameLabel} className="lake" data-testid="fishing-game">
      <LakeStage
        state={state}
        creature={creature}
        shaking={feedback.shaking}
        effects={effects.enabled}
        onCue={feedback.cue}
      />
      <LakeHud
        status={gameStatus(state)}
        actionLabel={actionLabel(state)}
        idle={isActionIdle(state)}
        urgent={state.phase === "bite"}
        onPress={game.press}
        onRelease={game.release}
        meter={<PhaseMeter state={state} labels={copy} />}
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
