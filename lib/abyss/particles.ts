import { seeded } from "@/lib/seeded";
import type { ParticleLayerSpec } from "@/types/abyss";

/** Una mota de nieve marina: posición (%), tamaño (--u) y ritmo (s). */
export interface Mote {
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly duration: number;
  readonly delay: number;
}

/** Sal distinta por capa: las dos capas no comparten posiciones. */
const SALT: Readonly<Record<ParticleLayerSpec["id"], number>> = { far: 11, near: 23 };
/** Variación de la velocidad de subida entre motas (±). */
const RISE_SPREAD = 0.35;

/** Posiciones fijas por semilla: el render del servidor y del cliente coinciden. */
export function makeMotes(layer: ParticleLayerSpec): readonly Mote[] {
  const salt = SALT[layer.id];
  const [minSize, maxSize] = layer.size;
  return Array.from({ length: layer.count }, (_, i) => {
    const duration =
      layer.rise * (1 - RISE_SPREAD + seeded(i, salt + 4) * RISE_SPREAD * 2);
    return {
      x: Math.round(seeded(i, salt) * 1000) / 10,
      y: Math.round(seeded(i, salt + 1) * 1000) / 10,
      size: Number((minSize + seeded(i, salt + 2) * (maxSize - minSize)).toFixed(2)),
      duration: Math.round(duration),
      delay: -Math.round(seeded(i, salt + 3) * duration),
    };
  });
}
