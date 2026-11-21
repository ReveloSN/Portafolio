import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, localizeHref } from "@/lib/i18n";

/**
 * Rutas por idioma. El español vive sin prefijo (`/hobbies`) y por dentro se sirve desde
 * `app/[lang]` como `/es/hobbies`; el inglés vive en `/en/...` tal cual.
 * - `/es/...` redirige a la ruta sin prefijo (una sola URL por página).
 * - Sin prefijo y con la cookie de idioma en inglés, redirige a `/en/...`.
 * - Sin prefijo y sin elección, se sirve en español: nada de adivinar por el navegador.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(first)) return NextResponse.next();

  const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(preferred) && preferred !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = localizeHref(preferred, pathname);
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Fuera: archivos internos de Next, todo lo que tenga extensión (public/, sitemap.xml,
  // robots.txt) y las imágenes generadas (íconos y tarjeta de Open Graph).
  matcher: ["/((?!_next/|.*\\..*|.*opengraph-image|icon|apple-icon).*)"],
};
