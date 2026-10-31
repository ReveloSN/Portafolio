import { LakeArt } from "@/components/worlds/lake/LakeArt";
import { LAKE_ASSETS } from "@/data/lakeAssets";
import type { CreatureId } from "@/types/fishing";

interface CreatureBadgeProps {
  readonly creature: CreatureId;
}

const BOX = { x: 0, y: 0, w: 120, h: 64 } as const;

/** Miniatura de la criatura para las tarjetas del diario. */
export function CreatureBadge({ creature }: CreatureBadgeProps) {
  return (
    <svg viewBox={`0 0 ${BOX.w} ${BOX.h}`} width="100%" aria-hidden="true">
      <LakeArt asset={LAKE_ASSETS.creatures[creature]} box={BOX} />
    </svg>
  );
}
