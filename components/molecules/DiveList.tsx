import type { Ref } from "react";
import { DiveCard } from "@/components/molecules/DiveCard";
import { RevealGroup } from "@/components/molecules/RevealGroup";
import type { PlacedEntry } from "@/lib/abyss/depth";
import type { ExperienceKind } from "@/types/experience";

interface DiveListProps {
  readonly placed: readonly PlacedEntry[];
  readonly kindLabels: Readonly<Record<ExperienceKind, string>>;
  readonly kindColors: Readonly<Record<ExperienceKind, string>>;
  readonly achievementsLabel: string;
  /** useDepthProgress marca la placa activa en los <li> de esta lista. */
  readonly ref?: Ref<HTMLOListElement>;
}

/**
 * Lista ordenada de placas, una por tramo de la inmersión. Cada <li> entra con la curva
 * escalonada del sitio al llegar a la pantalla.
 */
export function DiveList({
  placed,
  kindLabels,
  kindColors,
  achievementsLabel,
  ref,
}: DiveListProps) {
  return (
    <ol ref={ref} className="dive-list" data-testid="dive-list">
      {placed.map((item) => (
        <RevealGroup as="li" key={item.entry.id} className="dive-slot">
          <DiveCard
            placed={item}
            kindLabel={kindLabels[item.entry.kind]}
            color={kindColors[item.entry.kind]}
            achievementsLabel={achievementsLabel}
          />
        </RevealGroup>
      ))}
    </ol>
  );
}
