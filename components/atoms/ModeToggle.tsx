import { cn } from "@/lib/utils";

interface ModeToggleProps {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
  readonly testId?: string;
}

/** Interruptor accesible (role="switch") con su etiqueta visible. */
export function ModeToggle({ label, checked, onChange, testId }: ModeToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-testid={testId}
      onClick={() => onChange(!checked)}
      className="text-fluid-sm text-leaf inline-flex min-h-10 cursor-pointer items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 font-semibold transition-colors hover:bg-white/10"
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative h-5 w-9 rounded-full bg-black/45 ring-1 ring-white/20 transition-colors",
          checked && "bg-glow/70",
        )}
      >
        <span
          className={cn(
            "bg-leaf absolute top-0.5 left-0.5 size-4 rounded-full transition-transform",
            checked && "translate-x-4",
          )}
        />
      </span>
      {label}
    </button>
  );
}
