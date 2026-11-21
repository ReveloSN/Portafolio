import type { MetadataRoute } from "next";
import { HOBBIES_PATH } from "@/data/navigation";
import { SITE_URL } from "@/data/site";
import { LOCALES, localizeHref } from "@/lib/i18n";
import { WORLD_SLUGS } from "@/types/world";

const HOME_PRIORITY = 1;
const PAGE_PRIORITY = 0.7;

const absolute = (href: string) => `${SITE_URL}${href === "/" ? "" : href}`;

/**
 * Portada, página de hobbies y una página por mundo (agregar un mundo la agrega aquí),
 * en cada idioma, con sus versiones alternativas para los buscadores.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", HOBBIES_PATH, ...WORLD_SLUGS.map((slug) => `/mundos/${slug}`)];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(
      LOCALES.map((locale) => [locale, absolute(localizeHref(locale, path))]),
    );
    return LOCALES.map((locale) => ({
      url: absolute(localizeHref(locale, path)),
      priority: path === "/" ? HOME_PRIORITY : PAGE_PRIORITY,
      alternates: { languages },
    }));
  });
}
