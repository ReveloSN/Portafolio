/**
 * Optimiza el arte del lago de pesca (reproducible: mismas entradas, mismas salidas).
 *
 *  · Capas (2400 × 1116): limpia el alfa, recorta los árboles bajo el horizonte y busca la
 *    mejor calidad WebP por debajo del presupuesto. Genera además una versión de 1600 px.
 *  · Piezas sueltas sobre verde #00FF00: quita el fondo con un keyer suave, recupera el
 *    color de los bordes (sin halo verde), recorta al contenido y reduce a su tamaño útil.
 *  · La hoja de gotas (4 × 4) se corta en sus 16 celdas: partículas y coronas sueltas.
 *  · Escribe data/lakeArtManifest.json (tamaños, recorte y anclaje) y una hoja de contacto
 *    sobre fondo oscuro para revisar halos: screenshots/lake/assets/sheet.png.
 *
 * Uso:  npm run optimize:lake
 * Los originales viven en imagenes_webp/lago/ y no se modifican.
 */
import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = path.join("imagenes_webp", "lago");
const OUT = path.join("public", "art", "lake");
const MANIFEST = path.join("data", "lakeArtManifest.json");
const SHEET = path.join("screenshots", "lake", "assets", "sheet.png");

const KB = 1024;
const LAYER_BUDGET = 300 * KB;
const LAYER_MOBILE_BUDGET = 160 * KB;
const PIECE_BUDGET = 150 * KB;
const SCENE_BUDGET = 2.5 * KB * KB;
const MOBILE_WIDTH = 1600;
const QUALITIES = [82, 76, 70, 64, 58, 52, 46, 40] as const;
/** Alfa por debajo de este valor es ruido: se descarta. */
const ALPHA_FLOOR = 8;
/** Los árboles terminan en el horizonte: debajo de esta fracción de la altura no hay nada. */
const TREES_HORIZON = 0.59;
/** Color del fondo verde medido en las esquinas de las piezas. */
const KEY = { r: 16, g: 243, b: 14 } as const;
/** Exceso de verde (g − max(r, b)): por debajo es opaco, por encima es fondo. */
const SPILL_OPAQUE = 50;
const SPILL_CLEAR = 140;
const TRIM_PADDING = 2;
/** Exceso de verde (sobre max(r, b)) propio del fondo de la llave, y fracción tolerada. */
const HALO_MARGIN = 70;
const HALO_TOLERANCE = 0.02;
const OPAQUE = 250;

type Folder = "layers" | "explorer" | "props" | "creatures" | "breach" | "fx";

interface Anchor {
  readonly x: number;
  readonly y: number;
}

interface LayerJob {
  readonly id: string;
  readonly file: string;
  readonly quality?: number;
  readonly cutBelow?: number;
}

interface PieceJob {
  readonly id: string;
  readonly file: string;
  readonly folder: Exclude<Folder, "layers">;
  /** Lado mayor tras reducir (px): el doble de lo que ocupa en pantalla grande. */
  readonly maxSide: number;
  /** Punto de la pieza que se coloca sobre su posición en la escena (0 a 1). */
  readonly anchor: Anchor;
}

const BOTTOM: Anchor = { x: 0.5, y: 1 };
const CENTER: Anchor = { x: 0.5, y: 0.5 };
const TOP: Anchor = { x: 0.5, y: 0 };

const LAYERS: readonly LayerJob[] = [
  { id: "sky", file: "capas/lago-cielo.webp", quality: 60 },
  { id: "trees", file: "capas/lago-arboles.webp", cutBelow: TREES_HORIZON },
  { id: "water", file: "capas/lago-agua.webp" },
  { id: "dock", file: "capas/lago-muelle.webp" },
  { id: "foreground", file: "capas/lago-primer-plano.webp" },
];

const piece = (
  id: string,
  file: string,
  folder: PieceJob["folder"],
  maxSide: number,
  anchor: Anchor,
): PieceJob => ({ id, file, folder, maxSide, anchor });

