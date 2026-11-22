"use client";

import { useLanguageSwitch } from "@/hooks/useLanguageSwitch";
import { LOCALE_META } from "@/lib/i18n";

/**
 * Lleva a la misma página en el otro idioma. Como el botón de tema, muestra a dónde lleva
 * (EN en español, ES en inglés) y su nombre está escrito en el idioma de destino.
 */
export function LanguageSwitch() {
  const { target, href, choose } = useLanguageSwitch();
  const { code, htmlLang, switchLabel } = LOCALE_META[target];
  return (
    <a
      href={href}
      hrefLang={htmlLang}
      lang={htmlLang}
      onClick={choose}
      // El nombre empieza por lo que se ve ("EN"), para quien navega con la voz (WCAG 2.5.3).
      aria-label={`${code}: ${switchLabel}`}
      title={switchLabel}
      data-testid="language-switch"
      className="text-fg border-line-strong bg-surface hover:bg-surface-strong font-display text-fluid-sm inline-flex size-11 items-center justify-center rounded-xl border font-extrabold tracking-[.06em] no-underline transition"
    >
      {code}
    </a>
  );
}
