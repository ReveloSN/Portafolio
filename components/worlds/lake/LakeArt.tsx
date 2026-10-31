import type { ReactNode } from "react";
import { BucketArt } from "@/components/worlds/art/BucketArt";
import { FishIcon } from "@/components/worlds/art/FishIcon";
import { Megalodon } from "@/components/worlds/art/Megalodon";
import { Mosasaur } from "@/components/worlds/art/Mosasaur";
import type { LakeAsset, LakeSvgArt } from "@/types/lake";

export interface ArtBox {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

type SvgRenderer = (box: ArtBox, tint?: string) => ReactNode;

const toSize = (box: ArtBox) => ({ x: box.x, y: box.y, width: box.w, height: box.h });

/** Registro (Factory) de las ilustraciones SVG provisionales. */
const SVG_ART: Readonly<Record<LakeSvgArt, SvgRenderer>> = {
  fish: (box, tint) => (
    <g style={{ color: tint }}>
      <FishIcon x={box.x} y={box.y} width={box.w} height={box.h} />
    </g>
  ),
  mosasaur: (box) => <Mosasaur x={box.x} y={box.y} width={box.w} height={box.h} />,
  megalodon: (box) => <Megalodon x={box.x} y={box.y} width={box.w} height={box.h} />,
  "bucket-worm": (box) => <BucketArt bait="worm" {...toSize(box)} />,
  "bucket-minnow": (box) => <BucketArt bait="minnow" {...toSize(box)} />,
  "bucket-firefly": (box) => <BucketArt bait="firefly" {...toSize(box)} />,
};

interface LakeArtProps {
  readonly asset: LakeAsset;
  readonly box: ArtBox;
}

/** Dibuja una capa de la escena sin saber si es SVG o imagen. */
export function LakeArt({ asset, box }: LakeArtProps) {
  if (asset.kind === "svg") return SVG_ART[asset.art](box, asset.tint);
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
