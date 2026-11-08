import { Glyph } from "@/components/atoms/Glyph";
import { KIND_SEAL } from "@/data/journal";
import type { ExperienceEntry } from "@/types/experience";

interface JournalEntryProps {
  readonly entry: ExperienceEntry;
  readonly achievementsLabel: string;
  /** Tipo escrito antes de la fecha; se omite cuando el libro ya lo dice en su título. */
  readonly kindLabel?: string;
  /** Hueso del fósil que guarda esta experiencia, ya redactado ("Fragmento del fósil: …"). */
  readonly fragment?: string;
}

/** Una entrada del diario: fecha y sello de tinta, cargo, institución, hueso y logros. */
export function JournalEntry({
  entry,
  achievementsLabel,
  kindLabel,
  fragment,
}: JournalEntryProps) {
  return (
    <div className="journal-entry">
      <div className="journal-meta">
        <p>
          {kindLabel ? (
            <>
              <span className="journal-kind">{kindLabel}</span>
              <span aria-hidden="true"> · </span>
            </>
          ) : null}
          {entry.periodLabel}
        </p>
        <Glyph kind={KIND_SEAL[entry.kind]} className="journal-seal" />
      </div>
      <h4 className="journal-title">{entry.title}</h4>
      <p className="journal-org">{entry.organization}</p>
      {fragment ? (
        <p className="journal-fragment">
          <Glyph kind="bone" className="journal-fragment-glyph" />
          {fragment}
        </p>
      ) : null}
      <p className="sr-only">{achievementsLabel}</p>
      <ul className="journal-achievements">
        {entry.achievements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
