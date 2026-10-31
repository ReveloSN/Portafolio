import Image from "next/image";
import type { HTMLAttributes } from "react";
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
      <Image
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt=""
        aria-hidden="true"
        draggable={false}
        sizes="96px"
        className="lake-bucket-art"
      />
      <span className="lake-bucket-label">{label}</span>
    </button>
  );
}
