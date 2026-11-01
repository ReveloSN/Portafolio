import { Icon, type IconName } from "@/components/atoms/Icon";
import type { ExperienceFilter } from "@/lib/experience";

export interface TimelineFilterOption {
  readonly value: ExperienceFilter;
  readonly label: string;
  readonly icon?: IconName;
  readonly color?: string;
}

interface TimelineFilterProps {
  readonly label: string;
  readonly options: readonly TimelineFilterOption[];
  readonly value: ExperienceFilter;
  readonly onChange: (value: ExperienceFilter) => void;
}

/** Pestañas de tinta que filtran la línea de tiempo por tipo de experiencia. */
export function TimelineFilter({ label, options, value, onChange }: TimelineFilterProps) {
  return (
    <div role="group" aria-label={label} className="timeline-filter">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            data-testid={`filter-${option.value}`}
            onClick={() => onChange(option.value)}
            className="timeline-chip"
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
