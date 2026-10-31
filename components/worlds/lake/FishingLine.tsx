import type { ScenePoint } from "@/lib/fishing/scene";

interface FishingLineProps {
  /** Punta de la caña. */
  readonly from: ScenePoint;
  readonly x: number;
  readonly y: number;
  /** De 0 (floja, con comba) a 1 (tirante). */
  readonly tautness: number;
}

const SAG = 90;

/** Hilo de la punta de la caña a la boya; se tensa durante la pelea. */
export function FishingLine({ from, x, y, tautness }: FishingLineProps) {
  const controlX = (from.x + x) / 2 + SAG * (1 - tautness) * 0.4;
  const controlY = (from.y + y) / 2 + SAG * (1 - tautness);
  return (
    <path
      className="lake-line"
      d={`M${from.x} ${from.y} Q ${controlX} ${controlY} ${x} ${y}`}
      stroke="#eef6e0"
      strokeOpacity={0.6 + tautness * 0.4}
      strokeWidth={1 + tautness}
      fill="none"
    />
  );
}
