import { Icon, type IconName } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";
import type { ExperienceKind } from "@/types/experience";

export type JournalFilterValue = ExperienceKind | "all";

export interface JournalFilterOption {
  readonly value: JournalFilterValue;
  readonly label: string;
  readonly icon?: IconName;
  readonly color?: string;
}

interface JournalFilterProps {
  readonly label: string;
  readonly options: readonly JournalFilterOption[];
  readonly value: JournalFilterValue;
  readonly onChange: (value: JournalFilterValue) => void;
}

/** Chips que filtran el diario por tipo de experiencia. */
export function JournalFilter({ label, options, value, onChange }: JournalFilterProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-3">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            data-testid={`filter-${option.value}`}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border px-5 font-semibold transition-colors",
              active
                ? "border-glow bg-glow/15 text-leaf"
                : "text-leaf/80 border-white/20 bg-white/5 hover:bg-white/10",
            )}
          >
            {option.icon ? (
              <Icon
                name={option.icon}
                aria-hidden="true"
                style={{ color: option.color }}
              />
            ) : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
