"use client";

import { useRef } from "react";
import { HookZone } from "@/components/atoms/HookZone";
import { BaitGhost } from "@/components/molecules/BaitGhost";
import { ActionPanel } from "@/components/molecules/ActionPanel";
import { CastPowerBar } from "@/components/molecules/CastPowerBar";
import { FightHud } from "@/components/molecules/FightHud";
import { GameToolbar } from "@/components/molecules/GameToolbar";
import { JournalEntry } from "@/components/organisms/JournalEntry";
import { LakeStage } from "@/components/organisms/LakeStage";
import { BAITS, CREATURES } from "@/data/creatures";
import { COPY } from "@/data/copy";
import { LAKE_ASSETS } from "@/data/lakeAssets";
import type { FishingGameApi } from "@/hooks/useFishingGame";
import { useBaitControls } from "@/hooks/useBaitControls";
import { useEffectsToggle } from "@/hooks/useEffectsToggle";
import { useGameFeedback } from "@/hooks/useGameFeedback";
import { isBetweenCasts } from "@/lib/fishing/engine";
import { experienceById } from "@/lib/collections";
import { actionLabel, gameStatus, isActionIdle, sceneCreature } from "@/lib/fishing/view";

interface FishingGameProps {
  readonly game: FishingGameApi;
}

/** El lago jugable: escena, revelado de la captura, controles y atajos. */
export function FishingGame({ game }: FishingGameProps) {
  const { experience: copy } = COPY;
  const { state } = game;
  const feedback = useGameFeedback(state.phase);
  const effects = useEffectsToggle();
  const canvasRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const bait = useBaitControls(game, { canvasRef, zoneRef, ghostRef, actionRef });
  const awaitingHook =
    isBetweenCasts(state.phase) && state.bait !== null && !state.baitAttached;
  const creature = sceneCreature(state);
  const revealed =
    state.phase === "caught" && creature
      ? experienceById.get(creature.experienceId)
      : null;

  const meter =
    state.phase === "casting" ? (
      <CastPowerBar power={state.power} label={copy.power} depthLabels={copy.depth} />
    ) : state.phase === "fighting" ? (
      <FightHud fight={state.fight} mode={state.mode} labels={copy} />
    ) : null;

  return (
    <section aria-label={copy.gameLabel} className="lake" data-testid="fishing-game">
      <LakeStage
        state={state}
        creature={creature}
        shaking={feedback.shaking}
        effects={effects.enabled}
        onCue={feedback.cue}
        interactionFor={bait.interactionFor}
        canvasRef={canvasRef}
      >
        <HookZone ref={zoneRef} visible={awaitingHook} />
        <BaitGhost ref={ghostRef} baits={BAITS} art={LAKE_ASSETS.baits} />
      </LakeStage>
      <div className="lake-panel">
        {revealed ? (
          <div key={revealed.id} className="lake-reveal" data-testid="catch-reveal">
            <JournalEntry entry={revealed} revealed />
          </div>
        ) : null}
        <ActionPanel
          status={gameStatus(state)}
          actionLabel={actionLabel(state)}
          idle={isActionIdle(state)}
          urgent={state.phase === "bite"}
          onPress={bait.onAction}
          onRelease={game.release}
          meter={meter}
          actionRef={actionRef}
        />
        <GameToolbar
          labels={copy}
          count={state.caught.length}
          total={CREATURES.length}
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
      </div>
    </section>
  );
}
