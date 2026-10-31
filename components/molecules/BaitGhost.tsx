import type { Ref } from "react";
import { BaitArt } from "@/components/worlds/art/BaitArt";
import type { Bait } from "@/types/fishing";

interface BaitGhostProps {
  readonly ref?: Ref<HTMLDivElement>;
  readonly baits: readonly Bait[];
}

/**
 * Carnada que sigue al puntero durante el arrastre. Tiene las tres dibujadas y muestra
 * la de data-bait; el hook la mueve y la muestra sin re-render.
 */
export function BaitGhost({ ref, baits }: BaitGhostProps) {
  return (
    <div ref={ref} aria-hidden="true" className="lake-ghost" data-testid="bait-ghost">
      {baits.map((bait) => (
        <span key={bait.id} data-art={bait.id}>
          <BaitArt bait={bait.id} />
        </span>
      ))}
    </div>
  );
}
