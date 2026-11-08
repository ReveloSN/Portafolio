"use client";

import { Icon } from "@/components/atoms/Icon";
import { GlyphBand } from "@/components/molecules/GlyphBand";
import { JournalEntry } from "@/components/molecules/JournalEntry";
import { usePager } from "@/hooks/usePager";
import { pageLabel } from "@/lib/pager";
import type { ExperienceEntry } from "@/types/experience";

interface JournalBookLabels {
  readonly achievements: string;
  readonly prev: string;
  readonly next: string;
  /** "Página {n} de {total}". */
  readonly pageOf: string;
  readonly pager: string;
}

interface JournalBookProps {
  readonly id: string;
  readonly title: string;
  /** De la más reciente a la más antigua: la primera página es la más reciente. */
  readonly entries: readonly ExperienceEntry[];
  readonly labels: JournalBookLabels;
}

/**
 * Un diario de papel antiguo con una experiencia por página. Todas las páginas se apilan
 * en la misma celda: el libro mide lo que su página más alta y no salta al pasar de
 * página. Las ocultas son `inert` (fuera del teclado y de los lectores de pantalla).
 */
export function JournalBook({ id, title, entries, labels }: JournalBookProps) {
  const pager = usePager(entries.length);
  const titleId = `${id}-title`;
  return (
    <article className="journal-sheet journal-book" aria-labelledby={titleId}>
      <GlyphBand />
      <h3 id={titleId} className="journal-heading">
        {title}
      </h3>
      <ol
        className="journal-pages"
        data-dir={pager.direction ?? undefined}
        data-testid="experience-list"
      >
        {entries.map((entry, i) => {
          const active = i === pager.index;
          return (
            <li
              key={entry.id}
              className="journal-page"
              data-active={active || undefined}
              inert={!active}
              aria-hidden={!active}
            >
              <JournalEntry entry={entry} achievementsLabel={labels.achievements} />
            </li>
          );
        })}
      </ol>
      <nav className="journal-pager" aria-label={labels.pager.replace("{title}", title)}>
        <button
          type="button"
          className="journal-turn"
          onClick={pager.prev}
          disabled={!pager.canPrev}
          aria-label={labels.prev}
        >
          <Icon name="chevronLeft" size={20} strokeWidth={2.2} />
        </button>
        <p className="journal-page-count" aria-live="polite">
          {pageLabel(labels.pageOf, pager.index, entries.length)}
        </p>
        <button
          type="button"
          className="journal-turn"
          onClick={pager.next}
          disabled={!pager.canNext}
          aria-label={labels.next}
        >
          <Icon name="chevronRight" size={20} strokeWidth={2.2} />
        </button>
      </nav>
    </article>
  );
}