const PIECES: readonly PieceJob[] = [
  piece("explorer-idle", "explorador/explorador-quieto.webp", "explorer", 560, BOTTOM),
  piece("explorer-cast", "explorador/explorador-lanzando.webp", "explorer", 560, BOTTOM),
  piece(
    "explorer-reel",
    "explorador/explorador-recogiendo.webp",
    "explorer",
    560,
    BOTTOM,
  ),
  piece("rod", "explorador/cana.webp", "explorer", 900, { x: 0, y: 0.5 }),
  piece("bobber", "objetos/boya.webp", "props", 160, CENTER),
  piece("hook", "objetos/anzuelo.webp", "props", 160, TOP),
  piece("reeds", "objetos/juncos.webp", "props", 600, BOTTOM),
  piece("catch-fish-1", "criaturas/captura-pez-1.webp", "creatures", 560, CENTER),
  piece("catch-fish-2", "criaturas/captura-pez-2.webp", "creatures", 560, CENTER),
  piece("catch-fish-3", "criaturas/captura-pez-3.webp", "creatures", 560, CENTER),
  piece("catch-fish-4", "criaturas/captura-pez-4.webp", "creatures", 560, CENTER),
  piece("catch-mosasaur", "criaturas/captura-mosasaurio.webp", "creatures", 640, CENTER),
  piece("catch-megalodon", "criaturas/captura-megalodon.webp", "creatures", 640, CENTER),
  piece("mosasaur-open", "salto/mosasaurio-salto-abierta.webp", "breach", 640, BOTTOM),
  piece("mosasaur-closed", "salto/mosasaurio-salto-cerrada.webp", "breach", 640, BOTTOM),
  piece("megalodon-open", "salto/megalodon-salto-abierta.webp", "breach", 640, BOTTOM),
  piece("megalodon-closed", "salto/megalodon-salto-cerrada.webp", "breach", 640, BOTTOM),
  piece("splash-back", "efectos/salpicadura-trasera.webp", "fx", 560, BOTTOM),
  piece("splash-front", "efectos/salpicadura-delantera.webp", "fx", 800, BOTTOM),
];

/**
 * gotas.webp es una hoja de 4 × 4 sprites de 320 px: cada celda se procesa por separado
 * (si no, el recorte deja la hoja entera). Las gotas sueltas son las partículas; las
 * coronas son la salpicadura pequeña del anzuelo al caer. Orden fila por fila.
 */
const DROP_SHEET = {
  file: "efectos/gotas.webp",
  folder: "fx",
  cell: 320,
  columns: 4,
  ids: [
    "particle-1",
    "particle-2",
    "particle-3",
    "splash-crown-1",
    "particle-4",
    "splash-crown-2",
    "splash-crown-3",
    "particle-5",
    "particle-6",
    "splash-crown-4",
    "particle-7",
    "particle-8",
    "splash-crown-5",
    "particle-9",
    "splash-crown-6",
    "particle-10",
  ],
} as const;
const CROWN_MAX_SIDE = 200;
const PARTICLE_MAX_SIDE = 96;

interface ManifestEntry {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly bytes: number;
  readonly anchor: Anchor;
  readonly mobileSrc?: string;
  /** Caja recortada dentro del original (px del original). */
  readonly crop?: { left: number; top: number; width: number; height: number };
}

interface Raw {
  readonly data: Buffer;
  readonly width: number;
  readonly height: number;
}

