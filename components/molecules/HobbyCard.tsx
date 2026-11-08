import { HobbyGlyph } from "@/components/atoms/HobbyGlyph";
import { cn } from "@/lib/utils";
import type { Hobby } from "@/types/hobby";

interface HobbyCardProps {
  readonly hobby: Hobby;
  readonly exampleLabel: string;
}

/**
 * Tarjeta de un hobby. La destacada ocupa dos filas en escritorio: el dibujo arriba
 * y el texto abajo, más grande, para que el bloque no quede vacío.
 */
export function HobbyCard({ hobby, exampleLabel }: HobbyCardProps) {
  const featured = hobby.featured === true;
  return (
    <article
      className={cn(
        "border-line bg-surface relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border p-6 transition-transform duration-300 motion-safe:hover:-translate-y-1",
        featured &&
          "justify-between bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--glow)_18%,transparent),transparent_60%)] p-8 lg:p-10",
      )}
    >
      <HobbyGlyph
        kind={hobby.glyph}
        className={cn("text-glow", featured ? "size-16 lg:size-20" : "size-12")}
      />
      <div className="flex flex-col gap-3">
        <h3
          className={cn(
            "font-display font-bold",
            featured ? "text-fluid-2xl" : "text-fluid-lg",
          )}
        >
          {hobby.name}
        </h3>
        <p
          className={cn(
            "max-w-[52ch] leading-relaxed opacity-85",
            featured ? "text-fluid-base" : "text-fluid-sm",
          )}
        >
          {hobby.description}
        </p>
        {/* Opacidad 70 %: con 60 % el tema claro queda en 4,15:1, por debajo de AA (4,5:1). */}
        {hobby.example ? (
          <span className="text-fluid-xs font-mono tracking-[.15em] opacity-70">
            {exampleLabel}
          </span>
        ) : null}
      </div>
    </article>
  );
}
