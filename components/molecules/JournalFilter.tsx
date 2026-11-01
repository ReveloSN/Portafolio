import { Icon, type IconName } from "@/components/atoms/Icon";
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

/** Pestañas de tinta que filtran el diario por tipo de experiencia. */
export function JournalFilter({ label, options, value, onChange }: JournalFilterProps) {
  return (
    <div role="group" aria-label={label} className="journal-filter">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            data-testid={`filter-${option.value}`}
            onClick={() => onChange(option.value)}
            className="journal-chip"
          >
            {option.icon ? (
              <Icon
                name={option.icon}
                aria-hidden="true"
                style={{ color: active ? undefined : option.color }}
              />
            ) : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
