import { cn } from "@/lib/utils";

interface CatchCounterProps {
  readonly label: string;
  readonly count: number;
  readonly total: number;
}

/** "Capturas 3/6" con un punto por criatura. */
export function CatchCounter({ label, count, total }: CatchCounterProps) {
  return (
    <p className="flex items-center gap-2.5" data-testid="catch-counter">
      <span className="text-fluid-xs font-mono tracking-[.2em] uppercase">
        {label} <b data-testid="catch-count">{count}</b>/{total}
      </span>
      <span aria-hidden="true" className="flex gap-1">
        {Array.from({ length: total }, (_, index) => (
          <i
            key={index}
            className={cn(
              "size-2 rounded-full ring-1 ring-white/30 transition-colors",
              index < count && "bg-glow ring-glow",
            )}
          />
        ))}
      </span>
    </p>
  );
}
