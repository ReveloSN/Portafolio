import type { HTMLAttributes } from "react";
import { LakeArt } from "@/components/worlds/lake/LakeArt";
import type { BaitId } from "@/types/fishing";
import type { LakeAsset } from "@/types/lake";

/** Eventos de puntero y teclado que conecta el arrastre. */
export type BucketInteraction = Pick<
  HTMLAttributes<HTMLButtonElement>,
  "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel" | "onClick"
>;

interface BaitBucketProps {
  readonly bait: BaitId;
  readonly label: string;
  /** Nombre accesible: "Tomar carnada: Lombriz". */
  readonly actionLabel: string;
  readonly asset: LakeAsset;
  readonly selected: boolean;
  /** Durante la espera o la pelea no se toca: sigue enfocable (aria-disabled). */
  readonly disabled: boolean;
  readonly interaction: BucketInteraction;
}

const ART_BOX = { x: 0, y: 0, w: 64, h: 72 } as const;

/** Un balde de carnada: botón real con el dibujo y su nombre siempre visible. */
export function BaitBucket({
  bait,
  label,
  actionLabel,
  asset,
  selected,
  disabled,
  interaction,
}: BaitBucketProps) {
  return (
    <button
      type="button"
      className="lake-bucket"
      aria-label={actionLabel}
      aria-pressed={selected}
      aria-disabled={disabled || undefined}
      data-bucket={bait}
      data-testid={`bucket-${bait}`}
      {...(disabled ? {} : interaction)}
    >
      <svg
        className="lake-bucket-art"
        viewBox={`0 0 ${ART_BOX.w} ${ART_BOX.h}`}
        aria-hidden="true"
      >
        <LakeArt asset={asset} box={ART_BOX} />
      </svg>
      <span className="lake-bucket-label">{label}</span>
    </button>
  );
}
