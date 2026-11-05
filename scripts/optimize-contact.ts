/**
 * Prepara el arte de Contacto: huevos, crías y cáscaras de cada canal.
 *
 * Uso:  npm run contact:art
 *
 * Lee los originales de imagenes_webp/contacto/{huevos,crias,cascaras} y escribe en
 * public/art/contact/{eggs,hatchlings,shells} WebP recortados al borde, más el
 * manifiesto data/contactArt.ts (medidas y recortes de cada pieza).
 *
 * - Huevos y crías ya traen transparencia: se borran las motas sueltas y el borde casi
 *   invisible, y se recortan al contenido.
 * - Cada imagen de cáscaras trae 6 trozos sobre verde #00FF00: se quita el verde con
 *   despill (sin halo), se separa cada trozo y se empaquetan en un sprite por canal.
 * - Además se escribe una hoja de control sobre fondo oscuro para revisar halos.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp, { type OverlayOptions } from "sharp";

const CHANNELS = ["correo", "linkedin", "github"] as const;
type Channel = (typeof CHANNELS)[number];

const SRC = "imagenes_webp/contacto";
const OUT = "public/art/contact";
const MANIFEST = "data/contactArt.ts";
const CHECK = "screenshots/contact/assets-sobre-oscuro.png";

/** Alto final (px) a ~2x del mayor tamaño en pantalla. */
const EGG_HEIGHT = 300;
const HATCHLING_HEIGHT = 400;
/** Alfa por debajo del cual el píxel es ruido del recorte original. */
const ALPHA_FLOOR = 40;
/** Alfa por encima del cual el píxel se da por opaco (comprime mejor). */
const ALPHA_CEIL = 240;
/** Una isla menor que esta fracción de la pieza mayor es una mota y se borra. */
const SPECK_RATIO = 0.004;
/** Verde dominante (g - max(r, b)): por encima es fondo, por debajo es pieza. */
const KEY_HIGH = 90;
const KEY_LOW = 25;
const SHELL_PIECES = 6;
const SPRITE_GAP = 2;
const WEBP = { quality: 78, alphaQuality: 80, effort: 6, smartSubsample: true } as const;
const DARK = { r: 16, g: 22, b: 18 };

interface Rgba {
  readonly data: Buffer;
  readonly width: number;
  readonly height: number;
}

interface Box {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly area: number;
}

async function readRgba(file: string): Promise<Rgba> {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/** Quita el fondo verde y su reflejo en los bordes (despill). */
function chromaKey(img: Rgba): void {
  const { data } = img;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const other = Math.max(r, b);
    const spill = g - other;
    if (spill >= KEY_HIGH) data[i + 3] = 0;
    else if (spill > KEY_LOW)
      data[i + 3] = Math.round((255 * (KEY_HIGH - spill)) / (KEY_HIGH - KEY_LOW));
    if (spill > 0) data[i + 1] = other;
  }
}

/** Borra el borde casi invisible y deja opaco lo que ya casi lo era. */
function clampAlpha(img: Rgba): void {
  const { data } = img;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i]! < ALPHA_FLOOR) data[i] = 0;
    else if (data[i]! > ALPHA_CEIL) data[i] = 255;
  }
}

/** Islas de píxeles visibles (vecindad 4), de la mayor a la menor. */
function islands(img: Rgba): { boxes: Box[]; labels: Int32Array } {
  const { data, width, height } = img;
  const labels = new Int32Array(width * height).fill(-1);
  const boxes: Box[] = [];
  const stack: number[] = [];
  for (let start = 0; start < labels.length; start++) {
    if (labels[start] !== -1 || data[start * 4 + 3] === 0) continue;
    const id = boxes.length;
    let [x0, y0, x1, y1, area] = [width, height, 0, 0, 0];
    labels[start] = id;
    stack.push(start);
    while (stack.length) {
      const p = stack.pop()!;
      const x = p % width;
      const y = (p - x) / width;
      area++;
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
      const next = [x > 0 ? p - 1 : -1, x < width - 1 ? p + 1 : -1, p - width, p + width];
      for (const q of next) {
        if (q < 0 || q >= labels.length || labels[q] !== -1 || data[q * 4 + 3] === 0)
          continue;
        labels[q] = id;
        stack.push(q);
      }
    }
    boxes.push({ x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1, area });
  }
  return { boxes, labels };
}

/** Borra las motas y devuelve las islas que quedan, de la mayor a la menor. */
function dropSpecks(img: Rgba): { boxes: (Box & { id: number })[]; labels: Int32Array } {
  const { boxes, labels } = islands(img);
  const largest = Math.max(...boxes.map((b) => b.area));
  const keep = new Set(
    boxes.flatMap((b, id) => (b.area >= largest * SPECK_RATIO ? [id] : [])),
  );
  for (let p = 0; p < labels.length; p++) {
    if (labels[p]! >= 0 && !keep.has(labels[p]!)) img.data[p * 4 + 3] = 0;
  }
  const kept = boxes.map((b, id) => ({ ...b, id })).filter((b) => keep.has(b.id));
  return { boxes: kept.sort((a, b) => b.area - a.area), labels };
}

const union = (boxes: readonly Box[]): Box => {
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  const w = Math.max(...boxes.map((b) => b.x + b.w)) - x;
  const h = Math.max(...boxes.map((b) => b.y + b.h)) - y;
  return { x, y, w, h, area: 0 };
};

const toSharp = (img: Rgba) =>
  sharp(img.data, { raw: { width: img.width, height: img.height, channels: 4 } });

