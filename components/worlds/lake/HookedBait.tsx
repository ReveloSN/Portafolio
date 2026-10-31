import { BAIT_WIDTH, widthUnits } from "@/lib/fishing/scene";
import type { LakeAsset } from "@/types/lake";

interface HookedBaitProps {
  readonly bait: LakeAsset;
  /** Altura del anzuelo dentro del grupo de la boya. */
  readonly y: number;
}

const baitW = widthUnits(BAIT_WIDTH);

/** La carnada pintada colgando del anzuelo, lista para lanzar. */
export function HookedBait({ bait, y }: HookedBaitProps) {
  const height = (baitW * bait.height) / bait.width;
  return (
    <image
      href={bait.src}
      x={-baitW / 2}
      y={y + height * 0.2}
      width={baitW}
      height={height}
      data-testid="hooked-bait"
    />
  );
}
