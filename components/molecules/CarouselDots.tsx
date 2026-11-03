import { cn } from "@/lib/utils";

interface CarouselDotsProps {
  readonly count: number;
  readonly active: number;
  /** Nombre accesible de cada punto, con su posición ("Testimonio 2 de 3"). */
  readonly labelFor: (index: number) => string;
  readonly onSelect: (index: number) => void;
}

/** Puntos de un carrusel: cada botón mide al menos 28x28 px aunque el punto visible sea pequeño. */
export function CarouselDots({ count, active, labelFor, onSelect }: CarouselDotsProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: count }, (_, i) => {
        const current = i === active;
        return (
          <button
            key={i}
            type="button"
            aria-label={labelFor(i)}
            aria-current={current ? "true" : undefined}
            onClick={() => onSelect(i)}
            className="group inline-flex h-7 min-w-7 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-2.5 rounded-full transition-all duration-300",
                current
                  ? "bg-glow w-[34px]"
                  : "w-2.5 bg-[rgba(238,246,224,.35)] group-hover:bg-[rgba(238,246,224,.7)]",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
