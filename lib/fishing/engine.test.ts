import { describe, expect, it } from "vitest";
import { CREATURES } from "@/data/creatures";
import { CAST_CHARGE_MS, WAIT_MIN_MS, WAIT_SPREAD_MS } from "@/lib/fishing/config";
import {
  chargePower,
  createFishingEngine,
  createInitialState,
} from "@/lib/fishing/engine";
import { depthFromPower, surveySpot } from "@/lib/fishing/creatures";
import { nextRandom } from "@/lib/fishing/random";
import type { Depth, GameMode, GameState } from "@/types/fishing";

const reducer = createFishingEngine(CREATURES);
const SEED = 42;
const FRAME_MS = 16;
const CHARGE = CAST_CHARGE_MS.challenge;
/** Fuerza que cae en el centro de cada zona. */
const POWER: Readonly<Record<Depth, number>> = { shore: 0.15, mid: 0.5, deep: 0.85 };

const start = (mode: GameMode = "challenge") => createInitialState(SEED, mode);

/** Lanza a la zona pedida y espera la picada (o el final de la espera). */
function castTo(state: GameState, depth: Depth, now = 0): GameState {
  const pressed = reducer(state, { type: "press", now });
  const charge = CAST_CHARGE_MS[state.mode];
  const released = reducer(pressed, {
    type: "release",
    now: now + POWER[depth] * charge,
  });
  const biteAt = released.biteAt ?? 0;
  return reducer(released, { type: "tick", now: biteAt, dt: FRAME_MS });
}

/** Pelea en modo relajado a base de pulsaciones. */
function reelRelaxed(state: GameState): GameState {
  let s = reducer(state, { type: "press", now: 0 });
  while (s.phase === "fighting") s = reducer(s, { type: "press", now: 0 });
  return s;
}

/** Pesca en modo relajado lo que pique en la zona. */
const fishAt = (state: GameState, depth: Depth) => reelRelaxed(castTo(state, depth));

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
  it("la fuerza va de 0 a 1 y regresa", () => {
    expect(chargePower(0, "challenge")).toBe(0);
    expect(chargePower(CHARGE, "challenge")).toBe(1);
    expect(chargePower(CHARGE * 1.5, "challenge")).toBeCloseTo(0.5);
  });

  it("la fuerza define la profundidad", () => {
    expect(depthFromPower(0.2)).toBe("shore");
    expect(depthFromPower(0.34)).toBe("mid");
    expect(depthFromPower(0.67)).toBe("deep");
  });

  it("idle → casting → waiting con espera de 1.5 a 4 s y una criatura de esa zona", () => {
    const casting = reducer(start(), { type: "press", now: 100 });
    expect(casting.phase).toBe("casting");
    const waiting = reducer(casting, {
      type: "release",
      now: 100 + POWER.shore * CHARGE,
    });
    expect(waiting.phase).toBe("waiting");
    expect(waiting.depth).toBe("shore");
    expect(["lepidotes", "ammonite"]).toContain(waiting.hooked);
    const wait = (waiting.biteAt ?? 0) - (100 + POWER.shore * CHARGE);
    expect(wait).toBeGreaterThanOrEqual(WAIT_MIN_MS);
    expect(wait).toBeLessThanOrEqual(WAIT_MIN_MS + WAIT_SPREAD_MS);
  });
});

describe("transiciones", () => {
  it("waiting → bite → fighting", () => {
    const bite = castTo(start(), "shore");
    expect(bite.phase).toBe("bite");
    expect(reducer(bite, { type: "press", now: 0 }).phase).toBe("fighting");
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
    const late = reducer(bite, {
      type: "tick",
      now: (bite.biteDeadline ?? 0) + 1,
      dt: FRAME_MS,
    });
    expect(late.phase).toBe("escaped");
    expect(late.escapeReason).toBe("slipped");
    const calm = castTo(start("relaxed"), "shore");
    expect(calm.biteDeadline).toBeNull();
    expect(reducer(calm, { type: "tick", now: 1e9, dt: FRAME_MS }).phase).toBe("bite");
  });

  it("pelea: mantener pulsado rompe el hilo; soltar deja escapar", () => {
    let held = reducer(castTo(start(), "deep"), { type: "press", now: 0 });
    for (let i = 0; i < 1000 && held.phase === "fighting"; i++)
      held = reducer(held, { type: "tick", now: 0, dt: FRAME_MS });
    expect(held.phase).toBe("lineBroken");

    let slack = reducer(reducer(castTo(start(), "shore"), { type: "press", now: 0 }), {
      type: "release",
      now: 0,
    });
    for (let i = 0; i < 2000 && slack.phase === "fighting"; i++)
      slack = reducer(slack, { type: "tick", now: 0, dt: FRAME_MS });
    expect(slack.phase).toBe("escaped");
    expect(slack.escapeReason).toBe("fought");
  });

  it("pelea: dosificar la tensión captura y se puede volver a lanzar", () => {
    let s = reducer(castTo(start(), "shore"), { type: "press", now: 0 });
    for (let i = 0; i < 5000 && s.phase === "fighting"; i++) {
      const action = s.fight.tension < 0.5 ? "press" : "release";
      s = reducer(reducer(s, { type: action, now: 0 }), {
        type: "tick",
        now: 0,
        dt: FRAME_MS,
      });
    }
    expect(s.phase).toBe("caught");
    expect(s.caught).toHaveLength(1);
    expect(reducer(s, { type: "press", now: 0 }).phase).toBe("casting");
  });

  it("las acciones fuera de fase no cambian el estado", () => {
    const idle = start();
    expect(reducer(idle, { type: "release", now: 0 })).toBe(idle);
    expect(reducer(idle, { type: "tick", now: 0, dt: FRAME_MS })).toBe(idle);
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
    let s = start("relaxed");
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
