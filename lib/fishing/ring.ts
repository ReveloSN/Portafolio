import { RING } from "@/lib/fishing/config";
import { nextRandom } from "@/lib/fishing/random";
import type { GameMode, RingState, RingTuning } from "@/types/fishing";

/**
 * Minijuego del anillo (lógica pura): una aguja gira sobre el anillo y hay que pulsar
 * cuando pasa por el arco de la zona. Cada acierto achica la zona y acelera la aguja; un
 * fallo cuesta una ronda y, en modo desafío, al segundo fallo la criatura se escapa.
 * Ángulos en grados (0 arriba, sentido horario); tiempos en ms del mismo reloj del motor.
 */

const FULL_TURN = 360;
const MS_PER_S = 1000;

/** "early": la aguja aún no arranca (la criatura sigue en el aire); no cuenta. */
export type RingOutcome = "early" | "hit" | "miss" | "caught" | "escaped";

export interface RingStep {
  readonly ring: RingState;
  readonly seed: number;
  readonly outcome: RingOutcome;
}

const wrap = (angle: number) => ((angle % FULL_TURN) + FULL_TURN) % FULL_TURN;

/** Dónde está la aguja en el instante `now` (quieta en `angleAt` hasta `since`). */
export function needleAngle(ring: RingState, now: number): number {
  return wrap(ring.angleAt + (Math.max(0, now - ring.since) * ring.speed) / MS_PER_S);
}

/** ¿El ángulo cae dentro del arco [start, start + size]? (el arco puede cruzar el 0). */
export function inZone(angle: number, start: number, size: number): boolean {
  return wrap(angle - start) <= size;
}

/** Ajuste del modo: el relajado ensancha la zona y frena la aguja. */
function tuned(tuning: RingTuning, mode: GameMode) {
  const relaxed = mode === "relaxed";
  return {
    zone: tuning.zoneDeg * (relaxed ? RING.relaxedZoneFactor : 1),
    speed: tuning.speed * (relaxed ? RING.relaxedSpeedFactor : 1),
  };
}

/**
 * Coloca la zona por delante de la aguja (al menos RING.leadDeg) para que siempre haya
 * tiempo de verla llegar; el resto del recorrido lo decide el azar.
 */
function placeZone(needle: number, size: number, seed: number) {
  const draw = nextRandom(seed);
  const room = Math.max(0, FULL_TURN - RING.leadDeg - size);
  return { start: wrap(needle + RING.leadDeg + draw.value * room), seed: draw.seed };
}

/** Empieza el anillo; la aguja arranca en `startsAt` (tras el salto de la criatura). */
export function startRing(
  tuning: RingTuning,
  mode: GameMode,
  seed: number,
  startsAt: number,
): { readonly ring: RingState; readonly seed: number } {
  const { zone, speed } = tuned(tuning, mode);
  const placed = placeZone(0, zone, seed);
  return {
    ring: {
      needed: tuning.hits,
      hits: 0,
      misses: 0,
      zoneStart: placed.start,
      zoneDeg: zone,
      speed,
      angleAt: 0,
      since: startsAt,
      last: null,
    },
    seed: placed.seed,
  };
}

/** Una pulsación: acierto, fallo, captura o escape; la zona se recoloca en cada ronda. */
export function pressRing(
  ring: RingState,
  mode: GameMode,
  seed: number,
  now: number,
): RingStep {
  if (now < ring.since) return { ring, seed, outcome: "early" };
  const needle = needleAngle(ring, now);
  const hit = inZone(needle, ring.zoneStart, ring.zoneDeg);
  if (hit && ring.hits + 1 >= ring.needed) {
    return { ring: { ...ring, hits: ring.needed }, seed, outcome: "caught" };
  }
  const misses = hit ? ring.misses : ring.misses + 1;
  if (!hit && mode === "challenge" && misses >= RING.maxMisses) {
    return { ring: { ...ring, misses }, seed, outcome: "escaped" };
  }
  const zoneDeg = hit
    ? Math.max(RING.minZoneDeg, ring.zoneDeg * RING.shrink)
    : ring.zoneDeg;
  const speed = hit ? ring.speed * RING.speedUp : ring.speed;
  // Un fallo en desafío cuesta la ronda ganada; en relajado no se pierde nada.
  const lost = !hit && mode === "challenge" ? 1 : 0;
  const placed = placeZone(needle, zoneDeg, seed);
  return {
    ring: {
      ...ring,
      hits: hit ? ring.hits + 1 : Math.max(0, ring.hits - lost),
      misses,
      zoneStart: placed.start,
      zoneDeg,
      speed,
      angleAt: needle,
      since: now,
      last: hit ? "hit" : "miss",
    },
    seed: placed.seed,
    outcome: hit ? "hit" : "miss",
  };
}
