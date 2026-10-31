import { Button } from "@/components/atoms/Button";
import { ModeToggle } from "@/components/atoms/ModeToggle";
import { CatchCounter } from "@/components/molecules/CatchCounter";

export interface GameToolbarLabels {
  readonly captures: string;
  readonly relaxed: string;
  readonly sound: string;
  readonly revealAll: string;
  readonly reset: string;
}

interface GameToolbarProps {
  readonly labels: GameToolbarLabels;
  readonly count: number;
  readonly total: number;
  readonly relaxed: boolean;
  readonly soundOn: boolean;
  readonly onRelaxedChange: (next: boolean) => void;
  readonly onToggleSound: () => void;
  readonly onRevealAll: () => void;
  readonly onReset: () => void;
}

/** Contador, modos y atajos: siempre disponibles, se juegue o no. */
export function GameToolbar({
  labels,
  count,
  total,
  relaxed,
  soundOn,
  onRelaxedChange,
  onToggleSound,
  onRevealAll,
  onReset,
}: GameToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/10 pt-4">
      <CatchCounter label={labels.captures} count={count} total={total} />
      <div className="flex flex-wrap gap-2 sm:ml-auto">
        <ModeToggle
          label={labels.relaxed}
          checked={relaxed}
          onChange={onRelaxedChange}
          testId="relaxed-toggle"
        />
        <ModeToggle label={labels.sound} checked={soundOn} onChange={onToggleSound} />
        <Button variant="ghost" size="sm" onClick={onRevealAll} data-testid="reveal-all">
          {labels.revealAll}
        </Button>
        <Button variant="ghost" size="sm" onClick={onReset} data-testid="reset-game">
          {labels.reset}
        </Button>
      </div>
    </div>
  );
}
