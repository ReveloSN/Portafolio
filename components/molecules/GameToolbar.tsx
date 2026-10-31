import { Button } from "@/components/atoms/Button";
import { ModeToggle } from "@/components/atoms/ModeToggle";
import { CatchCounter } from "@/components/molecules/CatchCounter";

export interface GameToolbarLabels {
  readonly captures: string;
  readonly revealAll: string;
  readonly reset: string;
}

/** Un interruptor de la barra (modo relajado, sonido, efectos…). */
export interface ToolbarToggle {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
  readonly testId: string;
}

interface GameToolbarProps {
  readonly labels: GameToolbarLabels;
  readonly count: number;
  readonly total: number;
  readonly toggles: readonly ToolbarToggle[];
  readonly onRevealAll: () => void;
  readonly onReset: () => void;
}

/** Contador, interruptores y atajos: siempre disponibles, se juegue o no. */
export function GameToolbar({
  labels,
  count,
  total,
  toggles,
  onRevealAll,
  onReset,
}: GameToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/10 pt-4">
      <CatchCounter label={labels.captures} count={count} total={total} />
      <div className="flex flex-wrap gap-2 sm:ml-auto">
        {toggles.map((toggle) => (
          <ModeToggle key={toggle.testId} {...toggle} />
        ))}
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
