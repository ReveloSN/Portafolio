/**
 * Prepara las capturas de los proyectos para la galería de cada mundo.
 *
 * Uso:  npm run projects:shots [-- <slug> ...]
 *
 * Lee las capturas crudas de screenshots/projects/<slug>/NN-nombre.png (fuera de git) y
 * escribe public/images/projects/<slug>/nombre.webp, con un tamaño pensado para la
 * galería (ninguna captura se amplía):
 * - horizontales (escritorio, web, juego): hasta 1600 px de ancho;
 * - verticales (teléfono): hasta 1400 px de alto;
 * - cuadradas (reloj): tal cual;
 * - pixel art (el videojuego): a 1440 px con vecino más cercano y sin pérdida, para que
 *   cada píxel del juego siga siendo un bloque nítido (3× su resolución de 480 × 270).
 * Imprime el bloque `screenshots` con las medidas reales para copiarlo a data/projects.ts.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "screenshots/projects";
const OUT = "public/images/projects";
const PUBLIC_PREFIX = "/images/projects";

const MAX_LANDSCAPE_WIDTH = 1600;
const MAX_PORTRAIT_HEIGHT = 1400;
/** Calidad WebP: el texto de las interfaces sigue nítido y el peso baja ~10 veces. */
const WEBP_QUALITY = 84;
/** Mundos cuyas capturas son pixel art. */
const PIXEL_ART = new Set(["selva"]);
const PIXEL_ART_WIDTH = 1440;
/** Prefijo de orden del archivo crudo (`01-`), que no pasa al nombre publicado. */
const ORDER_PREFIX = /^\d+-/;

interface OutputShot {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly kb: number;
}

async function optimize(slug: string, file: string): Promise<OutputShot> {
  const input = path.join(SRC, slug, file);
  const { width = 0, height = 0 } = await sharp(input).metadata();
  const pixelArt = PIXEL_ART.has(slug);
  const resize = pixelArt
    ? { width: PIXEL_ART_WIDTH, kernel: "nearest" as const }
    : width > height
      ? { width: Math.min(width, MAX_LANDSCAPE_WIDTH) }
      : height > width
        ? { height: Math.min(height, MAX_PORTRAIT_HEIGHT) }
        : {};
  const name = `${path.parse(file).name.replace(ORDER_PREFIX, "")}.webp`;
  const output = path.join(OUT, slug, name);
  const info = await sharp(input)
    .resize({ ...resize, withoutEnlargement: true })
    .webp(pixelArt ? { lossless: true, effort: 6 } : { quality: WEBP_QUALITY, effort: 6 })
    .toFile(output);
  return {
    src: `${PUBLIC_PREFIX}/${slug}/${name}`,
    width: info.width,
    height: info.height,
    kb: Math.round(info.size / 1024),
  };
}

async function main() {
  const requested = process.argv.slice(2);
  const slugs = requested.length > 0 ? requested : await readdir(SRC);
  for (const slug of slugs) {
    const files = (await readdir(path.join(SRC, slug)))
      .filter((file) => /\.(png|jpe?g)$/i.test(file))
      .sort();
    if (files.length === 0) continue;
    await mkdir(path.join(OUT, slug), { recursive: true });
    const shots = await Promise.all(files.map((file) => optimize(slug, file)));
    console.log(`\n${slug}:`);
    for (const shot of shots) {
      console.log(
        `  { src: "${shot.src}", width: ${shot.width}, height: ${shot.height} }, // ${shot.kb} KB`,
      );
    }
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
