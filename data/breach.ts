import type { BreachClass, BreachStage, CreatureId } from "@/types/fishing";
import type { LakePieceId } from "@/types/lake";

type TimedStage = Exclude<BreachStage, "idle">;

/** Línea de tiempo de un salto. Alturas y anchos en % de la escena. */
export interface BreachTimeline {
  /** Duración de cada fase (ms); el total es la duración del salto. */
  readonly stages: Readonly<Record<TimedStage, number>>;
  /** Altura que alcanza la boca sobre el agua en el momento del mordisco. */
  readonly peak: number;
  /** Ancho del dibujo de la criatura. */
  readonly width: number;
  /** Giro al subir, al morder y al caer (grados). */
  readonly rotate: Readonly<Record<"rise" | "snap" | "fall", number>>;
  /** Deriva horizontal del arco (los peces pequeños saltan de lado). */
  readonly arc: number;
  readonly droplets: number;
  /** Sacudida de la escena al caer (px; 0 = sin sacudida). */
  readonly shakePx: number;
  /** "profile": el dibujo de perfil de la captura; "breach": los de salto (abierta/cerrada). */
  readonly sprite: "profile" | "breach";
}

export const BREACH: Readonly<Record<BreachClass, BreachTimeline>> = {
  /** Peces: arco corto de ~900 ms con el dibujo de perfil. */
  small: {
    stages: { bulge: 200, rise: 250, snap: 150, fall: 200, splash: 100 },
    peak: 8,
    width: 6,
    rotate: { rise: -40, snap: 0, fall: 40 },
    arc: 3,
    droplets: 12,
    shakePx: 0,
    sprite: "profile",
  },
  /** Medianos: salto vertical de ~1600 ms. */
  mid: {
    stages: { bulge: 300, rise: 450, snap: 300, fall: 350, splash: 200 },
    peak: 18,
    width: 10,
    rotate: { rise: -80, snap: -75, fall: -105 },
    arc: 0,
    droplets: 16,
    shakePx: 3,
    sprite: "profile",
  },
  /**
   * Gigantes: salto vertical de ~2400 ms hasta el ~70 % de la altura de la escena
   * (35 % sobre el agua del abismo); se tragan el anzuelo al subir y muerden arriba.
   */
  giant: {
    stages: { bulge: 300, rise: 700, snap: 400, fall: 600, splash: 400 },
    peak: 35,
    width: 13,
    rotate: { rise: 0, snap: 0, fall: 10 },
    arc: 0,
    droplets: 20,
    shakePx: 6,
    sprite: "breach",
  },
};

/** El megalodón gira ~25° al caer. */
export const BREACH_FALL_TILT: Partial<Readonly<Record<CreatureId, number>>> = {
  megalodon: 25,
};

/** Dibujos de salto: boca abierta al subir, cerrada desde el mordisco. */
export const BREACH_SPRITES: Partial<
  Readonly<
    Record<CreatureId, { readonly open: LakePieceId; readonly closed: LakePieceId }>
  >
> = {
  mosasaur: { open: "mosasaur-open", closed: "mosasaur-closed" },
  megalodon: { open: "megalodon-open", closed: "megalodon-closed" },
};

/** El anzuelo cuelga a esta altura sobre el agua mientras la criatura sube (% de la escena). */
export const HOOK_AIR_LIFT = 8;
