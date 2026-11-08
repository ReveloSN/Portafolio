import { cn } from "@/lib/utils";

interface PterodactylsProps {
  readonly className?: string;
}

/** Escena original en unidades de diseño: los porcentajes salen de aquí. */
const STAGE = { width: 1440, height: 300 } as const;

/**
 * Cada pterodáctilo vuela en un carril HTML de ancho completo que se mueve con
 * `transform` (`.fly`, `.fly2`). Antes era un `<g>` animado dentro de un SVG del ancho
 * de la pantalla: esa animación no se compone y repintaba todo el SVG en cada frame.
 */
const BIRDS = [
  {
    lane: "fly",
    viewBox: "-26 -14 52 21",
    path: "M-26 0 Q-13 -14 0 0 Q13 -14 26 0 Q13 -4 0 7 Q-13 -4 -26 0Z",
    left: -26,
    top: 136,
    width: 52,
  },
  {
    lane: "fly2",
    viewBox: "-20 -11 40 16",
    path: "M-20 0 Q-10 -11 0 0 Q10 -11 20 0 Q10 -3 0 5 Q-10 -3 -20 0Z",
    left: -20,
    top: 224,
    width: 40,
  },
] as const;

const percent = (value: number, total: number) => `${(value / total) * 100}%`;

export function Pterodactyls({ className }: PterodactylsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("aspect-[1440/300] overflow-hidden", className)}
    >
      {BIRDS.map((bird) => (
        <div key={bird.lane} className={cn("absolute inset-0", bird.lane)}>
          <svg
            viewBox={bird.viewBox}
            className="absolute h-auto"
            style={{
              left: percent(bird.left, STAGE.width),
              top: percent(bird.top, STAGE.height),
              width: percent(bird.width, STAGE.width),
            }}
          >
            <path d={bird.path} fill="#04110a" opacity=".85" />
          </svg>
        </div>
      ))}
    </div>
  );
}
