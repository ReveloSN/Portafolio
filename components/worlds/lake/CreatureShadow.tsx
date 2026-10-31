import { cn } from "@/lib/utils";

interface CreatureShadowProps {
  readonly x: number;
  readonly y: number;
  readonly rx: number;
  /** Al picar deja de pasar y se queda bajo la boya. */
  readonly biting: boolean;
}

/** Sombra que nada bajo el agua; su tamaño delata a la criatura. */
export function CreatureShadow({ x, y, rx, biting }: CreatureShadowProps) {
  return (
    <g
      style={{ transform: `translate(${x}px, ${y + 22}px)` }}
      data-testid="creature-shadow"
    >
      <ellipse
        className={cn("lake-shadow", biting && "is-biting")}
        rx={rx}
        ry={rx * 0.32}
        fill="#02121a"
      />
    </g>
  );
}
