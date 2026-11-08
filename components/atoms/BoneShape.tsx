import type { BoneShape as BoneShapeData } from "@/types/puzzle";

interface BoneShapeProps {
  readonly shape: BoneShapeData;
  readonly className?: string;
}

/** Silueta de un hueso del fósil, dibujada en su propia caja; decorativa. */
export function BoneShape({ shape, className }: BoneShapeProps) {
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
          href={shape.image}
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
