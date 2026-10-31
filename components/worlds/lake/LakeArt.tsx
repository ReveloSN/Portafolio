import type { LakeAsset } from "@/types/lake";

export interface ArtBox {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

interface LakeArtProps {
  readonly asset: LakeAsset;
  readonly box: ArtBox;
}

/** Una pieza pintada dentro del SVG de juego, ajustada a su caja sin deformarse. */
export function LakeArt({ asset, box }: LakeArtProps) {
  return (
    <image
      href={asset.src}
      x={box.x}
      y={box.y}
      width={box.w}
      height={box.h}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}
