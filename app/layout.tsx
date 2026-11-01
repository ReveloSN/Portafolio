import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, JetBrains_Mono, Outfit } from "next/font/google";
import { COPY } from "@/data/copy";
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
    "Portafolio personal con tema de expedición: selva, océano y cueva de fósiles.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${figtree.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
