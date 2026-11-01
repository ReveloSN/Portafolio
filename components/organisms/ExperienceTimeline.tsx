"use client";

import { useState } from "react";
import { TimelineEntry } from "@/components/molecules/TimelineEntry";
import {
  TimelineFilter,
  type TimelineFilterOption,
} from "@/components/molecules/TimelineFilter";
import { COPY } from "@/data/copy";
import {
  countLabel,
  filterExperience,
  KIND_COLOR,
  type ExperienceFilter,
} from "@/lib/experience";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";

interface ExperienceTimelineProps {
  /** Ya ordenadas de la más reciente a la más antigua. */
  readonly entries: readonly ExperienceEntry[];
}

const { experience: copy } = COPY;

const KIND_LABEL: Readonly<Record<ExperienceKind, string>> = {
  academic: copy.academic,
  work: copy.work,
};

const OPTIONS: readonly TimelineFilterOption[] = [
  { value: "all", label: copy.all },
  { value: "academic", label: copy.academic, icon: "cap", color: KIND_COLOR.academic },
  { value: "work", label: copy.work, icon: "briefcase", color: KIND_COLOR.work },
];

/**
 * Bitácora de experiencia en una hoja de papel: todas las entradas legibles, filtrables
 * por tipo (Académica / Laboral) y con el número de resultados anunciado al filtrar.
 */
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const [filter, setFilter] = useState<ExperienceFilter>("all");
  const visible = filterExperience(entries, filter);
  const { timeline } = copy;

  return (
    <div className="timeline-sheet" data-testid="experience-timeline">
      <h3 className="timeline-heading">{timeline.title}</h3>
      <TimelineFilter
        label={copy.filterLabel}
        options={OPTIONS}
        value={filter}
        onChange={setFilter}
      />
      <p className="sr-only" aria-live="polite">
        {countLabel(timeline.showing, visible.length, entries.length)}
      </p>
      <ol className="timeline-list">
        {visible.map((entry) => (
          <li key={entry.id}>
            <TimelineEntry
              entry={entry}
              kindLabel={KIND_LABEL[entry.kind]}
              color={KIND_COLOR[entry.kind]}
              achievementsLabel={timeline.achievements}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
