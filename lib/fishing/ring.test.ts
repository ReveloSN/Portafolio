import { describe, expect, it } from "vitest";
import { CREATURES } from "@/data/creatures";
import { RING } from "@/lib/fishing/config";
import { inZone, needleAngle, pressRing, startRing } from "@/lib/fishing/ring";
import type { CreatureId, RingState, RingTuning } from "@/types/fishing";

const SEED = 42;
const T0 = 1000;
const MS_PER_S = 1000;

const tuning = (id: CreatureId): RingTuning => {
  const creature = CREATURES.find((item) => item.id === id);
  if (!creature) throw new Error(id);
  return creature.ring;
};

/** Instante en que la aguja pasa por el centro de la zona (desde `ring.since`). */
function centerTime(ring: RingState): number {
  const target = ring.zoneStart + ring.zoneDeg / 2;
  const travel = (((target - ring.angleAt) % 360) + 360) % 360;
  return ring.since + (travel / ring.speed) * MS_PER_S;
}

/** Instante en que la aguja está justo enfrente de la zona (fallo seguro). */
function oppositeTime(ring: RingState): number {
  const target = ring.zoneStart + ring.zoneDeg / 2 + 180;
  const travel = (((target - ring.angleAt) % 360) + 360) % 360;
  return ring.since + (travel / ring.speed) * MS_PER_S;
}

describe("ángulos y zonas", () => {
  it("la aguja avanza a su velocidad y da la vuelta", () => {
    const { ring } = startRing(tuning("lepidotes"), "challenge", SEED, T0);
    const quarter = (90 / ring.speed) * MS_PER_S;
    expect(needleAngle(ring, T0)).toBe(0);
    expect(needleAngle(ring, T0 + quarter)).toBeCloseTo(90);
    expect(needleAngle(ring, T0 + 5 * quarter)).toBeCloseTo(90);
  });

  it("la zona puede cruzar el 0", () => {
    expect(inZone(350, 340, 40)).toBe(true);
    expect(inZone(10, 340, 40)).toBe(true);
    expect(inZone(30, 340, 40)).toBe(false);
  });

  it("la zona nace por delante de la aguja", () => {
    for (let seed = 1; seed < 50; seed++) {
      const { ring } = startRing(tuning("mosasaur"), "challenge", seed, T0);
      expect(ring.zoneStart).toBeGreaterThanOrEqual(RING.leadDeg - 1e-9);
      expect(ring.zoneStart + ring.zoneDeg).toBeLessThanOrEqual(360 + 1e-9);
    }
  });

  it("la misma semilla coloca la zona igual", () => {
    const a = startRing(tuning("megalodon"), "challenge", SEED, T0);
    const b = startRing(tuning("megalodon"), "challenge", SEED, T0);
    expect(a).toEqual(b);
  });
});

describe("aciertos por criatura", () => {
  it.each([
    ["lepidotes", 1],
    ["ammonite", 1],
    ["coelacanth", 1],
    ["ichthyosaur", 1],
    ["mosasaur", 2],
    ["megalodon", 3],
  ] as const)("%s se captura con %i aciertos", (id, hits) => {
    let { ring, seed } = startRing(tuning(id), "challenge", SEED, T0);
    for (let round = 1; round <= hits; round++) {
      const step = pressRing(ring, "challenge", seed, centerTime(ring));
      expect(step.outcome).toBe(round === hits ? "caught" : "hit");
      ({ ring, seed } = step);
    }
  });

  it("cada acierto achica la zona y acelera la aguja", () => {
    const start = startRing(tuning("megalodon"), "challenge", SEED, T0);
    const step = pressRing(start.ring, "challenge", start.seed, centerTime(start.ring));
    expect(step.ring.zoneDeg).toBeLessThan(start.ring.zoneDeg);
    expect(step.ring.speed).toBeGreaterThan(start.ring.speed);
  });

  it("las criaturas grandes giran más rápido y con zona más estrecha", () => {
    const small = tuning("lepidotes");
    const huge = tuning("megalodon");
    expect(huge.speed).toBeGreaterThan(small.speed);
    expect(huge.zoneDeg).toBeLessThan(small.zoneDeg);
  });

  it("la aguja sigue sin saltos tras un acierto", () => {
    const start = startRing(tuning("mosasaur"), "challenge", SEED, T0);
    const at = centerTime(start.ring);
    const step = pressRing(start.ring, "challenge", start.seed, at);
    expect(needleAngle(step.ring, at)).toBeCloseTo(needleAngle(start.ring, at));
  });
});

describe("espera de la aguja", () => {
  it("quieta hasta que arranca; pulsar antes no cuenta", () => {
    const startsAt = T0 + 1500;
    const { ring, seed } = startRing(tuning("mosasaur"), "challenge", SEED, startsAt);
    expect(needleAngle(ring, T0)).toBe(0);
    const early = pressRing(ring, "challenge", seed, T0 + 100);
    expect(early.outcome).toBe("early");
    expect(early.ring).toBe(ring);
  });
});

describe("fallos", () => {
  it("un fallo cuesta una ronda y al segundo se escapa", () => {
    const start = startRing(tuning("mosasaur"), "challenge", SEED, T0);
    const hit = pressRing(start.ring, "challenge", start.seed, centerTime(start.ring));
    expect(hit.ring.hits).toBe(1);
    const miss = pressRing(hit.ring, "challenge", hit.seed, oppositeTime(hit.ring));
    expect(miss.outcome).toBe("miss");
    expect(miss.ring.hits).toBe(0);
    expect(miss.ring.misses).toBe(1);
    const gone = pressRing(miss.ring, "challenge", miss.seed, oppositeTime(miss.ring));
    expect(gone.outcome).toBe("escaped");
  });

  it("en modo relajado la zona es el doble, la aguja más lenta y no hay límite", () => {
    const challenge = startRing(tuning("megalodon"), "challenge", SEED, T0).ring;
    let { ring, seed } = startRing(tuning("megalodon"), "relaxed", SEED, T0);
    expect(ring.zoneDeg).toBeCloseTo(challenge.zoneDeg * RING.relaxedZoneFactor);
    expect(ring.speed).toBeLessThan(challenge.speed);
    for (let miss = 0; miss < 10; miss++) {
      const step = pressRing(ring, "relaxed", seed, oppositeTime(ring));
      expect(step.outcome).toBe("miss");
      ({ ring, seed } = step);
    }
    expect(pressRing(ring, "relaxed", seed, centerTime(ring)).outcome).toBe("hit");
  });
});
