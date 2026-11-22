import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, IM_Fell_English, JetBrains_Mono, Outfit } from "next/font/google";
import { LoadedFlag } from "@/components/atoms/LoadedFlag";
import { LocaleProvider } from "@/components/templates/LocaleProvider";
import { PortalProvider } from "@/components/templates/PortalProvider";
import { CONTENT } from "@/data/content";
import { SITE_URL } from "@/data/site";
import { LOCALE_META, LOCALES } from "@/lib/i18n";
import { getLocale } from "@/lib/locale.server";
import { languageAlternates } from "@/lib/seo";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import "../globals.css";

// Sin 300: ningún texto lo usa y sería un archivo de fuente más que descargar.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "800"],
});
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
});
/** Serif de grabado del diario de Experiencia; sin precarga: se pide al llegar a la sección. */
const fell = IM_Fell_English({
  variable: "--font-fell",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  preload: false,
});

/** Una versión estática del sitio por idioma: `/` (español) y `/en`. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { profile } = CONTENT[locale];
  // Nombre completo: título del sitio y de la vista previa al compartir el enlace.
  const siteName = `${profile.firstName} ${profile.lastName}`;
  const description = [profile.role, profile.tagline].filter(Boolean).join(". ");
  return {
    // URL pública: Open Graph y los enlaces compartidos usan direcciones absolutas.
    metadataBase: new URL(SITE_URL),
    title: { default: `${siteName} | ${profile.role}`, template: `%s | ${siteName}` },
    description,
    alternates: languageAlternates(locale, "/"),
    openGraph: {
      type: "website",
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((other) => other !== locale).map(
        (other) => LOCALE_META[other].ogLocale,
      ),
      siteName,
      title: siteName,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();
  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${figtree.variable} ${jetbrains.variable} ${fell.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Aplica el tema antes del primer pintado. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <PortalProvider>{children}</PortalProvider>
          <LoadedFlag />
        </LocaleProvider>
      </body>
    </html>
  );
}
