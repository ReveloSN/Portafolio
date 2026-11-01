/**
 * Optimiza el arte de la inmersión de la sección Experiencia (reproducible).
 *
 *  · Fondos opacos (imagenes_webp/abismo/fondos): WebP calidad 60, < 300 KB, con una
 *    versión de 960 px para móviles.
 *  · Capas, objetos y criaturas sobre verde #00FF00: keyer con despill (sin halo verde),
 *    recorte al contenido, reducción a su tamaño útil y < 150 KB.
 *  · Las criaturas que ya existían salen de imagenes_webp/lago/criaturas.
 *  · Cada pieza se busca por prefijo dentro de su carpeta; si falta, se anota y se sigue:
 *    la sección dibuja un sustituto vectorial o con degradados.
 *  · Escribe data/abyssArtManifest.json y una hoja de contacto sobre fondo oscuro en
 *    screenshots/abyss/assets/sheet.png. Falla si el total pasa de 2 MB.
 *
 * Uso:  npm run optimize:abyss
 * Los originales no se modifican.
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  HALO_TOLERANCE,
  KB,
  contactSheet,
  contentBox,
  crop,
  encode,
  haloRatio,
  keyOut,
  readRaw,
  toPublic,
} from "./lib/art";

const ABYSS = path.join("imagenes_webp", "abismo");
const LAKE = path.join("imagenes_webp", "lago");
const OUT = path.join("public", "art", "abyss");
const MANIFEST = path.join("data", "abyssArtManifest.json");
const SHEET = path.join("screenshots", "abyss", "assets", "sheet.png");

const BACKDROP_BUDGET = 300 * KB;
const BACKDROP_MOBILE_BUDGET = 120 * KB;
const BACKDROP_QUALITY = 60;
const BACKDROP_WIDTH = 1920;
const BACKDROP_MOBILE_WIDTH = 960;
const PIECE_BUDGET = 150 * KB;
const SECTION_BUDGET = 2 * KB * KB;

type Folder = "backdrops" | "layers" | "props" | "creatures";

interface Job {
  readonly id: string;
  readonly folder: Folder;
  /** Carpeta del original y prefijos de nombre aceptados, en orden de preferencia. */
  readonly dir: string;
  readonly prefixes: readonly string[];
  /** Lado mayor tras reducir (px): el doble de lo que ocupa en pantalla grande. */
  readonly maxSide: number;
}

interface ManifestEntry {
  readonly src: string;
  readonly mobileSrc?: string;
  readonly width: number;
  readonly height: number;
  readonly bytes: number;
}

const job = (
  id: string,
  folder: Folder,
  dir: string,
  prefixes: readonly string[],
  maxSide = BACKDROP_WIDTH,
): Job => ({ id, folder, dir, prefixes, maxSide });

const BACKDROPS: readonly Job[] = [
  job("surface", "backdrops", path.join(ABYSS, "fondos"), ["abismo-1", "superficie"]),
  job("middle", "backdrops", path.join(ABYSS, "fondos"), ["abismo-2", "media"]),
  job("deep", "backdrops", path.join(ABYSS, "fondos"), ["abismo-3", "profunda"]),
];

const CAPAS = path.join(ABYSS, "capas");
const OBJETOS = path.join(ABYSS, "objetos");
const CRIATURAS = path.join(ABYSS, "criaturas");
const LAKE_CREATURES = path.join(LAKE, "criaturas");

const PIECES: readonly Job[] = [
  job("rays", "layers", CAPAS, ["rayos", "luz"], 1600),
  job("kelp-left", "layers", CAPAS, ["algas-izquierda", "algas-1", "algas"], 1400),
  job("kelp-right", "layers", CAPAS, ["algas-derecha", "algas-2"], 1400),
  job("lantern", "props", OBJETOS, ["linterna-buceo", "linterna"], 160),
  job("particle", "props", OBJETOS, ["particula"], 64),
  job("fish-1", "creatures", LAKE_CREATURES, ["captura-pez-1"], 420),
  job("fish-2", "creatures", LAKE_CREATURES, ["captura-pez-2"], 420),
  job("fish-3", "creatures", LAKE_CREATURES, ["captura-pez-3"], 480),
  job("fish-4", "creatures", LAKE_CREATURES, ["captura-pez-4"], 480),
  job("mosasaur", "creatures", LAKE_CREATURES, ["captura-mosasaurio"], 760),
  job("megalodon", "creatures", LAKE_CREATURES, ["captura-megalodon"], 1400),
  job("abyssal-fish", "creatures", CRIATURAS, ["pez-abisal", "abisal"], 480),
  job("jelly-1", "creatures", CRIATURAS, ["medusa-1", "medusa"], 360),
  job("jelly-2", "creatures", CRIATURAS, ["medusa-2"], 360),
];

