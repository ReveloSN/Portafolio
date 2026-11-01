import { cn } from "@/lib/utils";

interface CatchMarksProps {
  readonly label: string;
  readonly count: number;
  readonly total: number;
}

/** Contador de capturas como muescas talladas: una por criatura del lago. */
export function CatchMarks({ label, count, total }: CatchMarksProps) {
  return (
    <p className="lake-marks" data-testid="catch-counter">
      <span className="sr-only">
        {label} <span data-testid="catch-count">{count}</span>/{total}
      </span>
      <span aria-hidden="true" className="lake-marks-row">
        {Array.from({ length: total }, (_, index) => (
          <i key={index} className={cn("lake-mark", index < count && "is-caught")} />
        ))}
      </span>
    </p>
  );
}
