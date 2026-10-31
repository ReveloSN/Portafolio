import { LakeArt } from "@/components/worlds/lake/LakeArt";
import { CANOE_BOX } from "@/lib/fishing/scene";
import type { LakeAsset } from "@/types/lake";

interface CanoeReturnProps {
  readonly asset: LakeAsset;
}

/** Final: el explorador regresa en su canoa y se detiene frente al muelle. */
export function CanoeReturn({ asset }: CanoeReturnProps) {
  const { x, y, size } = CANOE_BOX;
  return (
    <g className="lake-canoe" data-testid="canoe-return">
      <g className="lake-canoe-bob">
        <LakeArt asset={asset} box={{ x, y, w: size, h: size }} />
      </g>
    </g>
  );
}
