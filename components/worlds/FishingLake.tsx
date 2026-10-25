import { LakeHud } from "@/components/molecules/LakeHud";
import { LakeScene, type Leaping } from "@/components/worlds/LakeScene";
import { COPY } from "@/data/copy";
import type { FishingApi } from "@/hooks/useFishing";
import { catchSequence } from "@/lib/collections";
import { describeCatch, fishingStatus, KIND_COLOR, toCssPhase } from "@/lib/fishingView";

interface FishingLakeProps {
  readonly fishing: FishingApi;
}

/** Lago interactivo: escena animada, tarjeta de captura y panel de control. */
export function FishingLake({ fishing }: FishingLakeProps) {
  const { experience: copy } = COPY;
  const { state } = fishing;
  const total = catchSequence.length;
  const current =
    state.currentIndex === null ? null : (catchSequence[state.currentIndex] ?? null);

  const leaping: Leaping | null = !current
    ? null
    : current.type === "rare"
      ? { kind: current.creature }
      : { kind: "fish", color: KIND_COLOR[current.entry.kind] };
  const info = current ? describeCatch(current) : null;

  return (
    <div className="lake">
      <LakeScene
        phase={toCssPhase(state.phase)}
        leaping={leaping}
        label={copy.lakeLabel}
      />
      {state.phase === "caught" && info ? (
        <div className="reveal" aria-hidden="true">
          <p className="text-glow font-mono text-xs tracking-[.28em] uppercase">
            {info.kicker}
          </p>
          <p className="font-display mt-1.5 text-[clamp(20px,2.6vw,30px)] leading-[1.1] font-extrabold">
            {info.title}
          </p>
          <p className="mx-auto mt-1 max-w-[520px] text-[15px] opacity-85">
            {info.subtitle}
          </p>
        </div>
      ) : null}
      <LakeHud
        phase={state.phase}
        count={state.caughtIndexes.length}
        total={total}
        status={fishingStatus(state, total, current)}
        labels={copy}
        onCast={fishing.cast}
        onPull={fishing.pull}
        onReset={fishing.reset}
      />
    </div>
  );
}
