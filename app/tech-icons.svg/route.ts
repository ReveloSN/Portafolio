import { TECH_ICON_PATHS } from "@/lib/techIconPaths";

/** Se genera al compilar. */
export const dynamic = "force-static";

/** Una hora fresco y un día renovándose por detrás: un logo corregido llega pronto. */
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";

/** Sprite de los logos: se baja una vez y se comparte entre todas las páginas e idiomas. */
export function GET() {
  const paths = Object.entries(TECH_ICON_PATHS)
    .map(([id, d]) => `<path id="${id}" d="${d}"/>`)
    .join("");
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg"><defs>${paths}</defs></svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": CACHE_CONTROL,
      },
    },
  );
}
