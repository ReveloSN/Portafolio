import { describe, expect, it } from "vitest";
import { BREACH } from "@/data/breach";
import { CREATURES } from "@/data/creatures";
import {
  breachDuration,
  breachLeadMs,
  breachSteps,
  isHookInAir,
  makeDroplets,
  ringLeadMs,
} from "@/lib/fishing/breach";

describe("salto de las criaturas", () => {
  it("cada clase dura lo previsto: peces 1000 ms, medianos 1600 ms, gigantes 2400 ms", () => {
    expect(breachDuration(BREACH.small)).toBe(1000);
    expect(breachDuration(BREACH.mid)).toBe(1600);
    expect(breachDuration(BREACH.giant)).toBe(2400);
  });

  it("todas abultan el agua 300 ms antes de salir", () => {
    for (const cls of Object.values(BREACH)) expect(cls.stages.bulge).toBe(300);
  });

  it("los gigantes llegan más alto y solo ellos sacuden la escena", () => {
    expect(BREACH.giant.peak).toBeGreaterThan(BREACH.mid.peak);
    expect(BREACH.mid.peak).toBeGreaterThan(BREACH.small.peak);
    expect(BREACH.small.shakePx).toBe(0);
    expect(BREACH.mid.shakePx).toBe(0);
    expect(BREACH.giant.shakePx).toBeGreaterThan(0);
  });

  it("la aguja del anillo arranca cuando la criatura vuelve a caer al agua", () => {
    const { stages } = BREACH.giant;
    expect(breachLeadMs(BREACH.giant)).toBe(breachDuration(BREACH.giant) - stages.splash);
    const megalodon = CREATURES.find((creature) => creature.id === "megalodon")!;
    expect(ringLeadMs(megalodon)).toBe(breachLeadMs(BREACH.giant));
  });

  it("sigue el orden bulge, rise, snap, fall, splash y termina en reposo", () => {
    const stages = breachSteps(BREACH.mid, false).map((step) => step.stage);
    expect(stages).toEqual(["bulge", "rise", "snap", "fall", "splash", "idle"]);
  });

  it("con movimiento reducido no hay salto: aparece quieta y se va", () => {
    const steps = breachSteps(BREACH.giant, true);
    expect(steps.map((step) => step.stage)).toEqual(["snap", "idle"]);
  });

  it("el anzuelo cuelga en el aire hasta el mordisco", () => {
    expect(isHookInAir("bulge")).toBe(true);
    expect(isHookInAir("rise")).toBe(true);
    expect(isHookInAir("snap")).toBe(false);
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
