import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, localizeHref, type Locale } from "@/lib/i18n";

/**
 * URL canónica de una página y sus versiones en cada idioma (`hreflang`), para que los
 * buscadores muestren la versión correcta. `path` es la ruta sin idioma (`/hobbies`).
 * Las rutas son relativas: las completa `metadataBase`.
 */
export function languageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((other) => [other, localizeHref(other, path)]),
  );
  languages["x-default"] = localizeHref(DEFAULT_LOCALE, path);
  return { canonical: localizeHref(locale, path), languages };
}
