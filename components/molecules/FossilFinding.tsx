import type { ExperienceEntry } from "@/types/experience";

interface FossilFindingProps {
  readonly kicker: string;
  readonly emptyText: string;
  /** Experiencia de la última pieza encajada; sin ella se muestra la invitación. */
  readonly entry: ExperienceEntry | null;
  readonly boneLabel: string | null;
  readonly kindLabel: string | null;
  /** Enlace al diario de esa experiencia, que ya está abierto en su página. */
  readonly journalHref?: string | null;
  readonly journalLabel?: string;
}

/** Ficha del hallazgo: cargo, institución y fechas de la última pieza encajada. */
export function FossilFinding({
  kicker,
  emptyText,
  entry,
  boneLabel,
  kindLabel,
  journalHref,
  journalLabel,
}: FossilFindingProps) {
  return (
    <aside className="fossil-finding rounded-3xl p-5" data-testid="fossil-finding">
      <p className="text-fluid-xs experience-kind font-mono tracking-[.2em]">
        {kicker}
        {boneLabel && <span className="opacity-80"> · {boneLabel}</span>}
      </p>
      {entry ? (
        <>
          <p className="text-fluid-xs mt-3 font-mono tracking-[.14em] opacity-85">
            {kindLabel} · {entry.periodLabel}
          </p>
          <p className="font-display text-fluid-xl mt-1 leading-tight font-extrabold">
            {entry.title}
          </p>
          <p className="text-fluid-base mt-1 opacity-85">{entry.organization}</p>
          {journalHref && journalLabel ? (
            <a
              href={journalHref}
              className="text-fluid-sm experience-kind mt-3 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
            >
              {journalLabel} <span aria-hidden="true">↓</span>
            </a>
          ) : null}
        </>
      ) : (
        <p className="text-fluid-sm mt-3 leading-normal opacity-85">{emptyText}</p>
      )}
    </aside>
  );
}
