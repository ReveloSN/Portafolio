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
          width={width}
          height={height}
          preserveAspectRatio="none"
        />
      ) : (
        <path d={shape.path} fillRule="evenodd" />
      )}
    </svg>
  );
}
