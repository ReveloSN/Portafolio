import type { MetadataRoute } from "next";
import { HOBBIES_PATH } from "@/data/navigation";
import { SITE_URL } from "@/data/site";
import { WORLD_SLUGS } from "@/types/world";

/** Portada, página de hobbies y una página por mundo (agregar un mundo la agrega aquí). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", HOBBIES_PATH, ...WORLD_SLUGS.map((slug) => `/mundos/${slug}`)];
  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : 0.7,
  }));
}
