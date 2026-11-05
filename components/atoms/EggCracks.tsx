/** Grietas del huevo: se dibujan con stroke-dashoffset (cada trazo mide 1). */
const CRACKS = [
  "M10 60 L22 52 L31 63 L43 50 L53 61 L64 48 L75 59 L90 51",
  "M43 50 L40 38 L47 30",
  "M64 48 L70 39",
  "M31 63 L28 74",
] as const;

export function EggCracks() {
  return (
    <svg
      viewBox="0 0 100 130"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="nest-cracks"
    >
      {CRACKS.map((d) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          fill="none"
          stroke="rgba(28, 14, 4, 0.78)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
