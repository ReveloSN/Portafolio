import { Glyph } from "@/components/atoms/Glyph";
import { KIND_SEAL } from "@/data/journal";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";

interface ExperienceListProps {
  readonly entries: readonly ExperienceEntry[];
  readonly kindLabels: Readonly<Record<ExperienceKind, string>>;
  readonly achievementsLabel: string;
  /** Dentro de un capítulo del diario el tipo ya está en el título: solo queda la fecha. */
  readonly showKind?: boolean;
}

/**
 * La experiencia en texto: entradas del diario de la expedición, con su sello de tinta.
 * También es la alternativa del fósil mientras carga y sin JavaScript.
 */
export function ExperienceList({
  entries,
  kindLabels,
  achievementsLabel,
  showKind = true,
}: ExperienceListProps) {
  return (
    <ol className="journal-list" data-testid="experience-list">
      {entries.map((entry) => (
        <li key={entry.id} className="journal-entry">
          <div className="journal-meta">
            <p>
              {showKind ? (
                <>
                  <span className="journal-kind">{kindLabels[entry.kind]}</span>
                  <span aria-hidden="true"> · </span>
                </>
              ) : null}
              {entry.periodLabel}
            </p>
            <Glyph kind={KIND_SEAL[entry.kind]} className="journal-seal" />
          </div>
          <h4 className="journal-title">{entry.title}</h4>
          <p className="journal-org">{entry.organization}</p>
          <p className="sr-only">{achievementsLabel}</p>
          <ul className="journal-achievements">
            {entry.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
