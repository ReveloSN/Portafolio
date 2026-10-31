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
import type { BaitId, CreatureId, Depth, GameMode, GameState } from "@/types/fishing";

const reducer = createFishingEngine(CREATURES);
const SEED = 42;
const FRAME_MS = 16;
const CHARGE = CAST_CHARGE_MS.challenge;
/** Fuerza que cae en el centro de cada zona. */
const POWER: Readonly<Record<Depth, number>> = { shore: 0.15, mid: 0.5, deep: 0.85 };

const start = (mode: GameMode = "challenge", bait: BaitId = "worm") =>
  createInitialState(SEED, mode, bait);

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

function catchCreature(state: GameState, id: CreatureId): GameState {
  const creature = CREATURES.find((c) => c.id === id)!;
  const baited = reducer(state, { type: "selectBait", bait: creature.baits[0]! });
  return reelRelaxed(castTo(baited, creature.depth));
}

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
    expect(depthFromPower(0.66)).toBe("mid");
    expect(depthFromPower(0.67)).toBe("deep");
  });

  it("idle → casting → waiting con espera de 1.5 a 4 s", () => {
    const casting = reducer(start(), { type: "press", now: 100 });
    expect(casting.phase).toBe("casting");
    const waiting = reducer(casting, {
      type: "release",
      now: 100 + POWER.shore * CHARGE,
    });
    expect(waiting.phase).toBe("waiting");
    expect(waiting.depth).toBe("shore");
    expect(waiting.hooked).toBe("lepidotes");
    const wait = (waiting.biteAt ?? 0) - (100 + POWER.shore * CHARGE);
    expect(wait).toBeGreaterThanOrEqual(WAIT_MIN_MS);
    expect(wait).toBeLessThanOrEqual(WAIT_MIN_MS + WAIT_SPREAD_MS);
  });

  it("la carnada cambia lo que pica en el mismo lugar", () => {
    expect(castTo(start("challenge", "worm"), "shore").hooked).toBe("lepidotes");
    expect(castTo(start("challenge", "firefly"), "shore").hooked).toBe("ammonite");
  });

  it("no cambia la carnada con el anzuelo en el agua", () => {
    const waiting = reducer(reducer(start(), { type: "press", now: 0 }), {
      type: "release",
      now: 200,
    });
    expect(reducer(waiting, { type: "selectBait", bait: "firefly" }).bait).toBe("worm");
  });
});

describe("transiciones", () => {
  it("waiting → bite → fighting", () => {
    const bite = castTo(start(), "shore");
    expect(bite.phase).toBe("bite");
    const fighting = reducer(bite, { type: "press", now: 0 });
    expect(fighting.phase).toBe("fighting");
  });

  it("donde no vive nada, termina en escaped (noBite)", () => {
    const fished = catchCreature(start("relaxed"), "ammonite");
    const again = castTo(
      reducer(fished, { type: "selectBait", bait: "firefly" }),
      "shore",
    );
    expect(again.phase).toBe("escaped");
    expect(again.escapeReason).toBe("noBite");
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

  it("pelea: mantener pulsado rompe el hilo", () => {
    let s = reducer(castTo(start(), "deep"), { type: "press", now: 0 });
    for (let i = 0; i < 1000 && s.phase === "fighting"; i++)
      s = reducer(s, { type: "tick", now: 0, dt: FRAME_MS });
    expect(s.phase).toBe("lineBroken");
    expect(s.caught).toEqual([]);
  });

  it("pelea: soltar deja escapar", () => {
    let s = reducer(reducer(castTo(start(), "shore"), { type: "press", now: 0 }), {
      type: "release",
      now: 0,
    });
    for (let i = 0; i < 2000 && s.phase === "fighting"; i++)
      s = reducer(s, { type: "tick", now: 0, dt: FRAME_MS });
    expect(s.phase).toBe("escaped");
    expect(s.escapeReason).toBe("fought");
  });

  it("pelea: dosificar la tensión captura y suma al contador", () => {
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
    expect(s.caught).toEqual(["lepidotes"]);
    expect(s.lastCatch).toBe("lepidotes");
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
    expect(surveySpot(CREATURES, "deep", "firefly", []).locked).toBe(true);
    const locked = castTo(start("relaxed", "firefly"), "deep");
    expect(locked.escapeReason).toBe("locked");

    let s = start("relaxed");
    for (const id of ["lepidotes", "ammonite", "coelacanth", "ichthyosaur"] as const)
      s = catchCreature(s, id);
    expect(s.caught).toHaveLength(4);
    const hooked = castTo(reducer(s, { type: "selectBait", bait: "firefly" }), "deep");
    expect(hooked.hooked).toBe("megalodon");
  });

  it("las 6 capturas completan el lago", () => {
    let s = start("relaxed");
    for (const creature of CREATURES) s = catchCreature(s, creature.id);
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
