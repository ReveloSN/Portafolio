"use client";

import type { CSSProperties } from "react";
import { QUANTUM_PARTICLES } from "@/data/quantum";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";

/** Partículas que flotan sobre el agua (turquesa, lima y ámbar); se pausan fuera de pantalla. */
export function QuantumParticles() {
  const ref = usePauseOffscreen<HTMLDivElement>();
  return (
    <div ref={ref} className="q-particles" aria-hidden="true">
      {QUANTUM_PARTICLES.map((particle) => (
        <span
          key={`${particle.x}-${particle.y}`}
          className="q-particle"
          data-hue={particle.hue}
          style={
            {
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
