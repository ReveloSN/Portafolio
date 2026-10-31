import { ROD_BASE, ROD_TIP } from "@/lib/fishing/scene";
import { cn } from "@/lib/utils";

interface RodProps {
  /** Fuerza del lanzamiento: la caña se echa hacia atrás al cargar. */
  readonly power: number;
  readonly tugging: boolean;
}

const BEND = { x: 82, y: 168 } as const;
const ROD_PATH = `M${ROD_BASE.x} ${ROD_BASE.y} Q${ROD_BASE.x + BEND.x} ${BEND.y} ${ROD_TIP.x} ${ROD_TIP.y}`;
const PULL_BACK_DEG = 28;

export function Rod({ power, tugging }: RodProps) {
  return (
    <g
      className={cn("lake-rod", tugging && "is-tugging")}
      style={{
        transform: `rotate(${-power * PULL_BACK_DEG}deg)`,
        transformOrigin: `${ROD_BASE.x}px ${ROD_BASE.y}px`,
      }}
    >
      <path
        d={ROD_PATH}
        stroke="#8a5a2b"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={ROD_PATH}
        stroke="#c7954f"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}
