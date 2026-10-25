import type { Particle } from "@/lib/particles";

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
            top: omitTop ? undefined : `${p.y}px`,
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
