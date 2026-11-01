import { ProgressBar } from "@/components/atoms/ProgressBar";
import { TensionMeter } from "@/components/atoms/TensionMeter";
import type { GameState } from "@/types/fishing";

interface PhaseMeterProps {
  readonly state: GameState;
  readonly labels: {
    readonly power: string;
    readonly tension: string;
    readonly progress: string;
  };
}

/** Indicador fino de la fase: la fuerza al cargar y la tensión y el hilo en la pelea. */
export function PhaseMeter({ state, labels }: PhaseMeterProps) {
  if (state.phase === "casting") {
    return (
      <div data-testid="cast-power">
        <ProgressBar value={state.power} label={labels.power} />
      </div>
    );
  }
  if (state.phase !== "fighting") return null;
  return (
    <div className="grid gap-1.5">
      {state.mode === "challenge" ? (
        <TensionMeter
          value={state.fight.tension}
          label={labels.tension}
          valueText={labels.tension}
        />
      ) : null}
      <ProgressBar value={state.fight.progress} label={labels.progress} />
    </div>
  );
}
