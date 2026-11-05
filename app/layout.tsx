import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, JetBrains_Mono, Outfit } from "next/font/google";
import { PortalProvider } from "@/components/templates/PortalProvider";
import { COPY } from "@/data/copy";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "500", "800"],
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

export const metadata: Metadata = {
  title: COPY.site.title,
  description:
    "Portafolio personal con tema de expedición: selva, océano, cueva de fósiles y volcán.",
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
