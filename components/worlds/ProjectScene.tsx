"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";
import type { WorldSlug } from "@/types/world";

interface ProjectSceneProps {
  readonly slug: WorldSlug;
  readonly hero?: boolean;
}

/** Un mismo mundo en el portal y la portada, con fondo, personaje y primer plano independientes. */
export function ProjectScene({ slug, hero = false }: ProjectSceneProps) {
  const ref = useParallax<HTMLDivElement>();
  const sizes = hero
    ? "(max-width: 600px) 1000px, 100vw"
    : "(min-width: 1100px) 900px, (min-width: 768px) 1100px, 1000px";
  return (
    <div
      ref={ref}
      className={cn("project-scene", hero && "project-scene-hero")}
      data-world={slug}
      aria-hidden="true"
    >
      <div className="project-scene-background">
        <Image
          src={`/art/projects/layers/${slug}-background.webp?v=1`}
          alt=""
          fill
          sizes={sizes}
          loading={hero ? "eager" : "lazy"}
          fetchPriority={hero ? "high" : "auto"}
          className="object-cover"
        />
      </div>
      <div className="project-scene-atmosphere" />
      <div className="project-scene-dinosaur">
        <Image
          src={`/art/projects/layers/${slug}-dinosaur.webp?v=1`}
          alt=""
          fill
          sizes={
            hero ? "(min-width: 1000px) 55vw, 90vw" : "(min-width: 1100px) 340px, 80vw"
          }
          loading={hero ? "eager" : "lazy"}
          className="object-contain"
        />
      </div>
      <div className="project-scene-foreground project-scene-foreground-left">
        <Image
          src="/images/foliage-bl.webp"
          alt=""
          fill
          sizes={hero ? "25vw" : "120px"}
          className="object-contain object-bottom-left"
        />
      </div>
      <div className="project-scene-foreground project-scene-foreground-right">
        <Image
          src="/images/foliage-br.webp"
          alt=""
          fill
          sizes={hero ? "25vw" : "120px"}
          className="object-contain object-bottom-right"
        />
      </div>
      <div className="project-scene-vignette" />
    </div>
  );
}
