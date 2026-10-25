import type { Particle } from "@/lib/particles";

interface FirefliesProps {
  readonly particles: readonly Particle[];
  readonly className?: string;
}

export function Fireflies({ particles, className = "ff" }: FirefliesProps) {
  return (
    <>
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={className}
          style={{
            left: `${p.x}%`,
            top: `${p.y}px`,
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
