"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

export type ProjectLayers = readonly [
  background: string,
  subject: string,
  foreground: string,
];

export function LayeredProjectScene({ layers }: { readonly layers: ProjectLayers }) {
  const ref = useParallax<HTMLDivElement>();

  return (
    <div ref={ref} className="project-scene" aria-hidden="true">
      {layers.map((layer) => (
        <div key={layer} className="project-story-layer">
          <Image
            src={`/art/projects/layers/${layer}.webp`}
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
