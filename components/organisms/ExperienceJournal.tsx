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

/** Diario de experiencia: siempre visible y legible sin jugar, filtrable por tipo. */
export function ExperienceJournal({ entries, isRevealed }: ExperienceJournalProps) {
  const [filter, setFilter] = useState<JournalFilterValue>("all");
  const visible = useMemo(
    () => (filter === "all" ? entries : entries.filter((entry) => entry.kind === filter)),
    [entries, filter],
  );

  return (
    <div className="mt-14" data-testid="experience-journal">
      <h3 className="font-display text-fluid-2xl mb-2 text-center font-extrabold">
        {copy.journal.title}
      </h3>
      <p className="mb-fluid-3 mx-auto max-w-[calc(var(--u)*40)] text-center opacity-75">
        {copy.journal.intro}
      </p>
      <JournalFilter
        label={copy.filterLabel}
        options={OPTIONS}
        value={filter}
        onChange={setFilter}
      />
      <ul className="gap-fluid-3 mt-fluid-3 grid md:grid-cols-2">
        {visible.map((entry) => (
          <li key={entry.id} className="flex min-w-0">
            <JournalEntry entry={entry} revealed={isRevealed(entry)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
