import type { ProjectFacts } from "@/types/project";

/** Orden fijo de la ficha: cuándo, con quién, dónde corre y en qué punto está. */
const FACT_ORDER = [
  "period",
  "team",
  "platform",
  "status",
] as const satisfies readonly (keyof ProjectFacts)[];

interface ProjectFactListProps {
  readonly facts: ProjectFacts;
  readonly labels: Readonly<Record<keyof ProjectFacts, string>>;
}

/** Ficha breve del proyecto como lista de definiciones. */
export function ProjectFactList({ facts, labels }: ProjectFactListProps) {
  return (
    <dl className="mt-6 grid grid-cols-1 gap-3 border-t border-white/18 pt-5 sm:grid-cols-2">
      {FACT_ORDER.map((key) => (
        <div key={key}>
          <dt className="text-fluid-xs font-mono tracking-[.22em] opacity-70">
            {labels[key]}
          </dt>
          <dd className="text-fluid-base mt-1 leading-snug">{facts[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
