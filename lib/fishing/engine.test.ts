import { describe, expect, it } from "vitest";
import { CREATURES } from "@/data/creatures";
import { CAST_FLIGHT_MS, WAIT_MIN_MS, WAIT_SPREAD_MS } from "@/lib/fishing/config";
import { createFishingEngine, createInitialState } from "@/lib/fishing/engine";
import { surveySpot } from "@/lib/fishing/creatures";
import { nextRandom } from "@/lib/fishing/random";
import type { Depth, GameMode, GameState, RingState } from "@/types/fishing";

const reducer = createFishingEngine(CREATURES);
const SEED = 42;
const T0 = 100;
const MS_PER_S = 1000;

const start = (mode: GameMode = "challenge") => createInitialState(SEED, mode);

/** Elige el punto, deja volar la boya y espera la picada (o el final de la espera). */
function castTo(state: GameState, depth: Depth, now = T0): GameState {
  const casting = reducer(state, { type: "cast", depth, now });
  const landed = reducer(casting, { type: "tick", now: casting.landsAt ?? now });
  return reducer(landed, { type: "tick", now: landed.biteAt ?? now });
}

/** Instante en que la aguja pasa por el centro de la zona (o justo enfrente). */
function needleAt(ring: RingState, offsetDeg = 0): number {
  const target = ring.zoneStart + ring.zoneDeg / 2 + offsetDeg;
  const travel = (((target - ring.angleAt) % 360) + 360) % 360;
  return ring.since + (travel / ring.speed) * MS_PER_S;
}

/** Engancha y acierta cada ronda del anillo. */
function land(state: GameState): GameState {
  let s = reducer(state, { type: "press", now: T0 });
  while (s.phase === "fighting" && s.ring) {
    s = reducer(s, { type: "press", now: needleAt(s.ring) });
  }
  return s;
}

const fishAt = (state: GameState, depth: Depth) => land(castTo(state, depth));

describe("generador con semilla", () => {
  it("misma semilla, misma secuencia; siempre entre 0 y 1", () => {
    expect(nextRandom(7)).toEqual(nextRandom(7));
    let seed = 1;
    for (let i = 0; i < 100; i++) {
      const draw = nextRandom(seed);
      expect(draw.value).toBeGreaterThanOrEqual(0);
      expect(draw.value).toBeLessThan(1);
      seed = draw.seed;
    }
  });
});

describe("lanzamiento", () => {
  it("elegir un punto: casting → waiting con espera de 1.5 a 4 s y una criatura de ahí", () => {
    const casting = reducer(start(), { type: "cast", depth: "shore", now: T0 });
    expect(casting.phase).toBe("casting");
    expect(casting.depth).toBe("shore");
    expect(["lepidotes", "ammonite"]).toContain(casting.hooked);
    expect(reducer(casting, { type: "tick", now: T0 + 1 }).phase).toBe("casting");
    const waiting = reducer(casting, { type: "tick", now: T0 + CAST_FLIGHT_MS });
    expect(waiting.phase).toBe("waiting");
    const wait = (waiting.biteAt ?? 0) - (T0 + CAST_FLIGHT_MS);
    expect(wait).toBeGreaterThanOrEqual(WAIT_MIN_MS);
    expect(wait).toBeLessThanOrEqual(WAIT_MIN_MS + WAIT_SPREAD_MS);
  });

  it("no se lanza en plena espera ni en plena pelea", () => {
    const waiting = reducer(start(), { type: "cast", depth: "mid", now: T0 });
    expect(reducer(waiting, { type: "cast", depth: "deep", now: T0 })).toBe(waiting);
  });
});

describe("transiciones", () => {
  it("waiting → bite → fighting con el anillo de la criatura", () => {
    const bite = castTo(start(), "shore");
    expect(bite.phase).toBe("bite");
    const fighting = reducer(bite, { type: "press", now: T0 });
    expect(fighting.phase).toBe("fighting");
    expect(fighting.ring?.needed).toBe(1);
  });

  it("cuando la zona ya no tiene nada, termina en escaped (noBite)", () => {
    const twice = fishAt(fishAt(start("relaxed"), "shore"), "shore");
    expect(twice.caught).toHaveLength(2);
    const empty = castTo(twice, "shore");
    expect(empty.phase).toBe("escaped");
    expect(empty.escapeReason).toBe("noBite");
  });

  it("desafío: la picada sin confirmar se suelta; relajado: espera para siempre", () => {
    const bite = castTo(start("challenge"), "shore");
    const late = reducer(bite, { type: "tick", now: (bite.biteDeadline ?? 0) + 1 });
    expect(late.phase).toBe("escaped");
    expect(late.escapeReason).toBe("slipped");
    const calm = castTo(start("relaxed"), "shore");
    expect(calm.biteDeadline).toBeNull();
    expect(reducer(calm, { type: "tick", now: 1e9 }).phase).toBe("bite");
  });

  it("dos fallos en el anillo: se escapa", () => {
    let s = reducer(castTo(start(), "deep"), { type: "press", now: T0 });
    for (let miss = 0; miss < 2 && s.ring; miss++)
      s = reducer(s, { type: "press", now: needleAt(s.ring, 180) });
    expect(s.phase).toBe("escaped");
    expect(s.escapeReason).toBe("missed");
    expect(s.ring).toBeNull();
  });

  it("acertar captura y se puede volver a lanzar", () => {
    const s = fishAt(start(), "shore");
    expect(s.phase).toBe("caught");
    expect(s.caught).toHaveLength(1);
    expect(reducer(s, { type: "cast", depth: "mid", now: T0 }).phase).toBe("casting");
  });

  it("las acciones fuera de fase no cambian el estado", () => {
    const idle = start();
    expect(reducer(idle, { type: "press", now: T0 })).toBe(idle);
    expect(reducer(idle, { type: "tick", now: T0 })).toBe(idle);
  });
});

describe("megalodón y final", () => {
  it("solo aparece con 4 capturas o más", () => {
    expect(surveySpot(CREATURES, "deep", []).locked).toBe(true);
    const first = fishAt(start("relaxed"), "deep");
    expect(first.lastCatch).toBe("mosasaur");
    expect(castTo(first, "deep").escapeReason).toBe("locked");

    let s = first;
    for (const depth of ["shore", "shore", "mid"] as const) s = fishAt(s, depth);
    expect(s.caught).toHaveLength(4);
    expect(castTo(s, "deep").hooked).toBe("megalodon");
  });

  it("dos lanzamientos por zona completan el lago", () => {
    let s = start("challenge");
    for (const depth of ["shore", "shore", "mid", "mid", "deep", "deep"] as const)
      s = fishAt(s, depth);
    expect(s.phase).toBe("complete");
    expect(s.caught).toHaveLength(6);
  });

  it("sacar todo completa y reiniciar vuelve a cero conservando el modo", () => {
    const all = reducer(start("relaxed"), { type: "revealAll" });
    expect(all.phase).toBe("complete");
    expect(all.caught).toHaveLength(CREATURES.length);
    const again = reducer(all, { type: "reset" });
    expect(again.phase).toBe("idle");
    expect(again.caught).toEqual([]);
    expect(again.mode).toBe("relaxed");
  });
});
