import { JournalCard } from "@/components/molecules/JournalCard";
import { CreatureBadge } from "@/components/worlds/lake/CreatureBadge";
import { COPY } from "@/data/copy";
import {
  creatureByExperience,
  creatureHint,
  KIND_COLOR,
  KIND_LABEL,
} from "@/lib/fishing/view";
import type { ExperienceEntry } from "@/types/experience";

interface JournalEntryProps {
  readonly entry: ExperienceEntry;
  readonly revealed: boolean;
}

/** Une una entrada de experiencia con la criatura que la guarda. */
export function JournalEntry({ entry, revealed }: JournalEntryProps) {
  const creature = creatureByExperience.get(entry.id);
  return (
    <JournalCard
      entry={entry}
      kindLabel={KIND_LABEL[entry.kind]}
      color={KIND_COLOR[entry.kind]}
      creatureName={creature?.name ?? ""}
      hint={creature ? creatureHint(creature) : ""}
      caught={revealed}
      labels={COPY.experience.journal}
      art={creature ? <CreatureBadge creature={creature.id} /> : null}
    />
  );
}