/** Sin tildes ni mayúsculas, para comparar nombres de archivo. */
const normalize = (name: string) =>
  name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Primer archivo de la carpeta cuyo nombre empieza por alguno de los prefijos. */
async function findSource(item: Job): Promise<string | null> {
  // Si la carpeta no existe, no hay original: se usa el sustituto.
  const files = (await readdir(item.dir).catch(() => [] as string[])).sort();
  for (const prefix of item.prefixes) {
    const match = files.find((file) => normalize(file).startsWith(prefix));
    if (match) return path.join(item.dir, match);
  }
  return null;
}

const outFile = (item: Job, suffix = "") =>
  path.join(OUT, item.folder, `${item.id}${suffix}.webp`);

async function processBackdrop(item: Job, source: string) {
  const raw = await readRaw(source);
  const width = Math.min(raw.width, BACKDROP_WIDTH);
  const scale = width / raw.width;
  const desktop = await encode(raw, BACKDROP_BUDGET, width, BACKDROP_QUALITY);
  const mobile = await encode(
    raw,
    BACKDROP_MOBILE_BUDGET,
    BACKDROP_MOBILE_WIDTH,
    BACKDROP_QUALITY,
  );
  await writeFile(outFile(item), desktop);
  await writeFile(outFile(item, "-mobile"), mobile);
  const entry: ManifestEntry = {
    src: toPublic(outFile(item)),
    mobileSrc: toPublic(outFile(item, "-mobile")),
    width,
    height: Math.round(raw.height * scale),
    bytes: desktop.length + mobile.length,
  };
  const over = desktop.length > BACKDROP_BUDGET ? " SOBRE 300 KB" : "";
  return { entry, line: `${Math.round(desktop.length / KB)} KB${over}` };
}

async function processPiece(item: Job, source: string) {
  const raw = await readRaw(source);
  keyOut(raw);
  const trimmed = crop(raw, contentBox(raw));
  const scale = Math.min(1, item.maxSide / Math.max(trimmed.width, trimmed.height));
  const width = Math.round(trimmed.width * scale);
  const height = Math.round(trimmed.height * scale);
  const buffer = await encode(trimmed, PIECE_BUDGET, width);
  await writeFile(outFile(item), buffer);
  const halo = await haloRatio(buffer);
  const flag = halo > HALO_TOLERANCE ? " HALO" : "";
  const entry: ManifestEntry = {
    src: toPublic(outFile(item)),
    width,
    height,
    bytes: buffer.length,
  };
  const line = `${width}×${height}, ${Math.round(buffer.length / KB)} KB, borde verdoso ${(halo * 100).toFixed(1)} %${flag}`;
  return { entry, line };
}

async function run() {
  const folders: Folder[] = ["backdrops", "layers", "props", "creatures"];
  // Carpeta generada: se vacía para que no queden archivos de una corrida anterior.
  await rm(OUT, { recursive: true, force: true });
  await Promise.all(
    folders.map((folder) => mkdir(path.join(OUT, folder), { recursive: true })),
  );
  const manifest: Record<string, ManifestEntry> = {};
  const missing: string[] = [];
  for (const item of [...BACKDROPS, ...PIECES]) {
    const source = await findSource(item);
    if (!source) {
      missing.push(`${item.id} (${item.dir}/${item.prefixes[0]}*.webp)`);
      continue;
    }
    const isBackdrop = item.folder === "backdrops";
    const result = isBackdrop
      ? await processBackdrop(item, source)
      : await processPiece(item, source);
    manifest[item.id] = result.entry;
    console.log(`  ${item.id}: ${result.line}`);
  }
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
  if (missing.length > 0) {
    console.log(`\nFaltan ${missing.length} originales (se usa el sustituto):`);
    for (const line of missing) console.log(`  · ${line}`);
  }
  const verdict =
    total <= SECTION_BUDGET ? "dentro del presupuesto" : "SOBRE EL PRESUPUESTO";
  console.log(`\nPeso total: ${(total / KB / KB).toFixed(2)} MB (${verdict} de 2 MB)`);
  console.log(`Manifiesto: ${MANIFEST} · Hoja de contacto: ${SHEET}`);
  if (total > SECTION_BUDGET) process.exitCode = 1;
}

void run();
