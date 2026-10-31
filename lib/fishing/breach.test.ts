import { describe, expect, it } from "vitest";
import { BREACH } from "@/data/breach";
import {
  breachDuration,
  breachSteps,
  isBaitInAir,
  makeDroplets,
} from "@/lib/fishing/breach";

describe("salto de las criaturas", () => {
  it("cada clase dura lo previsto: peces 900 ms, medianos 1600 ms, gigantes 2400 ms", () => {
    expect(breachDuration(BREACH.small)).toBe(900);
    expect(breachDuration(BREACH.mid)).toBe(1600);
    expect(breachDuration(BREACH.giant)).toBe(2400);
  });

  it("los gigantes llegan más alto y sacuden más (2 a 6 px)", () => {
    expect(BREACH.giant.peak).toBeGreaterThan(BREACH.mid.peak);
    expect(BREACH.mid.peak).toBeGreaterThan(BREACH.small.peak);
    expect(BREACH.small.shakePx).toBe(0);
    for (const cls of [BREACH.mid, BREACH.giant]) {
      expect(cls.shakePx).toBeGreaterThanOrEqual(2);
      expect(cls.shakePx).toBeLessThanOrEqual(6);
    }
  });

  it("sigue el orden bulge, rise, snap, fall, splash y termina en reposo", () => {
    const stages = breachSteps(BREACH.mid, false).map((step) => step.stage);
    expect(stages).toEqual(["bulge", "rise", "snap", "fall", "splash", "idle"]);
  });

  it("con movimiento reducido no hay salto: aparece quieta y se va", () => {
    const steps = breachSteps(BREACH.giant, true);
    expect(steps.map((step) => step.stage)).toEqual(["snap", "idle"]);
  });

  it("el cebo cuelga en el aire hasta el mordisco", () => {
    expect(isBaitInAir("bulge")).toBe(true);
    expect(isBaitInAir("rise")).toBe(true);
    expect(isBaitInAir("snap")).toBe(false);
  });

  it("las gotas son fijas por semilla, de 12 a 20, y suben antes de caer", () => {
    expect(makeDroplets(20, 7)).toEqual(makeDroplets(20, 7));
    expect(makeDroplets(20, 7)).not.toEqual(makeDroplets(20, 8));
    for (const cls of Object.values(BREACH)) {
      expect(cls.droplets).toBeGreaterThanOrEqual(12);
      expect(cls.droplets).toBeLessThanOrEqual(20);
    }
    for (const drop of makeDroplets(20, 7)) {
      expect(drop.rise).toBeGreaterThan(0);
      expect(drop.sprite).toBeGreaterThanOrEqual(1);
      expect(drop.sprite).toBeLessThanOrEqual(10);
    }
  });
});
