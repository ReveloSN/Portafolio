import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  /** De 0 a 1. */
  readonly value: number;
  readonly label: string;
  /** Lectura en palabras para lectores de pantalla (p. ej. "Abismo"). */
  readonly valueText?: string;
  readonly fillClassName?: string;
  /** Marcas o zonas dibujadas sobre la pista. */
  readonly children?: ReactNode;
}

const PERCENT = 100;

export function ProgressBar({
  value,
  label,
  valueText,
  fillClassName,
  children,
}: ProgressBarProps) {
  const percent = Math.round(Math.min(1, Math.max(0, value)) * PERCENT);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={PERCENT}
      aria-valuenow={percent}
      aria-valuetext={valueText}
      className="relative h-3 overflow-hidden rounded-full bg-black/40 ring-1 ring-white/10"
    >
      <i
        className={cn(
          "block h-full w-full origin-left rounded-full bg-[linear-gradient(90deg,#ffc46e,#ff8a4c)]",
          fillClassName,
        )}
        style={{ transform: `scaleX(${percent / PERCENT})` }}
      />
      {children}
    </div>
  );
}
