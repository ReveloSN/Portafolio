"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

const LAYERS = ["fondo", "empleado", "cliente"] as const;

export function BancoSagaScene() {
  const ref = useParallax<HTMLDivElement>();

  return (
    <div ref={ref} className="project-scene" aria-hidden="true">
      {LAYERS.map((layer) => (
        <div key={layer} className="bank-scene-layer" data-layer={layer}>
          <Image
            src={`/art/projects/layers/banco-saga-${layer}.webp`}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1200px) 55vw, 630px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
