import Image from "next/image";
import { WORLD_COVERS } from "@/data/worldCovers";
import type { WorldSlug } from "@/types/world";

/** Portada estática: una sola imagen, sin personajes, capas ni eventos de puntero. */
export function WorldCover({
  slug,
  hero = false,
}: {
  readonly slug: WorldSlug;
  readonly hero?: boolean;
}) {
  return (
    <Image
      src={WORLD_COVERS[slug]}
      alt=""
      data-world={slug}
      fill
      sizes={
        hero
          ? "(max-width:600px) 1000px, 100vw"
          : "(min-width:1100px) 400px, (min-width:768px) 45vw, 100vw"
      }
      loading={hero ? "eager" : "lazy"}
      fetchPriority={hero ? "high" : "auto"}
      className="world-cover object-cover"
    />
  );
}
