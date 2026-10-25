import { Button } from "@/components/atoms/Button";
import type { FishingPhase } from "@/types/fishing";

export interface LakeHudLabels {
  readonly captures: string;
  readonly cast: string;
  readonly pull: string;
  readonly waitingButton: string;
  readonly caughtButton: string;
  readonly reset: string;
}

interface LakeHudProps {
  readonly phase: FishingPhase;
  readonly count: number;
  readonly total: number;
  readonly status: string;
  readonly labels: LakeHudLabels;
  readonly onCast: () => void;
  readonly onPull: () => void;
  readonly onReset: () => void;
}

export function LakeHud({
  phase,
  count,
  total,
  status,
  labels,
  onCast,
  onPull,
  onReset,
}: LakeHudProps) {
  const busy = phase === "waiting" || phase === "reeling" || phase === "caught";
  return (
    <div className="sm:px-fluid-3 flex flex-wrap items-center gap-4 border-t border-[rgba(110,240,224,.2)] bg-[rgba(4,20,28,.92)] px-4 py-3.5 sm:py-4">
      <div aria-live="polite" className="min-w-[200px] flex-1">
        <p className="text-fluid-xs font-mono tracking-[.22em] opacity-70">
          {labels.captures} {count} / {total}
        </p>
        <p className="text-fluid-base mt-1 font-semibold">{status}</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {count > 0 ? (
          <Button variant="ghost" size="sm" onClick={onReset}>
            {labels.reset}
          </Button>
        ) : null}
        {phase === "idle" ? <Button onClick={onCast}>{labels.cast}</Button> : null}
        {busy ? (
          <Button variant="ghost" disabled>
            {phase === "waiting" ? labels.waitingButton : labels.caughtButton}
          </Button>
        ) : null}
        {phase === "bite" ? (
          <Button className="pull" onClick={onPull}>
            {labels.pull}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
