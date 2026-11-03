import { CARD_DEPTHS_M, EXTRA_DEPTH_STEP_M } from "@/data/abyss";
import type { AbyssZone, AbyssZoneId, DiveLayout } from "@/types/abyss";
import type { ExperienceEntry } from "@/types/experience";

/** Alto de la ventana en svh: el escenario ocupa una pantalla. */
const VIEWPORT_SVH = 100;
const HALF_VIEWPORT_SVH = VIEWPORT_SVH / 2;

export interface PlacedEntry {
  readonly entry: ExperienceEntry;
  /** Profundidad de la tarjeta, según su posición en la lista visible. */
  readonly meters: number;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Metros de la tarjeta n-ésima; pasado el último valor, sigue bajando a paso fijo. */
export function metersAt(index: number): number {
  const last = CARD_DEPTHS_M.length - 1;
  if (index <= last) return CARD_DEPTHS_M[index] ?? 0;
  return CARD_DEPTHS_M[last] + (index - last) * EXTRA_DEPTH_STEP_M;
}

/** Profundidad de cada entrada visible: al filtrar, se recalculan desde arriba. */
export function placeEntries(
  entries: readonly ExperienceEntry[],
): readonly PlacedEntry[] {
  return entries.map((entry, index) => ({ entry, meters: metersAt(index) }));
}

/** Recorrido de scroll (svh) de la inmersión: su alto menos una pantalla. */
function travel(count: number, layout: DiveLayout): number {
  return layout.surface + count * layout.slot + layout.end - VIEWPORT_SVH;
}

/** --depth (0 a 1) en el que la tarjeta queda centrada en la pantalla. */
export function cardProgress(index: number, count: number, layout: DiveLayout): number {
  const center = layout.surface + (index + 0.5) * layout.slot;
  return clamp01((center - HALF_VIEWPORT_SVH) / travel(count, layout));
}

/** Tarjeta que ocupa el centro de la pantalla; -1 mientras se está en la superficie. */
export function activeIndexAt(progress: number, count: number, layout: DiveLayout) {
  if (count === 0) return -1;
  const middle = progress * travel(count, layout) + HALF_VIEWPORT_SVH;
  const index = Math.floor((middle - layout.surface) / layout.slot);
  return index < 0 ? -1 : Math.min(index, count - 1);
}

/** Avance de la inmersión a partir de la caja de la sección (px). */
export function diveProgress(top: number, height: number, viewport: number) {
  const span = Math.max(1, height - viewport);
  return {
    /** 0 arriba de la sección, 1 cuando su final llega al borde inferior. */
    depth: clamp01(-top / span),
    /** 0 a 1 durante la primera pantalla: el lago sube y se funde. */
    surface: clamp01(-top / Math.max(1, viewport)),
  };
}

/** Zona que domina en una profundidad dada. */
export function zoneAt(depth: number, zones: readonly AbyssZone[]): AbyssZoneId {
  const zone = zones.find((candidate) => depth < candidate.to) ?? zones.at(-1);
  return zone?.id ?? "surface";
}

/**
 * Tramo de --depth en el que las criaturas de una zona se ven: de su inicio a su final,
 * con el fundido de entrada y de salida dentro de la zona (así solo se ven mientras se
 * animan). La primera zona ya está visible al empezar y la última sigue hasta el final.
 */
export function creatureWindow(zone: AbyssZone, fade: number) {
  return {
    from: zone.from <= 0 ? -fade : zone.from,
    to: zone.to >= 1 ? 1 + fade : zone.to,
  };
}

/** "−60 m", con signo menos tipográfico. */
export const formatDepth = (meters: number) => `−${meters} m`;
