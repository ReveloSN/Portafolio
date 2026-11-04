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
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  BOTTOM,
  CENTER,
  HALO_TOLERANCE,
  KB,
  TOP,
  cleanAlpha,
  contactSheet,
  contentBox,
  crop,
  encode,
  exists,
  haloRatio,
  keyOut,
  readRaw,
  toPublic,
  type Anchor,
  type Raw,
} from "./lib/art";

const SOURCE = path.join("imagenes_webp", "lago");
const OUT = path.join("public", "art", "lake");
const MANIFEST = path.join("data", "lakeArtManifest.json");
const SHEET = path.join("screenshots", "lake", "assets", "sheet.png");

const LAYER_BUDGET = 300 * KB;
const LAYER_MOBILE_BUDGET = 160 * KB;
const PIECE_BUDGET = 150 * KB;
const SCENE_BUDGET = 2.5 * KB * KB;
const MOBILE_WIDTH = 1600;
/** Los árboles terminan en el horizonte: debajo de esta fracción de la altura no hay nada. */
const TREES_HORIZON = 0.59;

type Folder = "layers" | "explorer" | "props" | "creatures" | "breach" | "fx";

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
  const pieces = Object.values(manifest).filter((entry) => !entry.mobileSrc);
  await contactSheet(
    pieces.map((entry) => entry.src),
    SHEET,
  );
  const verdict =
    total <= SCENE_BUDGET ? "dentro del presupuesto" : "SOBRE EL PRESUPUESTO";
  console.log(`\nPeso total: ${(total / KB / KB).toFixed(2)} MB (${verdict} de 2.5 MB)`);
  console.log(`Manifiesto: ${MANIFEST} · Hoja de contacto: ${SHEET}`);
  if (total > SCENE_BUDGET) process.exitCode = 1;
}

void run();
