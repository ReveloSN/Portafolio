import { Button } from "@/components/atoms/Button";

interface DigToolbarProps {
  readonly groupLabel: string;
  readonly label: string;
  readonly found: number;
  readonly total: number;
  readonly message: string;
  readonly digAllLabel: string;
  readonly coverLabel: string;
  /** Todo está excavado: "Excavar todo" no tiene efecto. */
  readonly digAllDisabled: boolean;
  /** Nada está excavado: "Cubrir" no tiene efecto. */
  readonly coverDisabled: boolean;
  readonly onDigAll: () => void;
  readonly onCover: () => void;
}

/** Con aria-disabled el botón conserva el foco; `disabled` lo perdería. */
const INERT =
  "min-h-11 aria-disabled:cursor-default aria-disabled:opacity-55 aria-disabled:hover:translate-y-0";

/**
 * Marcador de hallazgos y controles globales del sitio de excavación.
 * El anuncio para lectores de pantalla vive aparte (región `status` de Skills).
 */
export function DigToolbar({
  groupLabel,
  label,
  found,
  total,
  message,
  digAllLabel,
  coverLabel,
  digAllDisabled,
  coverDisabled,
  onDigAll,
  onCover,
}: DigToolbarProps) {
  return (
    <div
      role="group"
      aria-label={groupLabel}
      className="mb-fluid-4 flex flex-wrap items-center gap-3.5 rounded-[18px] border border-[rgba(255,196,110,.25)] bg-[rgba(20,10,4,.55)] px-5 py-3.5"
    >
      <div className="min-w-[220px] flex-1">
        <p className="text-fluid-xs font-mono tracking-[.22em] opacity-80">
          {label} {found} / {total}
        </p>
        <p className="mt-1 font-semibold">{message}</p>
      </div>
      <Button
        size="sm"
        className={INERT}
        aria-disabled={digAllDisabled || undefined}
        onClick={digAllDisabled ? undefined : onDigAll}
      >
        {digAllLabel}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className={INERT}
        aria-disabled={coverDisabled || undefined}
        onClick={coverDisabled ? undefined : onCover}
      >
        {coverLabel}
      </Button>
    </div>
  );
}
