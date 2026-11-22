import type { TechIconId } from "@/types/profile";

/**
 * Logotipos de las tecnologías (trazados de Simple Icons 16, licencia CC0, sobre 24 × 24).
 * Solo el símbolo reconocible: FastAPI (rayo), Next.js ("N") y Spring Boot (botón de
 * encendido) van sin el círculo o la placa hexagonal de fondo.
 * Para agregar una tecnología: su id en `TechIconId`, su viewBox y ajuste aquí, su
 * trazado en `lib/techIconPaths.ts` y sus datos en /data.
 */

/**
 * viewBox cuadrado ajustado a la forma real de cada logo (medida con getBBox), para
 * que ningún logo traiga aire propio alrededor.
 */
export const TECH_ICON_VIEWBOXES: Readonly<Record<TechIconId, string>> = {
  fastapi: "5.279 5.278 13.442 13.442",
  spring: "5.248 4.781 13.404 13.404",
  nestjs: "0.000 0.000 24.000 24.000",
  nextjs: "7.200 7.198 9.600 9.600",
  react: "0.000 0.002 24.000 24.000",
  tailwind: "0.001 0.000 24.000 24.000",
  godot: "0.000 0.000 24.000 24.000",
  kotlin: "0.000 0.000 24.000 24.000",
  python: "0.000 0.000 24.000 24.000",
  aws: "0.000 0.000 24.000 24.000",
  postgresql: "-0.000 -0.000 24.000 24.000",
  espressif: "0.000 -0.000 24.000 24.000",
  gemini: "0.000 0.000 24.000 24.000",
  aseprite: "0.001 0.000 24.000 24.000",
  githubactions: "0.000 0.000 24.000 24.000",
  expo: "0.000 -0.000 24.000 24.000",
  typescript: "0.000 0.000 24.000 24.000",
  supabase: "-0.000 -0.000 24.000 24.000",
  wearos: "-0.000 0.000 24.000 24.000",
  compose: "-0.000 -0.000 24.000 24.000",
  openstreetmap: "0.001 -0.001 24.000 24.000",
  tauri: "0.001 -0.000 24.000 24.000",
  spacy: "0.000 0.000 24.000 24.000",
  sqlite: "-0.000 -0.000 24.000 24.000",
  nodejs: "-0.001 -0.000 24.000 24.000",
  locust: "0.000 0.000 24.000 24.000",
  docker: "-0.000 0.000 24.000 24.000",
  android: "0.000 -0.001 24.000 24.000",
};

/**
 * Ajuste individual a la palma: lado del viewBox / diagonal de la forma. Multiplicado
 * por el diámetro libre de la palma, la diagonal del logo cabe en ese círculo y el
 * logo nunca toca el borde de tierra (los cuadrados quedan menores que los anchos).
 */
export const TECH_ICON_FIT: Readonly<Record<TechIconId, number>> = {
  fastapi: 0.716,
  spring: 0.712,
  nestjs: 0.708,
  nextjs: 0.6, // la "N" es maciza: más pequeña para igualar su peso óptico
  react: 0.747,
  tailwind: 0.857,
  godot: 0.727,
  kotlin: 0.707,
  python: 0.72,
  aws: 0.858, // ancho como Tailwind: la diagonal ocupa casi todo el lado
  postgresql: 0.719,
  espressif: 0.707,
  gemini: 0.707,
  aseprite: 0.731,
  githubactions: 0.707,
  expo: 0.743,
  typescript: 0.707,
  supabase: 0.716,
  wearos: 0.795,
  compose: 0.745,
  openstreetmap: 0.708,
  tauri: 0.748,
  spacy: 0.954,
  sqlite: 0.745,
  nodejs: 0.748,
  locust: 0.894,
  docker: 0.812,
  android: 0.864,
};

/** Sprite con los trazados (`app/tech-icons.svg/route.ts`). */
export const TECH_SPRITE_PATH = "/tech-icons.svg";

/** Dirección de un logo en el sprite; el número cambia al agregar uno y renueva la caché. */
export const techIconHref = (id: TechIconId) =>
  `${TECH_SPRITE_PATH}?v=${Object.keys(TECH_ICON_FIT).length}#${id}`;
