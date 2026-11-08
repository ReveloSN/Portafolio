/**
 * Genera `app/favicon.ico` (PNG de 16, 32 y 48 px dentro del ICO) y `app/apple-icon.png`
 * (180 px) a partir de `app/icon.svg`. Ejecutar después de cambiar el SVG:
 *   npm run icons
 */
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const SOURCE = "app/icon.svg";
const FAVICON = "app/favicon.ico";
const APPLE_ICON = "app/apple-icon.png";
const FAVICON_SIZES = [16, 32, 48] as const;
const APPLE_SIZE = 180;
/** Densidad alta al rasterizar el SVG: bordes nítidos al reducir. */
const SVG_DENSITY = 384;
const ICO_HEADER_BYTES = 6;
const ICO_ENTRY_BYTES = 16;
const BITS_PER_PIXEL = 32;

const svg = readFileSync(SOURCE);
const png = (size: number) =>
  sharp(svg, { density: SVG_DENSITY }).resize(size, size).png().toBuffer();

/** ICO con imágenes PNG: válido en los navegadores actuales y en Windows Vista o superior. */
function buildIco(images: readonly Buffer[], sizes: readonly number[]): Buffer {
  const header = Buffer.alloc(ICO_HEADER_BYTES);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const directory = Buffer.alloc(ICO_ENTRY_BYTES * images.length);
  let offset = ICO_HEADER_BYTES + directory.length;
  images.forEach((image, i) => {
    const entry = i * ICO_ENTRY_BYTES;
    const size = sizes[i] ?? 0;
    directory[entry] = size;
    directory[entry + 1] = size;
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(BITS_PER_PIXEL, entry + 6);
    directory.writeUInt32LE(image.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  return Buffer.concat([header, directory, ...images]);
}

async function main() {
  const images = await Promise.all(FAVICON_SIZES.map(png));
  writeFileSync(FAVICON, buildIco(images, FAVICON_SIZES));
  writeFileSync(APPLE_ICON, await png(APPLE_SIZE));
  console.log(`Generados ${FAVICON} y ${APPLE_ICON} desde ${SOURCE}`);
}

void main();
