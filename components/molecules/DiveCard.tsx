import type { CSSProperties } from "react";
import { formatDepth, type PlacedEntry } from "@/lib/abyss/depth";

interface DiveCardProps {
  readonly placed: PlacedEntry;
  readonly kindLabel: string;
  readonly color: string;
  readonly achievementsLabel: string;
}

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Placa luminosa de una experiencia: periodo, tipo, profundidad, cargo, institución o
 * empresa y logros. Lo esencial se lee siempre; los logros se encienden cuando la linterna
 * la alcanza, al enfocarla, si es la activa o con las luces encendidas. Enfocable: con
 * Tab se recorren las placas y la linterna va a la enfocada.
 */
export function DiveCard({ placed, kindLabel, color, achievementsLabel }: DiveCardProps) {
  const { entry, meters } = placed;
  const titleId = `dive-${entry.id}-title`;
  return (
    <article
      className="dive-card"
      tabIndex={0}
      aria-labelledby={titleId}
      data-testid={`dive-card-${entry.id}`}
      style={{ "--kind": color } as CSSProperties}
    >
      <p className="dive-card-meta stagger-item" style={order(0)}>
        <time dateTime={String(entry.startYear)}>{entry.periodLabel}</time>
        <span className="dive-card-kind">{kindLabel}</span>
        <span className="dive-card-depth">{formatDepth(meters)}</span>
      </p>
      <h3 id={titleId} className="dive-card-title stagger-item" style={order(1)}>
        {entry.title}
      </h3>
      <p className="dive-card-org stagger-item" style={order(2)}>
        {entry.organization}
      </p>
      <div className="dive-card-log stagger-item" style={order(3)}>
        <p className="dive-card-label">{achievementsLabel}</p>
        <ul className="dive-card-achievements">
          {entry.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
