import { ROD_TIP } from "@/lib/fishing/scene";

interface FishingLineProps {
  readonly x: number;
  readonly y: number;
  /** De 0 (floja, con comba) a 1 (tirante). */
  readonly tautness: number;
}

const SAG = 90;

/** Hilo de la punta de la caña a la boya; se tensa durante la pelea. */
export function FishingLine({ x, y, tautness }: FishingLineProps) {
  const controlX = (ROD_TIP.x + x) / 2 + SAG * (1 - tautness) * 0.4;
  const controlY = (ROD_TIP.y + y) / 2 + SAG * (1 - tautness);
  return (
    <path
      className="lake-line"
      d={`M${ROD_TIP.x} ${ROD_TIP.y} Q ${controlX} ${controlY} ${x} ${y - 10}`}
      stroke="#eef6e0"
      strokeOpacity={0.6 + tautness * 0.4}
      strokeWidth={1.4 + tautness}
      fill="none"
    />
  );
}
