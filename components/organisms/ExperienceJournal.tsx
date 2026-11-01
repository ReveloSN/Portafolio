"use client";

import { useMemo, useState } from "react";
import {
  JournalFilter,
  type JournalFilterOption,
  type JournalFilterValue,
} from "@/components/molecules/JournalFilter";
import { JournalEntry } from "@/components/organisms/JournalEntry";
import { COPY } from "@/data/copy";
import { KIND_COLOR } from "@/lib/fishing/view";
import type { ExperienceEntry } from "@/types/experience";

interface ExperienceJournalProps {
  readonly entries: readonly ExperienceEntry[];
  readonly isRevealed: (entry: ExperienceEntry) => boolean;
}

const { experience: copy } = COPY;

const OPTIONS: readonly JournalFilterOption[] = [
  { value: "all", label: copy.all },
  { value: "academic", label: copy.academic, icon: "cap", color: KIND_COLOR.academic },
  { value: "work", label: copy.work, icon: "briefcase", color: KIND_COLOR.work },
];

/** Diario de experiencia en una hoja de papel: legible sin jugar y filtrable por tipo. */
export function ExperienceJournal({ entries, isRevealed }: ExperienceJournalProps) {
  const [filter, setFilter] = useState<JournalFilterValue>("all");
  const visible = useMemo(
    () => (filter === "all" ? entries : entries.filter((entry) => entry.kind === filter)),
    [entries, filter],
  );

  return (
    <div className="journal-sheet" data-testid="experience-journal">
      <h3 className="journal-heading">{copy.journal.title}</h3>
      <p className="journal-intro">{copy.journal.intro}</p>
      <JournalFilter
        label={copy.filterLabel}
        options={OPTIONS}
        value={filter}
        onChange={setFilter}
      />
      <ul className="journal-list">
        {visible.map((entry) => (
          <li key={entry.id}>
            <JournalEntry entry={entry} revealed={isRevealed(entry)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
