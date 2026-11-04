import type { ExperienceEntry, ExperienceKind } from "@/types/experience";

interface ExperienceListProps {
  readonly entries: readonly ExperienceEntry[];
  readonly kindLabels: Readonly<Record<ExperienceKind, string>>;
  readonly achievementsLabel: string;
}

/** La experiencia en texto normal: el resultado del fósil y la alternativa sin JS. */
export function ExperienceList({
  entries,
  kindLabels,
  achievementsLabel,
}: ExperienceListProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-2" data-testid="experience-list">
      {entries.map((entry) => (
        <li key={entry.id} className="experience-entry rounded-2xl p-5">
          <p className="text-fluid-xs font-mono tracking-[.16em]">
            <span className="experience-kind">{kindLabels[entry.kind]}</span>
            <span aria-hidden="true"> · </span>
            {entry.periodLabel}
          </p>
          <h3 className="font-display text-fluid-lg mt-1.5 leading-tight font-extrabold">
            {entry.title}
          </h3>
          <p className="text-fluid-sm mt-0.5 opacity-85">{entry.organization}</p>
          <p className="sr-only">{achievementsLabel}</p>
          <ul className="text-fluid-sm mt-3 flex list-disc flex-col gap-1.5 pl-5 leading-normal">
            {entry.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
