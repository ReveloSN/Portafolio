import type { CSSProperties, ReactNode } from "react";
import type { ExperienceEntry } from "@/types/experience";

export interface JournalCardLabels {
  readonly caught: string;
  readonly pending: string;
  readonly hint: string;
  readonly caughtBy: string;
  readonly achievements: string;
  readonly hidden: string;
}

interface JournalCardProps {
  readonly entry: ExperienceEntry;
  readonly kindLabel: string;
  readonly color: string;
  readonly creatureName: string;
  readonly hint: string;
  readonly caught: boolean;
  readonly labels: JournalCardLabels;
  readonly art: ReactNode;
}

/** Visto a mano junto a una captura: un trazo de tinta, no un ícono de interfaz. */
function InkCheck() {
  return (
    <svg viewBox="0 0 28 22" width="28" height="22" aria-hidden="true">
      <path
        d="M3 12.5c2.4 1.6 4.3 3.6 6 6.2C12.6 11.4 17.8 6 25 2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Entrada del diario de papel. Por pescar se lee en gris (fechas, cargo, institución y una
 * pista); al capturarla la tinta se aviva, aparece la marca a mano y se leen los logros.
 */
export function JournalCard(props: JournalCardProps) {
  const { entry, kindLabel, creatureName, hint, caught, labels, art } = props;
  return (
    <article
      className="journal-entry"
      data-caught={caught || undefined}
      data-testid={`journal-${entry.id}`}
      style={{ "--kind": props.color } as CSSProperties}
    >
      <p className="journal-meta">
        <span>{entry.periodLabel}</span>
        <span className="journal-kind">{kindLabel}</span>
      </p>
      <h4 className="journal-title">{entry.title}</h4>
      <p className="journal-org">{entry.organization}</p>
      {caught ? (
        <>
          <p className="journal-hand journal-stamp">
            <InkCheck />
            <span>
              {labels.caughtBy}: {creatureName}
            </span>
            <span className="journal-badge">{art}</span>
          </p>
          <p className="sr-only">{labels.caught}</p>
          <p className="journal-label">{labels.achievements}</p>
          <ul className="journal-achievements">
            {entry.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="journal-hand">
            {labels.pending}. {labels.hint}: {hint}
          </p>
          <p className="journal-hidden">{labels.hidden}</p>
        </>
      )}
    </article>
  );
}
