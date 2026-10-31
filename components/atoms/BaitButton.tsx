import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaitButtonProps {
  readonly label: string;
  readonly hint: string;
  readonly icon: ReactNode;
  readonly selected: boolean;
  /** Con el anzuelo en el agua no se cambia: sigue enfocable (aria-disabled). */
  readonly locked: boolean;
  readonly onSelect: () => void;
}

export function BaitButton({
  label,
  hint,
  icon,
  selected,
  locked,
  onSelect,
}: BaitButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-disabled={locked || undefined}
      title={hint}
      onClick={() => {
        if (!locked) onSelect();
      }}
      className={cn(
        "text-fluid-sm flex min-h-11 min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2 font-semibold transition-colors",
        selected
          ? "border-glow bg-glow/15 text-leaf"
          : "text-leaf/80 border-white/15 bg-white/5 hover:bg-white/10",
        locked && "cursor-default opacity-60 hover:bg-white/5",
      )}
    >
      <span aria-hidden="true" className="inline-flex size-6 shrink-0">
        {icon}
      </span>
      {label}
    </button>
  );
}
