import { Button } from "@/components/atoms/Button";

interface PuzzleToolbarProps {
  readonly groupLabel: string;
  readonly progress: string;
  readonly placeSelectedLabel: string;
  readonly placeAllLabel: string;
  readonly resetLabel: string;
  readonly canPlaceSelected: boolean;
  readonly complete: boolean;
  readonly started: boolean;
  readonly onPlaceSelected: () => void;
  readonly onPlaceAll: () => void;
  readonly onReset: () => void;
}

/** Controles del fósil: alternativa con botones al arrastre y progreso visible. */
export function PuzzleToolbar(props: PuzzleToolbarProps) {
  return (
    <div
      role="group"
      aria-label={props.groupLabel}
      className="flex flex-wrap items-center gap-3"
    >
      <p className="text-fluid-sm mr-auto font-mono tracking-[.12em]">{props.progress}</p>
      <Button
        size="sm"
        variant="ghost"
        disabled={!props.canPlaceSelected}
        onClick={props.onPlaceSelected}
      >
        {props.placeSelectedLabel}
      </Button>
      <Button size="sm" disabled={props.complete} onClick={props.onPlaceAll}>
        {props.placeAllLabel}
      </Button>
      <Button size="sm" variant="dark" disabled={!props.started} onClick={props.onReset}>
        {props.resetLabel}
      </Button>
    </div>
  );
}
