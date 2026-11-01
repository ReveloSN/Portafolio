/**
 * Herramientas compartidas por los scripts de optimización de arte (lago y abismo):
 * lectura en crudo, codificación WebP bajo presupuesto, keyer del fondo verde con despill,
 * recorte al contenido, medición de halos y hoja de contacto sobre fondo oscuro.
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const KB = 1024;
const QUALITIES = [82, 76, 70, 64, 58, 52, 46, 40] as const;
/** Alfa por debajo de este valor es ruido: se descarta. */
export const ALPHA_FLOOR = 8;
/** Color del fondo verde medido en las esquinas de las piezas. */
const KEY = { r: 16, g: 243, b: 14 } as const;
/** Exceso de verde (g − max(r, b)): por debajo es opaco, por encima es fondo. */
const SPILL_OPAQUE = 50;
const SPILL_CLEAR = 140;
const TRIM_PADDING = 2;
/** Exceso de verde (sobre max(r, b)) propio del fondo de la llave, y fracción tolerada. */
const HALO_MARGIN = 70;
export const HALO_TOLERANCE = 0.02;
const OPAQUE = 250;

export interface Anchor {
  readonly x: number;
  readonly y: number;
}

export const BOTTOM: Anchor = { x: 0.5, y: 1 };
export const CENTER: Anchor = { x: 0.5, y: 0.5 };
export const TOP: Anchor = { x: 0.5, y: 0 };

export interface Raw {
  readonly data: Buffer;
  readonly width: number;
  readonly height: number;
}

export interface Box {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

export const toPublic = (file: string) =>
  "/" +
  file
    .split(path.sep)
    .join("/")
    .replace(/^public\//, "");

export async function exists(file: string) {
  try {
    return (await stat(file)).size > 0;
  } catch {
    return false;
  }
}

export async function readRaw(input: string | Buffer): Promise<Raw> {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/** Prueba calidades de mayor a menor y se queda con la primera que cabe. */
export async function encode(
  raw: Raw,
  budget: number,
  resizeWidth?: number,
  fixed?: number,
) {
  const ladder = fixed ? [fixed] : QUALITIES;
  let best: Buffer | null = null;
  for (const quality of ladder) {
    let image = sharp(raw.data, {
      raw: { width: raw.width, height: raw.height, channels: 4 },
    });
    if (resizeWidth) image = image.resize({ width: resizeWidth });
    best = await image
      .webp({ quality, alphaQuality: 90, effort: 6, smartSubsample: true })
      .toBuffer();
    if (best.length <= budget) break;
  }
  return best!;
}

/** Alfa por debajo del umbral a cero y, en lo transparente, color negro (comprime mejor). */
export function cleanAlpha(raw: Raw, cutBelow?: number) {
  const { data, width, height } = raw;
  const cutRow = cutBelow === undefined ? height : Math.floor(height * cutBelow);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (y >= cutRow || data[i + 3]! < ALPHA_FLOOR) data.fill(0, i, i + 4);
    }
  }
}

/**
 * Keyer: el exceso de verde decide el alfa; en los bordes se descuenta el verde del fondo
 * (descontaminación) y se limita el verde al promedio de rojo y azul (despill). Limitarlo
 * al máximo dejaba filos cian en los peces, donde el azul domina. Si el original ya trae
 * transparencia, se respeta la menor de las dos.
 */
export function keyOut(raw: Raw) {
  const { data } = raw;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const spill = g - Math.max(r, b);
    const t = (spill - SPILL_OPAQUE) / (SPILL_CLEAR - SPILL_OPAQUE);
    const alpha = Math.min(1 - Math.min(1, Math.max(0, t)), data[i + 3]! / 255);
    if (alpha * 255 < ALPHA_FLOOR) {
      data.fill(0, i, i + 4);
      continue;
    }
    if (alpha < 1) {
      const unmix = (c: number, k: number) =>
        Math.min(255, Math.max(0, Math.round((c - (1 - alpha) * k) / alpha)));
      data[i] = unmix(r, KEY.r);
      data[i + 1] = unmix(g, KEY.g);
      data[i + 2] = unmix(b, KEY.b);
    }
    const limit = Math.round((data[i]! + data[i + 2]!) / 2);
    if (alpha < 1 && data[i + 1]! > limit) data[i + 1] = limit;
    data[i + 3] = Math.round(alpha * 255);
  }
}

export function contentBox(raw: Raw): Box {
  const { data, width, height } = raw;
  let left = width;
  let top = height;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3]! < ALPHA_FLOOR) continue;
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }
  left = Math.max(0, left - TRIM_PADDING);
  top = Math.max(0, top - TRIM_PADDING);
  right = Math.min(width - 1, right + TRIM_PADDING);
  bottom = Math.min(height - 1, bottom + TRIM_PADDING);
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

export function crop(raw: Raw, box: Box): Raw {
  const out = Buffer.alloc(box.width * box.height * 4);
  for (let y = 0; y < box.height; y++) {
    const from = ((box.top + y) * raw.width + box.left) * 4;
    raw.data.copy(out, y * box.width * 4, from, from + box.width * 4);
  }
  return { data: out, width: box.width, height: box.height };
}

/**
 * Fracción de píxeles de borde (alfa parcial) con un verde tan saturado como el del fondo
 * de la llave. Los verdes del propio arte (peces, follaje) no llegan a ese exceso.
 */
export async function haloRatio(buffer: Buffer) {
  const { data } = await readRaw(buffer);
  let edge = 0;
  let green = 0;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3]!;
    if (a < ALPHA_FLOOR || a > OPAQUE) continue;
    edge++;
    if (data[i + 1]! - Math.max(data[i]!, data[i + 2]!) > HALO_MARGIN) green++;
  }
  return edge === 0 ? 0 : green / edge;
}

/** Hoja de contacto de las piezas sobre fondo oscuro, para revisar halos a ojo. */
export async function contactSheet(sources: readonly string[], output: string) {
  const CELL = 220;
  const COLUMNS = 6;
  if (sources.length === 0) return;
  const rows = Math.ceil(sources.length / COLUMNS);
  const tiles = await Promise.all(
    sources.map(async (src, index) => {
      const input = await sharp(path.join("public", src))
        .resize(CELL - 20, CELL - 20, { fit: "inside" })
        .toBuffer();
      return {
        input,
        left: (index % COLUMNS) * CELL + 10,
        top: Math.floor(index / COLUMNS) * CELL + 10,
      };
    }),
  );
  await mkdir(path.dirname(output), { recursive: true });
  await sharp({
    create: {
      width: COLUMNS * CELL,
      height: rows * CELL,
      channels: 4,
      background: "#0b1418",
    },
  })
    .composite(tiles)
    .png()
    .toFile(output);
}
