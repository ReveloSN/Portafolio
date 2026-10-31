"use client";

import { ActionPanel } from "@/components/molecules/ActionPanel";
import { BaitPicker } from "@/components/molecules/BaitPicker";
import { CastPowerBar } from "@/components/molecules/CastPowerBar";
import { FightHud } from "@/components/molecules/FightHud";
import { GameToolbar } from "@/components/molecules/GameToolbar";
import { JournalEntry } from "@/components/organisms/JournalEntry";
import { LakeStage } from "@/components/organisms/LakeStage";
import { BAITS, CREATURES } from "@/data/creatures";
import { COPY } from "@/data/copy";
import type { FishingGameApi } from "@/hooks/useFishingGame";
import { useGameFeedback } from "@/hooks/useGameFeedback";
import { experienceById } from "@/lib/collections";
import {
  actionIntent,
  actionLabel,
  gameStatus,
  isActionIdle,
  sceneCreature,
} from "@/lib/fishing/view";

interface FishingGameProps {
  readonly game: FishingGameApi;
}

/** Fases en las que la carnada ya está en el agua y no se puede cambiar. */
const LINE_OUT = new Set(["casting", "waiting", "bite", "fighting"]);

/** El lago jugable: escena, revelado de la captura, controles y atajos. */
export function FishingGame({ game }: FishingGameProps) {
  const { experience: copy } = COPY;
  const { state } = game;
  const feedback = useGameFeedback(state.phase);
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
        interactionFor={(bait) => ({ onClick: () => game.pickBait(bait) })}
      />
      <div className="lake-panel">
        {revealed ? (
          <div key={revealed.id} className="lake-reveal" data-testid="catch-reveal">
            <JournalEntry entry={revealed} revealed />
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-6 lg:grid-cols-1 lg:gap-4">
          <BaitPicker
            title={copy.baitTitle}
            baits={BAITS}
            selected={state.bait}
            locked={LINE_OUT.has(state.phase)}
            onSelect={game.pickBait}
          />
          <ActionPanel
            status={gameStatus(state)}
            actionLabel={actionLabel(state)}
            idle={isActionIdle(state)}
            urgent={state.phase === "bite"}
            onPress={() =>
              actionIntent(state) === "attach" ? game.attachBait() : game.press()
            }
            onRelease={game.release}
            meter={meter}
          />
        </div>
        <GameToolbar
          labels={copy}
          count={state.caught.length}
          total={CREATURES.length}
          relaxed={state.mode === "relaxed"}
          soundOn={feedback.soundOn}
          onRelaxedChange={(next) => game.setMode(next ? "relaxed" : "challenge")}
          onToggleSound={feedback.toggleSound}
          onRevealAll={game.revealAll}
          onReset={game.reset}
        />
      </div>
    </section>
  );
}
