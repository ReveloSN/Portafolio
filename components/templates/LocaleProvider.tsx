"use client";

import type { ReactNode } from "react";
import { LocaleContext } from "@/hooks/useLocale";
import type { Locale } from "@/lib/i18n";

/** Comparte el idioma de la página con los componentes de cliente. */
export function LocaleProvider({
  locale,
  children,
}: {
  readonly locale: Locale;
  readonly children: ReactNode;
}) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}
