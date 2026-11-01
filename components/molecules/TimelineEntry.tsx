import type { CSSProperties } from "react";
import type { ExperienceEntry } from "@/types/experience";

interface TimelineEntryProps {
  readonly entry: ExperienceEntry;
  readonly kindLabel: string;
  readonly color: string;
  readonly achievementsLabel: string;
}

/** Una entrada de la bitácora: fechas, tipo, cargo, institución o empresa y logros. */
export function TimelineEntry({
  entry,
  kindLabel,
  color,
  achievementsLabel,
}: TimelineEntryProps) {
  return (
    <article
      className="timeline-entry"
      data-testid={`timeline-${entry.id}`}
      style={{ "--kind": color } as CSSProperties}
    >
      <p className="timeline-meta">
        <span>{entry.periodLabel}</span>
        <span className="timeline-kind">{kindLabel}</span>
      </p>
      <h4 className="timeline-title">{entry.title}</h4>
      <p className="timeline-org">{entry.organization}</p>
      <p className="timeline-label">{achievementsLabel}</p>
      <ul className="timeline-achievements">
        {entry.achievements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
