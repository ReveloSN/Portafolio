import type { CSSProperties } from "react";
import { Illustration } from "@/components/atoms/Illustration";
import { FIREFLY_SPRITES } from "@/data/art";
import { makeFlights } from "@/lib/fireflies";
import { cn } from "@/lib/utils";

interface FirefliesProps {
  /** Entre 8 y 12 en escritorio; en móvil el CSS deja solo 4. */
  readonly count: number;
  /** Ajustes de la capa (p. ej. opacidad menor donde hay texto). */
  readonly className?: string;
}

/** Luciérnagas ilustradas que vuelan despacio y parpadean; puramente decorativas. */
export function Fireflies({ count, className }: FirefliesProps) {
  const flights = makeFlights(count);
  return (
    <div
      aria-hidden="true"
      className={cn("fireflies pointer-events-none absolute inset-0", className)}
    >
      {flights.map((flight, i) => {
        const sprite = FIREFLY_SPRITES[flight.sprite] ?? FIREFLY_SPRITES[0];
        const style = {
          left: `${flight.x}%`,
          top: `${flight.y}%`,
          "--firefly-size": flight.size,
          "--firefly-duration": `${flight.duration}s`,
          "--firefly-delay": `${flight.delay}s`,
          "--firefly-blink": `${flight.blink}s`,
        } as CSSProperties;
        return (
          <span key={i} className="firefly" data-path={flight.path} style={style}>
            <Illustration
              decorative
              src={sprite.src}
              width={sprite.width}
              height={sprite.height}
              sizes="48px"
              className="firefly-glow"
            />
          </span>
        );
      })}
    </div>
  );
}
