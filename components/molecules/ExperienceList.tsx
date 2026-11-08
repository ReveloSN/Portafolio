import { JournalEntry } from "@/components/molecules/JournalEntry";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";

interface ExperienceListProps {
  readonly entries: readonly ExperienceEntry[];
  readonly kindLabels: Readonly<Record<ExperienceKind, string>>;
  readonly achievementsLabel: string;
}

/**
 * La experiencia completa en texto, con el tipo de cada entrada: la alternativa del
 * fósil mientras carga y sin JavaScript (los libros paginados necesitan JS).
 */
export function ExperienceList({
  entries,
  kindLabels,
  achievementsLabel,
}: ExperienceListProps) {
  return (
    <ol className="journal-list">
      {entries.map((entry) => (
        <li key={entry.id}>
          <JournalEntry
            entry={entry}
            achievementsLabel={achievementsLabel}
            kindLabel={kindLabels[entry.kind]}
          />
        </li>
      ))}
    </ol>
  );
}
