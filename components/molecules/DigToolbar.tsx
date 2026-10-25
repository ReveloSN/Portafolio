import { Button } from "@/components/atoms/Button";

interface DigToolbarProps {
  readonly label: string;
  readonly found: number;
  readonly total: number;
  readonly message: string;
  readonly digAllLabel: string;
  readonly coverLabel: string;
  readonly onDigAll: () => void;
  readonly onCover: () => void;
}

/** Marcador de hallazgos y controles globales del sitio de excavación. */
export function DigToolbar({
  label,
  found,
  total,
  message,
  digAllLabel,
  coverLabel,
  onDigAll,
  onCover,
}: DigToolbarProps) {
  return (
    <div className="mb-[34px] flex flex-wrap items-center gap-3.5 rounded-[18px] border border-[rgba(255,196,110,.25)] bg-[rgba(20,10,4,.55)] px-5 py-3.5">
      <div aria-live="polite" className="min-w-[220px] flex-1">
        <p className="font-mono text-xs tracking-[.22em] opacity-70">
          {label} {found} / {total}
        </p>
        <p className="mt-1 font-semibold">{message}</p>
      </div>
      <Button size="sm" onClick={onDigAll}>
        {digAllLabel}
      </Button>
      <Button size="sm" variant="ghost" onClick={onCover}>
        {coverLabel}
      </Button>
    </div>
  );
}
