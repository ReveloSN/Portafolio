"use client";

import { createContext, useCallback, useContext } from "react";
import { COPY, type Copy } from "@/data/copy";
import { COPY_EN } from "@/data/en/copy";
import { DEFAULT_LOCALE, localizeHref, type Locale } from "@/lib/i18n";

/** Idioma de la página para los componentes de cliente (lo pone `LocaleProvider`). */
export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/**
 * Textos de interfaz por idioma para el cliente. Solo van aquí los textos de la interfaz;
 * el contenido largo (proyectos, experiencia) llega por props desde el servidor.
 */
const COPIES: Readonly<Record<Locale, Copy>> = { es: COPY, en: COPY_EN };

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useCopy(): Copy {
  return COPIES[useLocale()];
}

/** Convierte rutas internas a las del idioma actual (`/hobbies` → `/en/hobbies`). */
export function useLocalizeHref(): (href: string) => string {
  const locale = useLocale();
  return useCallback((href: string) => localizeHref(locale, href), [locale]);
}
