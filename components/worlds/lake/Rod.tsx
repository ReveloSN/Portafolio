import { cn } from "@/lib/utils";

interface RodProps {
  /** Fuerza del lanzamiento: la caña se echa hacia atrás al cargar. */
  readonly power: number;
  readonly tugging: boolean;
}

const ROD_PATH = "M280 240 Q362 168 440 100";
const PULL_BACK_DEG = 28;

export function Rod({ power, tugging }: RodProps) {
  return (
    <g
      className={cn("lake-rod", tugging && "is-tugging")}
      style={{ transform: `rotate(${-power * PULL_BACK_DEG}deg)` }}
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
