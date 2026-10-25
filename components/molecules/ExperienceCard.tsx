import type { CSSProperties, ReactNode } from "react";
import { Tag } from "@/components/atoms/Tag";
import { cn } from "@/lib/utils";
import type { ExperienceEntry } from "@/types/experience";

interface ExperienceCardProps {
  readonly entry: ExperienceEntry;
  readonly kindLabel: string;
  readonly statusLabel: string;
  readonly color: string;
  readonly caught: boolean;
  readonly fishIcon: ReactNode;
}

/** Tarjeta del diario de capturas: se ilumina cuando el pez sale del lago. */
export function ExperienceCard({
  entry,
  kindLabel,
  statusLabel,
  color,
  caught,
  fishIcon,
}: ExperienceCardProps) {
  return (
    <article
      className={cn("xc", caught && "got")}
      style={{ "--c": color } as CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <Tag style={{ color, borderColor: color }}>{entry.periodLabel}</Tag>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[.14em] uppercase opacity-85">
          {statusLabel}
          <span style={{ color, opacity: caught ? 1 : 0.3 }}>{fishIcon}</span>
        </span>
      </div>
      <p
        className="mt-3.5 font-mono text-[11px] tracking-[.2em] uppercase"
        style={{ color }}
      >
        {kindLabel}
      </p>
      <h4 className="font-display mt-1 text-2xl font-extrabold">{entry.title}</h4>
      <p className="mt-0.5 font-semibold opacity-85">{entry.organization}</p>
      <p className="mt-2.5 leading-relaxed opacity-80">{entry.description}</p>
    </article>
  );
}
