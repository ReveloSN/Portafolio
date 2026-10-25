import type { Particle } from "@/lib/particles";

/** Alto de referencia del diseño: las alturas de las partículas se expresan sobre él. */
const SCENE_HEIGHT = 900;

interface FirefliesProps {
  readonly particles: readonly Particle[];
  readonly className?: string;
  /** Para burbujas: la posición vertical la define la animación, no `top`. */
  readonly omitTop?: boolean;
}

export function Fireflies({
  particles,
  className = "ff",
  omitTop = false,
}: FirefliesProps) {
  return (
    <>
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={className}
          style={{
            left: `${p.x}%`,
            top: omitTop ? undefined : `${((p.y / SCENE_HEIGHT) * 100).toFixed(2)}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  );
}
