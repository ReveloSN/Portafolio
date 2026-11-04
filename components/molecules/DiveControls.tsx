import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import {
  TimelineFilter,
  type TimelineFilterOption,
} from "@/components/molecules/TimelineFilter";
import type { ExperienceFilter } from "@/lib/experience";

interface DiveControlsProps {
  readonly filterLabel: string;
  readonly options: readonly TimelineFilterOption[];
  readonly filter: ExperienceFilter;
  readonly onFilter: (value: ExperienceFilter) => void;
  readonly lightsLabel: string;
  readonly lightsOn: boolean;
  readonly onToggleLights: () => void;
}

/**
 * Barra fija de la inmersión: filtros Académica / Laboral y el interruptor "Encender
 * luces" (aria-pressed), que quita la oscuridad y deja todo a la vista.
 */
export function DiveControls({
  filterLabel,
  options,
  filter,
  onFilter,
  lightsLabel,
  lightsOn,
  onToggleLights,
}: DiveControlsProps) {
  return (
    <div className="dive-controls">
      <TimelineFilter
        label={filterLabel}
        options={options}
        value={filter}
        onChange={onFilter}
      />
      <Button
        variant={lightsOn ? "lime" : "dark"}
        size="sm"
        aria-pressed={lightsOn}
        onClick={onToggleLights}
        data-testid="lights-toggle"
        className="dive-lights"
      >
        <Icon name="lantern" />
        <span className="dive-lights-label">{lightsLabel}</span>
      </Button>
    </div>
  );
}
