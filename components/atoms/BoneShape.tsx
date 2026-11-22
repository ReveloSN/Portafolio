import { BONE_ART_PX } from "@/lib/constants";
import { optimizedSrc } from "@/lib/imageUrl";
import type { BoneShape as BoneShapeData } from "@/types/puzzle";

interface BoneArtProps {
  readonly shape: BoneShapeData;
  /** `false` mientras está lejos de la pantalla: la ilustración aún no se pide. */
  readonly showArt: boolean;
}

/** La ilustración de un hueso, recortada a su caja: la misma en la pieza y en su hueco. */
export function BoneArt({ shape, showArt }: BoneArtProps) {
  if (!shape.image) return null;
  return (
    <image
      href={showArt ? optimizedSrc(shape.image, BONE_ART_PX) : undefined}
      x={-(shape.imageOffset?.x ?? 0)}
      y={-(shape.imageOffset?.y ?? 0)}
      width={shape.imageSize?.width ?? shape.size.width}
      height={shape.imageSize?.height ?? shape.size.height}
      preserveAspectRatio="none"
    />
  );
}

interface BoneShapeProps extends BoneArtProps {
  readonly className?: string;
}

/** Silueta de un hueso del fósil, dibujada en su propia caja; decorativa. */
export function BoneShape({ shape, className, showArt }: BoneShapeProps) {
  const { width, height } = shape.size;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {shape.image ? (
        <BoneArt shape={shape} showArt={showArt} />
      ) : (
        <path d={shape.path} fillRule="evenodd" />
      )}
    </svg>
  );
}
