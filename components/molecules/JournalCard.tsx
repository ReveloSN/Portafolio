import type { CSSProperties, ReactNode } from "react";
import { Tag } from "@/components/atoms/Tag";
import type { ExperienceEntry } from "@/types/experience";

export interface JournalCardLabels {
  readonly caught: string;
  readonly pending: string;
  readonly hint: string;
  readonly caughtBy: string;
  readonly achievements: string;
  readonly hidden: string;
}

interface JournalCardProps {
  readonly entry: ExperienceEntry;
  readonly kindLabel: string;
  readonly color: string;
  readonly creatureName: string;
  readonly hint: string;
  readonly caught: boolean;
  readonly labels: JournalCardLabels;
  readonly art: ReactNode;
}

const KICKER = "text-fluid-xs font-mono tracking-[.2em] uppercase";

/** Datos que se leen en las dos caras: fechas, cargo e institución. */
function Basics({
  entry,
  kindLabel,
  color,
  status,
}: {
  readonly entry: ExperienceEntry;
  readonly kindLabel: string;
  readonly color: string;
  readonly status: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <Tag style={{ color, borderColor: color }}>{entry.periodLabel}</Tag>
        <span className={`${KICKER} opacity-80`}>{status}</span>
      </div>
      <p className={`${KICKER} mt-3.5`} style={{ color }}>
        {kindLabel}
      </p>
      <h4 className="font-display text-fluid-lg mt-1 font-extrabold">{entry.title}</h4>
      <p className="mt-0.5 font-semibold opacity-85">{entry.organization}</p>
    </>
  );
}

/**
 * Entrada del diario. Por pescar muestra lo básico y una pista; al capturarla se voltea
 * y revela los logros. La cara oculta queda fuera del árbol accesible (inert).
 */
export function JournalCard(props: JournalCardProps) {
  const { entry, creatureName, hint, caught, labels, art } = props;
  return (
    <article
      className="jcard"
      data-flipped={caught || undefined}
      data-testid={`journal-${entry.id}`}
      style={{ "--c": props.color } as CSSProperties}
    >
      <div className="jcard-inner">
        <div
          className="jcard-face jcard-front"
          aria-hidden={caught || undefined}
          inert={caught}
        >
          <Basics {...props} status={labels.pending} />
          <p className="text-fluid-sm mt-3 opacity-75">
            <b className="font-semibold">{labels.hint}:</b> {hint}
          </p>
          <p className="text-fluid-sm mt-1 italic opacity-60">{labels.hidden}</p>
        </div>
        <div
          className="jcard-face jcard-back"
          aria-hidden={!caught || undefined}
          inert={!caught}
        >
          <Basics {...props} status={labels.caught} />
          <p className="text-fluid-sm mt-3 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex w-12"
              style={{ color: props.color }}
            >
              {art}
            </span>
            <span>
              <b className="font-semibold">{labels.caughtBy}:</b> {creatureName}
            </span>
          </p>
          <p className={`${KICKER} mt-3 opacity-70`}>{labels.achievements}</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 leading-relaxed opacity-90">
            {entry.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
