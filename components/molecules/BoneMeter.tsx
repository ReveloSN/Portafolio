import type { CSSProperties } from "react";
import { Illustration } from "@/components/atoms/Illustration";
import type { ArtEntry } from "@/types/art";

interface BoneMeterProps {
  readonly bone: ArtEntry;
  readonly percent: number;
  readonly label: string;
}

/**
 * Barra de nivel en forma de hueso: el hueso completo a baja opacidad y, encima,
 * el mismo hueso revelado de izquierda a derecha hasta el porcentaje.
 */
export function BoneMeter({ bone, percent, label }: BoneMeterProps) {
  const common = {
    decorative: true as const,
    src: bone.src,
    width: bone.width,
    height: bone.height,
    sizes: "120px",
  };
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="bone-meter relative w-[max(5.5rem,calc(var(--u)*7.5))] flex-none"
      style={{ "--bone-fill": `${100 - percent}%` } as CSSProperties}
    >
      <Illustration {...common} className="opacity-25" />
      <Illustration {...common} className="bone-fill absolute inset-0" />
    </div>
  );
}
