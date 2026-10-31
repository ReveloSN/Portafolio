import { ProgressBar } from "@/components/atoms/ProgressBar";
import { TensionMeter } from "@/components/atoms/TensionMeter";
import { TENSION } from "@/lib/fishing/config";
import { isInGreenZone } from "@/lib/fishing/tension";
import type { FightState, GameMode } from "@/types/fishing";

export interface FightHudLabels {
  readonly tension: string;
  readonly progress: string;
  readonly tensionZone: {
    readonly low: string;
    readonly green: string;
    readonly high: string;
    readonly danger: string;
  };
}

interface FightHudProps {
  readonly fight: FightState;
  readonly mode: GameMode;
  readonly labels: FightHudLabels;
}

function zoneOf(tension: number): keyof FightHudLabels["tensionZone"] {
  if (tension > TENSION.breakAt) return "danger";
  if (isInGreenZone(tension)) return "green";
  return tension < TENSION.greenMin ? "low" : "high";
}

/** Tensión del hilo (solo en desafío) y cuánto falta para sacar la criatura. */
export function FightHud({ fight, mode, labels }: FightHudProps) {
  return (
    <div className="grid gap-2.5" data-testid="fight-hud">
      {mode === "challenge" ? (
        <div>
          <p className="text-fluid-xs mb-1 font-mono tracking-[.18em] uppercase opacity-70">
            {labels.tension}
          </p>
          <TensionMeter
            value={fight.tension}
            label={labels.tension}
            valueText={labels.tensionZone[zoneOf(fight.tension)]}
          />
        </div>
      ) : null}
      <div>
        <p className="text-fluid-xs mb-1 font-mono tracking-[.18em] uppercase opacity-70">
          {labels.progress}
        </p>
        <ProgressBar
          value={fight.progress}
          label={labels.progress}
          fillClassName="bg-[linear-gradient(90deg,#6ef0e0,#a6ff5c)]"
        />
      </div>
    </div>
  );
}
