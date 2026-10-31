"use client";

import { ActionPanel } from "@/components/molecules/ActionPanel";
import { BaitPicker } from "@/components/molecules/BaitPicker";
import { CastPowerBar } from "@/components/molecules/CastPowerBar";
import { FightHud } from "@/components/molecules/FightHud";
import { GameToolbar } from "@/components/molecules/GameToolbar";
import { JournalEntry } from "@/components/organisms/JournalEntry";
import { LakeScene } from "@/components/organisms/LakeScene";
import { BAITS, CREATURES } from "@/data/creatures";
import { COPY } from "@/data/copy";
import { LAKE_ASSETS } from "@/data/lakeAssets";
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
import { cn } from "@/lib/utils";

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
      <div className={cn("lake-stage", feedback.shaking && "is-shaking")}>
        <LakeScene
          phase={state.phase}
          mode={state.mode}
          depth={state.depth}
          power={state.power}
          fight={state.fight}
          creature={creature}
          assets={LAKE_ASSETS}
          label={copy.lakeLabel}
        />
        {state.phase === "complete" ? (
          <div className="lake-closing" data-testid="closing-message">
            <p className="font-display text-fluid-xl font-extrabold">
              {copy.closing.title}
            </p>
            <p className="text-fluid-sm mt-1 opacity-85">{copy.closing.text}</p>
          </div>
        ) : null}
        {revealed ? (
          <div
            key={revealed.id}
            className="lake-reveal"
            data-side={state.depth === "shore" ? "right" : "left"}
            data-testid="catch-reveal"
          >
            <JournalEntry entry={revealed} revealed />
          </div>
        ) : null}
      </div>
      <div className="lake-panel">
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