interface Sized {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

/** Huevo o cría: limpia, recorta al contenido y escala a un alto fijo. */
async function cleanSingle(file: string, out: string, height: number) {
  const img = await readRgba(file);
  clampAlpha(img);
  const { boxes } = dropSpecks(img);
  const box = union(boxes);
  const buffer = await toSharp(img)
    .extract({ left: box.x, top: box.y, width: box.w, height: box.h })
    .resize({ height, kernel: "lanczos3" })
    .webp(WEBP)
    .toBuffer({ resolveWithObject: true });
  await writeFile(out, buffer.data);
  return {
    sized: { width: buffer.info.width, height: buffer.info.height },
    scale: height / box.h,
  };
}

interface Piece {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

/** Separa los trozos de cáscara (de mayor a menor) y los empaqueta en una fila. */
async function shellSprite(file: string, out: string, scale: number) {
  const img = await readRgba(file);
  chromaKey(img);
  clampAlpha(img);
  const { boxes, labels } = dropSpecks(img);
  const parts = boxes.slice(0, SHELL_PIECES);
  if (parts.length !== SHELL_PIECES)
    throw new Error(`${file}: ${parts.length} trozos, se esperaban ${SHELL_PIECES}`);
  const pieces: Piece[] = [];
  const layers: OverlayOptions[] = [];
  let x = 0;
  for (const part of parts) {
    // Cada trozo solo con sus píxeles, por si la caja de otro se cruza con la suya
    const only = Buffer.alloc(part.w * part.h * 4);
    for (let row = 0; row < part.h; row++) {
      for (let col = 0; col < part.w; col++) {
        const p = (part.y + row) * img.width + part.x + col;
        if (labels[p] !== part.id) continue;
        img.data.copy(only, (row * part.w + col) * 4, p * 4, p * 4 + 4);
      }
    }
    const w = Math.max(1, Math.round(part.w * scale));
    const h = Math.max(1, Math.round(part.h * scale));
    const input = await sharp(only, {
      raw: { width: part.w, height: part.h, channels: 4 },
    })
      .resize(w, h, { kernel: "lanczos3" })
      .png()
      .toBuffer();
    layers.push({ input, left: x, top: 0 });
    pieces.push({ x, y: 0, w, h });
    x += w + SPRITE_GAP;
  }
  const width = x - SPRITE_GAP;
  const height = Math.max(...pieces.map((p) => p.h));
  await sharp({ create: { width, height, channels: 4, background: "#0000" } })
    .composite(layers)
    .webp(WEBP)
    .toFile(out);
  return { width, height, pieces };
}

const kb = async (file: string) =>
  Math.round((await sharp(file).toBuffer()).length / 1024);

async function main() {
  for (const dir of ["eggs", "hatchlings", "shells"]) {
    await mkdir(path.join(OUT, dir), { recursive: true });
  }
  await mkdir(path.dirname(CHECK), { recursive: true });
  const manifest: Record<string, unknown> = {};
  const outputs: string[] = [];
  for (const channel of CHANNELS) {
    const eggOut = path.join(OUT, "eggs", `${channel}.webp`);
    const egg = await cleanSingle(
      path.join(SRC, "huevos", `huevo-${channel}.webp`),
      eggOut,
      EGG_HEIGHT,
    );
    const hatchOut = path.join(OUT, "hatchlings", `${channel}.webp`);
    const hatch = await cleanSingle(
      path.join(SRC, "crias", `cria-${channel}.webp`),
      hatchOut,
      HATCHLING_HEIGHT,
    );
    const shellOut = path.join(OUT, "shells", `${channel}.webp`);
    const shells = await shellSprite(
      path.join(SRC, "cascaras", `cascaras-${channel}.webp`),
      shellOut,
      egg.scale,
    );
    const url = (file: string) =>
      `/${path.relative("public", file).replaceAll("\\", "/")}`;
    const entry: Record<Channel, unknown> = manifest as Record<Channel, unknown>;
    entry[channel] = {
      egg: { src: url(eggOut), ...egg.sized } satisfies Sized,
      hatchling: { src: url(hatchOut), ...hatch.sized } satisfies Sized,
      shells: {
        src: url(shellOut),
        width: shells.width,
        height: shells.height,
        pieces: shells.pieces,
      },
    };
    outputs.push(eggOut, hatchOut, shellOut);
  }
  await writeFile(
    MANIFEST,
    `// Generado por scripts/optimize-contact.ts: no editar a mano.\n` +
      `import type { ContactArt } from "@/types/contact";\n\n` +
      `export const CONTACT_ART: ContactArt = ${JSON.stringify(manifest, null, 2)};\n`,
  );
  await contactSheet(outputs);
  let total = 0;
  for (const file of outputs) {
    const size = await kb(file);
    total += size;
    console.log(`${file}  ${size} KB`);
  }
  console.log(`Total: ${total} KB`);
}

/** Todas las piezas sobre fondo oscuro, para ver a ojo que no queda halo verde. */
async function contactSheet(files: readonly string[]) {
  const tile = 260;
  const cols = 3;
  const tiles = await Promise.all(
    files.map((file) =>
      sharp(file)
        .resize(tile, tile, { fit: "contain", background: { ...DARK, alpha: 1 } })
        .flatten({ background: DARK })
        .toBuffer(),
    ),
  );
  const rows = Math.ceil(files.length / cols);
  await sharp({
    create: { width: cols * tile, height: rows * tile, channels: 3, background: DARK },
  })
    .composite(
      tiles.map((input, i) => ({
        input,
        left: (i % cols) * tile,
        top: Math.floor(i / cols) * tile,
      })),
    )
    .png()
    .toFile(CHECK);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
