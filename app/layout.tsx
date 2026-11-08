import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, JetBrains_Mono, Outfit } from "next/font/google";
import { PortalProvider } from "@/components/templates/PortalProvider";
import { PROFILE } from "@/data/profile";
import { SITE_URL } from "@/data/site";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import "./globals.css";

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

/** Nombre completo: título del sitio y de la vista previa al compartir el enlace. */
const SITE_NAME = `${PROFILE.firstName} ${PROFILE.lastName}`;
const SITE_DESCRIPTION = [PROFILE.role, PROFILE.tagline].filter(Boolean).join(". ");

export const metadata: Metadata = {
  // URL pública: Open Graph y los enlaces compartidos usan direcciones absolutas.
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | ${PROFILE.role}`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${figtree.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Antes del primer pintado: tema (sin parpadeo) e intro vista */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      </head>
      <body>
        <PortalProvider>{children}</PortalProvider>
      </body>
    </html>
  );
}
