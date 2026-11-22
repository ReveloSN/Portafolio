interface ProjectTechNoteProps {
  readonly id: string;
  /** "Kotlin en LOST"; sin tecnología elegida la ficha queda vacía (pero presente). */
  readonly title: string | null;
  readonly note?: string;
  readonly closeLabel: string;
  readonly onClose: () => void;
}

/** Ficha bajo el rastro: qué hizo la tecnología elegida en este proyecto. */
export function ProjectTechNote({
  id,
  title,
  note,
  closeLabel,
  onClose,
}: ProjectTechNoteProps) {
  return (
    <div
      id={id}
      aria-live="polite"
      className="mx-auto mt-[calc(var(--u)*1.4)] max-w-[62ch]"
    >
      {title && note ? (
        <div className="rounded-2xl border border-white/20 bg-black/25 p-5 text-left">
          <div className="flex items-start justify-between gap-4">
            <p className="font-display text-fluid-base font-bold">{title}</p>
            <button
              type="button"
              onClick={onClose}
              className="text-fluid-xs -mt-2 -mr-2 min-h-11 cursor-pointer px-2 underline underline-offset-4 opacity-80 hover:opacity-100"
            >
              {closeLabel}
            </button>
          </div>
          <p className="text-fluid-sm mt-2 leading-[1.6] opacity-90">{note}</p>
        </div>
      ) : null}
    </div>
  );
}
