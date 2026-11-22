"use client";

import { useEffect } from "react";
import { Icon } from "@/components/atoms/Icon";
import { JournalLeaf } from "@/components/molecules/JournalLeaf";
import { useExperienceLink } from "@/hooks/useExperienceLink";
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
  /** "Fragmento del fósil: {bone}". */
  readonly fragment: string;
}

interface JournalBookProps {
  readonly id: string;
  readonly title: string;
  /** De la más reciente a la más antigua: la primera página es la más reciente. */
  readonly entries: readonly ExperienceEntry[];
  /** Hueso del fósil de cada experiencia, por id. */
  readonly bones: Readonly<Record<string, string>>;
  readonly labels: JournalBookLabels;
}

/**
 * Un diario de papel antiguo con una experiencia por hoja. Todas las hojas se apilan en
 * la misma celda: el libro mide su hoja más alta y no salta. Pasar de página gira la hoja
 * entera sobre el lomo; los botones quedan fuera del papel y conservan el foco. Al encajar
 * un hueso del fósil, su diario abre esa página.
 */
export function JournalBook({ id, title, entries, bones, labels }: JournalBookProps) {
  const pager = usePager(entries.length);
  const link = useExperienceLink();
  const requested = link?.request;
  const { goTo } = pager;

  useEffect(() => {
    if (!requested) return;
    const index = entries.findIndex((entry) => entry.id === requested.id);
    if (index >= 0) goTo(index);
    // Solo reacciona a un pedido nuevo del fósil (`seq`), no a cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requested?.seq]);

  return (
    <article id={id} className="journal-book" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="sr-only">
        {title}
      </h3>
      <ol
        className="journal-pages"
        data-dir={pager.direction ?? undefined}
        data-testid="experience-list"
      >
        {entries.map((entry, i) => {
          const bone = bones[entry.id];
          return (
            <JournalLeaf
              key={entry.id}
              title={title}
              entry={entry}
              achievementsLabel={labels.achievements}
              fragment={bone ? labels.fragment.replace("{bone}", bone) : undefined}
              folio={pageLabel(labels.pageOf, i, entries.length)}
              active={i === pager.index}
              leaving={i === pager.previous}
            />
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
        <p className="sr-only" aria-live="polite">
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
