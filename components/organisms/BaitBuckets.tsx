import type { CSSProperties } from "react";
import { BaitBucket, type BucketInteraction } from "@/components/molecules/BaitBucket";
import { BUCKET_AREA, LAKE_VIEWBOX, PLANK_Y } from "@/lib/fishing/scene";
import { fill } from "@/lib/fishing/view";
import type { Bait, BaitId } from "@/types/fishing";
import type { LakeAssets } from "@/types/lake";

interface BaitBucketsProps {
  readonly baits: readonly Bait[];
  readonly assets: LakeAssets["buckets"];
  readonly selected: BaitId | null;
  readonly disabled: boolean;
  readonly labels: { readonly group: string; readonly bucket: string };
  /** Eventos de cada balde (clic, teclado y arrastre). */
  readonly interactionFor: (bait: BaitId) => BucketInteraction;
}

const percent = (value: number, total: number) => `${(value / total) * 100}%`;

/** Posición sobre el muelle, derivada de la geometría de la escena. */
const AREA = {
  "--bucket-left": percent(BUCKET_AREA.x, LAKE_VIEWBOX.width),
  "--bucket-width": percent(BUCKET_AREA.width, LAKE_VIEWBOX.width),
  "--bucket-plank": percent(PLANK_Y, LAKE_VIEWBOX.height),
} as CSSProperties;

/** Los tres baldes del muelle, entre el farol y el niño. */
export function BaitBuckets({
  baits,
  assets,
  selected,
  disabled,
  labels,
  interactionFor,
}: BaitBucketsProps) {
  return (
    <div
      role="group"
      aria-label={labels.group}
      className="lake-buckets"
      style={AREA}
      data-testid="bait-buckets"
    >
      {baits.map((bait) => (
        <BaitBucket
          key={bait.id}
          bait={bait.id}
          label={bait.label}
          actionLabel={fill(labels.bucket, { bait: bait.label })}
          asset={assets[bait.id]}
          selected={bait.id === selected}
          disabled={disabled}
          interaction={interactionFor(bait.id)}
        />
      ))}
    </div>
  );
}
