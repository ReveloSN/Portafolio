import Image from "next/image";
import type { Ref } from "react";
import type { Bait, BaitId } from "@/types/fishing";
import type { LakeAsset } from "@/types/lake";

interface BaitGhostProps {
  readonly ref?: Ref<HTMLDivElement>;
  readonly baits: readonly Bait[];
  readonly art: Readonly<Record<BaitId, LakeAsset>>;
}

/**
 * Carnada que sigue al puntero durante el arrastre. Tiene las tres pintadas y muestra la
 * de data-bait; el hook la mueve y la muestra sin re-render.
 */
export function BaitGhost({ ref, baits, art }: BaitGhostProps) {
  return (
    <div ref={ref} aria-hidden="true" className="lake-ghost" data-testid="bait-ghost">
      {baits.map((bait) => {
        const asset = art[bait.id];
        return (
          <span key={bait.id} data-art={bait.id}>
            <Image
              src={asset.src}
              width={asset.width}
              height={asset.height}
              alt=""
              draggable={false}
              sizes="80px"
            />
          </span>
        );
      })}
    </div>
  );
}