const toPublic = (file: string) =>
  "/" +
  file
    .split(path.sep)
    .join("/")
    .replace(/^public\//, "");

async function exists(file: string) {
  try {
    return (await stat(file)).size > 0;
  } catch {
    return false;
  }
}

async function readRaw(input: string | Buffer): Promise<Raw> {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/** Prueba calidades de mayor a menor y se queda con la primera que cabe. */
async function encode(raw: Raw, budget: number, resizeWidth?: number, fixed?: number) {
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
function cleanAlpha(raw: Raw, cutBelow?: number) {
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
 * al máximo dejaba filos cian en los peces, donde el azul domina.
 */
function keyOut(raw: Raw) {
  const { data } = raw;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const spill = g - Math.max(r, b);
    const t = (spill - SPILL_OPAQUE) / (SPILL_CLEAR - SPILL_OPAQUE);
    const alpha = 1 - Math.min(1, Math.max(0, t));
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

function contentBox(raw: Raw) {
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

function crop(raw: Raw, box: ReturnType<typeof contentBox>): Raw {
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
async function haloRatio(buffer: Buffer) {
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

async function processLayer(job: LayerJob, manifest: Record<string, ManifestEntry>) {
  const raw = await readRaw(path.join(SOURCE, job.file));
  cleanAlpha(raw, job.cutBelow);
  const desktop = await encode(raw, LAYER_BUDGET, undefined, job.quality);
  const mobile = await encode(raw, LAYER_MOBILE_BUDGET, MOBILE_WIDTH, job.quality);
  const file = path.join(OUT, "layers", `${job.id}.webp`);
  const mobileFile = path.join(OUT, "layers", `${job.id}-${MOBILE_WIDTH}.webp`);
  await writeFile(file, desktop);
  await writeFile(mobileFile, mobile);
  manifest[job.id] = {
    src: toPublic(file),
    mobileSrc: toPublic(mobileFile),
    width: raw.width,
    height: raw.height,
    bytes: desktop.length,
    anchor: { x: 0, y: 0 },
  };
  return `${job.id}: ${Math.round(desktop.length / KB)} KB (+${Math.round(mobile.length / KB)} KB a ${MOBILE_WIDTH} px)`;
}

type PieceTarget = Pick<PieceJob, "id" | "folder" | "maxSide" | "anchor">;

/** Keyer, recorte, reducción y guardado. `origin` sitúa el recorte dentro del original. */
async function savePiece(
  raw: Raw,
  origin: { left: number; top: number },
  job: PieceTarget,
  manifest: Record<string, ManifestEntry>,
) {
  keyOut(raw);
  const trim = contentBox(raw);
  const box = { ...trim, left: trim.left + origin.left, top: trim.top + origin.top };
  const trimmed = crop(raw, trim);
  const scale = Math.min(1, job.maxSide / Math.max(trimmed.width, trimmed.height));
  const width = Math.round(trimmed.width * scale);
  const height = Math.round(trimmed.height * scale);
  const buffer = await encode(trimmed, PIECE_BUDGET, width);
  const file = path.join(OUT, job.folder, `${job.id}.webp`);
  await writeFile(file, buffer);
  const halo = await haloRatio(buffer);
  manifest[job.id] = {
    src: toPublic(file),
    width,
    height,
    bytes: buffer.length,
    anchor: job.anchor,
    crop: box,
  };
  const flag = halo > HALO_TOLERANCE ? " HALO" : "";
  return `${job.id}: ${width}×${height}, ${Math.round(buffer.length / KB)} KB, borde verdoso ${(halo * 100).toFixed(1)} %${flag}`;
}

async function processPiece(job: PieceJob, manifest: Record<string, ManifestEntry>) {
  const source = path.join(SOURCE, job.file);
  if (!(await exists(source))) return `${job.id}: FALTA ${job.file}`;
  return savePiece(await readRaw(source), { left: 0, top: 0 }, job, manifest);
}

/** Corta la hoja de gotas en sus celdas y procesa cada una como pieza propia. */
async function processDropSheet(manifest: Record<string, ManifestEntry>) {
  const sheet = await readRaw(path.join(SOURCE, DROP_SHEET.file));
  const lines: string[] = [];
  for (const [index, id] of DROP_SHEET.ids.entries()) {
    const left = (index % DROP_SHEET.columns) * DROP_SHEET.cell;
    const top = Math.floor(index / DROP_SHEET.columns) * DROP_SHEET.cell;
    const cell = crop(sheet, {
      left,
      top,
      width: DROP_SHEET.cell,
      height: DROP_SHEET.cell,
    });
    const crown = id.startsWith("splash");
    const target: PieceTarget = {
      id,
      folder: DROP_SHEET.folder,
      maxSide: crown ? CROWN_MAX_SIDE : PARTICLE_MAX_SIDE,
      anchor: crown ? BOTTOM : CENTER,
    };
    lines.push(await savePiece(cell, { left, top }, target, manifest));
  }
  return lines;
}

/** Hoja de contacto de las piezas sobre fondo oscuro, para revisar halos a ojo. */
async function contactSheet(manifest: Record<string, ManifestEntry>) {
  const CELL = 220;
  const COLUMNS = 6;
  const ids = Object.keys(manifest).filter((id) => !manifest[id]!.mobileSrc);
  const rows = Math.ceil(ids.length / COLUMNS);
  const tiles = await Promise.all(
    ids.map(async (id, index) => {
      const entry = manifest[id]!;
      const input = await sharp(path.join("public", entry.src))
        .resize(CELL - 20, CELL - 20, { fit: "inside" })
        .toBuffer();
      return {
        input,
        left: (index % COLUMNS) * CELL + 10,
        top: Math.floor(index / COLUMNS) * CELL + 10,
      };
    }),
  );
  await mkdir(path.dirname(SHEET), { recursive: true });
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
    .toFile(SHEET);
}

async function run() {
  const folders: Folder[] = ["layers", "explorer", "props", "creatures", "breach", "fx"];
  // Carpeta generada: se vacía para que no queden archivos de una corrida anterior.
  await rm(OUT, { recursive: true, force: true });
  await Promise.all(
    folders.map((folder) => mkdir(path.join(OUT, folder), { recursive: true })),
  );
  const manifest: Record<string, ManifestEntry> = {};
  for (const job of LAYERS) console.log("  " + (await processLayer(job, manifest)));
  for (const job of PIECES) console.log("  " + (await processPiece(job, manifest)));
  for (const line of await processDropSheet(manifest)) console.log("  " + line);
  const total = Object.values(manifest).reduce((sum, entry) => sum + entry.bytes, 0);
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
  await contactSheet(manifest);
  const verdict =
    total <= SCENE_BUDGET ? "dentro del presupuesto" : "SOBRE EL PRESUPUESTO";
  console.log(`\nPeso total: ${(total / KB / KB).toFixed(2)} MB (${verdict} de 2.5 MB)`);
  console.log(`Manifiesto: ${MANIFEST} · Hoja de contacto: ${SHEET}`);
  if (total > SCENE_BUDGET) process.exitCode = 1;
}

void run();
