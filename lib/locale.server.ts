import { lang } from "next/root-params";
import { CONTENT, type SiteContent } from "@/data/content";
import { COLLECTIONS, type Collections } from "@/lib/collections";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";

/**
 * Idioma de la página que se está generando, leído del segmento `app/[lang]` sin pasarlo
 * por props. Solo en Server Components: el cliente usa `useLocale` / `useCopy`.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Contenido del idioma de la página. */
export async function getContent(): Promise<SiteContent> {
  return CONTENT[await getLocale()];
}

/** Textos de la interfaz del idioma de la página. */
export async function getCopy(): Promise<SiteContent["copy"]> {
  return (await getContent()).copy;
}

/** Búsquedas por slug e id del idioma de la página. */
export async function getCollections(): Promise<Collections> {
  return COLLECTIONS[await getLocale()];
}
