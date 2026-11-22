import { GlyphBand } from "@/components/molecules/GlyphBand";
import { JournalEntry } from "@/components/molecules/JournalEntry";
import type { ExperienceEntry } from "@/types/experience";

interface JournalLeafProps {
  readonly title: string;
  readonly entry: ExperienceEntry;
  readonly achievementsLabel: string;
  readonly fragment?: string;
  /** "Página n de total", impreso al pie. */
  readonly folio: string;
  readonly active: boolean;
  readonly leaving: boolean;
}

/**
 * Una hoja completa del diario: papel, franja, título, experiencia y número de página, para
 * que todo gire junto. El título y el número se repiten en cada hoja, así que van ocultos
 * al lector de pantalla: el libro ya los anuncia una sola vez.
 */
export function JournalLeaf({
  title,
  entry,
  achievementsLabel,
  fragment,
  folio,
  active,
  leaving,
}: JournalLeafProps) {
  return (
    <li
      className="journal-sheet journal-page"
      data-active={active || undefined}
      data-leaving={leaving || undefined}
      inert={!active}
      aria-hidden={!active}
    >
      <GlyphBand />
      <p className="journal-heading" aria-hidden="true">
        {title}
      </p>
      <JournalEntry
        entry={entry}
        achievementsLabel={achievementsLabel}
        fragment={fragment}
      />
      <p className="journal-folio" aria-hidden="true">
        {folio}
      </p>
    </li>
  );
}
