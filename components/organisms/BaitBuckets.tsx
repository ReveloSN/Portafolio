import type { CSSProperties } from "react";
import { BaitBucket, type BucketInteraction } from "@/components/molecules/BaitBucket";
import { BUCKETS } from "@/lib/fishing/scene";
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

/** Tramo táctil sobre el muelle, derivado de la geometría de la escena (en %). */
const AREA = {
  "--bucket-left": `${BUCKETS.hitLeft}%`,
  "--bucket-width": `${BUCKETS.hitRight - BUCKETS.hitLeft}%`,
  "--bucket-plank": `${BUCKETS.deckY}%`,
  "--bucket-art": `${BUCKETS.artWidth}cqw`,
} as CSSProperties;

/** Los tres baldes del muelle, entre el follaje y el niño. */
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
