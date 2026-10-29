import { cn } from "@/lib/utils";

interface BarcodeProps {
  readonly className?: string;
}

/** Posición y grosor de cada barra en el viewBox de 76 × 34. */
const BARCODE_BARS = [
  [0, 3],
  [6, 1.5],
  [11, 4],
  [19, 2],
  [25, 1.5],
  [30, 4],
  [38, 2],
  [44, 3],
  [51, 1.5],
  [56, 4],
  [64, 2],
  [70, 3],
] as const;

/** Código de barras decorativo de la credencial. */
export function Barcode({ className }: BarcodeProps) {
  return (
    <svg viewBox="0 0 76 34" aria-hidden="true" className={cn("block h-auto", className)}>
      <g fill="currentColor">
        {BARCODE_BARS.map(([x, w]) => (
          <rect key={x} x={x} width={w} height="34" />
        ))}
      </g>
    </svg>
  );
}
