import { BONE_ART_PX } from "@/lib/constants";
import { optimizedSrc } from "@/lib/imageUrl";
import type { BoneShape as BoneShapeData } from "@/types/puzzle";

interface BoneShapeProps {
  readonly shape: BoneShapeData;
  readonly className?: string;
  /** `false` mientras está lejos de la pantalla: la ilustración aún no se pide. */
  readonly showArt?: boolean;
}

/** Silueta de un hueso del fósil, dibujada en su propia caja; decorativa. */
export function BoneShape({ shape, className, showArt = true }: BoneShapeProps) {
  const { width, height } = shape.size;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {shape.image ? (
        <image
          href={showArt ? optimizedSrc(shape.image, BONE_ART_PX) : undefined}
          x={-(shape.imageOffset?.x ?? 0)}
          y={-(shape.imageOffset?.y ?? 0)}
          width={shape.imageSize?.width ?? width}
          height={shape.imageSize?.height ?? height}
          preserveAspectRatio="none"
        />
      ) : (
        <path d={shape.path} fillRule="evenodd" />
      )}
    </svg>
  );
}
