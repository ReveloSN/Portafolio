/**
 * Idiomas del sitio y sus rutas. El español vive en la raíz (`/`, `/hobbies`) y el
 * inglés bajo `/en` (`/en`, `/en/hobbies`). Por dentro, todas las rutas cuelgan de
 * `app/[lang]`: el proxy reescribe las rutas sin prefijo a `/es/...`.
 * Lógica pura: sirve en el servidor, en el cliente y en el proxy.
 */

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/** Cookie con la elección explícita de idioma; el proxy la usa al entrar sin prefijo. */
export const LOCALE_COOKIE = "portafolio-lang";
export const LOCALE_COOKIE_MAX_AGE_S = 60 * 60 * 24 * 365;

interface LocaleMeta {
  /** Atributo `lang` del documento. */
  readonly htmlLang: string;
  /** Región de Open Graph. */
  readonly ogLocale: string;
  /** Código corto que muestra el selector. */
  readonly code: string;
  /** Nombre del botón que lleva a este idioma, escrito en este mismo idioma. */
  readonly switchLabel: string;
}

export const LOCALE_META: Readonly<Record<Locale, LocaleMeta>> = {
  es: {
    htmlLang: "es",
    ogLocale: "es_CO",
    code: "ES",
    switchLabel: "Ver el sitio en español",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    code: "EN",
    switchLabel: "View the site in English",
  },
};

/** El otro idioma del sitio (el selector alterna entre los dos). */
export function otherLocale(locale: Locale): Locale {
  return LOCALES.find((candidate) => candidate !== locale) ?? DEFAULT_LOCALE;
}

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (LOCALES as readonly string[]).includes(value);

const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

/**
 * Ruta pública de `href` en un idioma: el español no lleva prefijo; los demás sí.
 * `"/"` → `"/en"`, `"/#proyectos"` → `"/en#proyectos"`, `"/hobbies"` → `"/en/hobbies"`.
 * Los enlaces externos, anclas sueltas y archivos de `public/` no cambian.
 */
export function localizeHref(locale: Locale, href: string): string {
  if (!isInternal(href) || locale === DEFAULT_LOCALE || isAsset(href)) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#") || href.startsWith("/?")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Archivos servidos tal cual desde `public/` (el CV, imágenes): no tienen idioma. */
function isAsset(href: string): boolean {
  const path = href.split(/[?#]/)[0] ?? href;
  return /\.[a-z0-9]+$/i.test(path);
}

/** Separa el idioma de una ruta pública: `"/en/hobbies"` → `{ en, "/hobbies" }`. */
export function splitLocale(pathname: string): {
  readonly locale: Locale;
  readonly path: string;
} {
  const [, first = "", ...rest] = pathname.split("/");
  if (isLocale(first)) return { locale: first, path: `/${rest.join("/")}` };
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/** La misma página en otro idioma (para el selector ES / EN). */
export function switchLocaleHref(pathname: string, target: Locale): string {
  return localizeHref(target, splitLocale(pathname).path);
}
