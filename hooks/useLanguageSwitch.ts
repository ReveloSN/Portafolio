"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "@/hooks/useLocale";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE_S,
  otherLocale,
  switchLocaleHref,
  type Locale,
} from "@/lib/i18n";

/** Guarda la elección para que la próxima visita a `/` abra en ese idioma (lo lee el proxy). */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_S}; samesite=lax`;
}

/**
 * Selector de idioma: a qué idioma lleva, la misma página en ese idioma y qué hacer al
 * elegirlo (recordarlo). La navegación es un enlace real: funciona sin JS y con Ctrl+clic.
 */
export function useLanguageSwitch() {
  const target = otherLocale(useLocale());
  const href = switchLocaleHref(usePathname(), target);
  return { target, href, choose: () => rememberLocale(target) };
}
