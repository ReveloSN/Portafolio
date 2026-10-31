import { describe, expect, it } from "vitest";
import { PROGRESS, TENSION } from "@/lib/fishing/config";
import {
  INITIAL_FIGHT,
  isInGreenZone,
  relaxedTap,
  stepFight,
  type FightInput,
  type FightStep,
} from "@/lib/fishing/tension";
import type { FightState } from "@/types/fishing";

const FRAME_MS = 16;
const base: FightInput = {
  holding: true,
  mode: "challenge",
  fishPull: 0.3,
  difficulty: 0.3,
  dtMs: FRAME_MS,
};

/** Repite pasos hasta que la pelea termina o se acaba el tiempo. */
function run(
  start: FightState,
  input: (fight: FightState) => FightInput,
  maxMs = 60_000,
): FightStep {
  let step: FightStep = { fight: start, outcome: "fighting" };
  for (let t = 0; t < maxMs && step.outcome === "fighting"; t += FRAME_MS) {
    step = stepFight(step.fight, input(step.fight));
  }
  return step;
}

describe("tension", () => {
  it("la zona verde va de 0.35 a 0.65", () => {
    expect(isInGreenZone(0.34)).toBe(false);
    expect(isInGreenZone(0.35)).toBe(true);
    expect(isInGreenZone(0.65)).toBe(true);
    expect(isInGreenZone(0.66)).toBe(false);
  });

  it("pulsado sube la tensión y avanza; suelto baja y retrocede", () => {
    const held = stepFight({ ...INITIAL_FIGHT, tension: 0.4 }, base).fight;
    expect(held.tension).toBeGreaterThan(0.4);
    expect(held.progress).toBeGreaterThan(PROGRESS.start);

    const slack = stepFight(
      { ...INITIAL_FIGHT, tension: 0.4 },
      { ...base, holding: false },
    ).fight;
    expect(slack.tension).toBeLessThan(0.4);
    expect(slack.progress).toBeLessThan(PROGRESS.start);
  });

  it("rinde más dentro de la zona verde que fuera", () => {
    const inside = stepFight({ ...INITIAL_FIGHT, tension: 0.5 }, base).fight.progress;
    const outside = stepFight({ ...INITIAL_FIGHT, tension: 0.1 }, base).fight.progress;
    expect(inside).toBeGreaterThan(outside);
  });

  it("rompe el hilo tras 400 ms por encima de 0.95, no antes", () => {
    const red = { ...INITIAL_FIGHT, tension: 1 };
    const almost = stepFight(red, { ...base, dtMs: TENSION.breakAfterMs - 1 });
    expect(almost.outcome).toBe("fighting");
    const broken = stepFight(almost.fight, { ...base, dtMs: 1 });
    expect(broken.outcome).toBe("lineBroken");
  });

  it("bajar de 0.95 reinicia el contador de rotura", () => {
    const red = stepFight({ ...INITIAL_FIGHT, tension: 1 }, { ...base, dtMs: 300 }).fight;
    const eased = stepFight({ ...red, tension: 0.5 }, { ...base, holding: false }).fight;
    expect(eased.overTensionMs).toBe(0);
  });

  it("mantener pulsado sin soltar termina rompiendo el hilo", () => {
    expect(run(INITIAL_FIGHT, () => base).outcome).toBe("lineBroken");
  });

  it("soltar del todo deja escapar a la criatura", () => {
    expect(run(INITIAL_FIGHT, () => ({ ...base, holding: false })).outcome).toBe(
      "escaped",
    );
  });

  it("mantener la tensión en la zona verde termina en captura", () => {
    const player = (fight: FightState): FightInput => ({
      ...base,
      holding: fight.tension < 0.5,
    });
    expect(run(INITIAL_FIGHT, player).outcome).toBe("caught");
  });

  it("modo relajado: sin tensión, solo avanza y nunca retrocede", () => {
    const held = stepFight(INITIAL_FIGHT, {
      ...base,
      mode: "relaxed",
      fishPull: 1,
    }).fight;
    expect(held.tension).toBe(0);
    expect(held.progress).toBeGreaterThan(PROGRESS.start);
    const idle = stepFight(held, { ...base, mode: "relaxed", holding: false }).fight;
    expect(idle.progress).toBe(held.progress);
  });

  it("modo relajado: unas pocas pulsaciones capturan", () => {
    let step: FightStep = { fight: INITIAL_FIGHT, outcome: "fighting" };
    let taps = 0;
    while (step.outcome === "fighting") {
      step = relaxedTap(step.fight);
      taps += 1;
    }
    expect(step.outcome).toBe("caught");
    expect(taps).toBeLessThanOrEqual(3);
  });
});

describe("equilibrio", () => {
  it("el tirón más fuerte (megalodón en furia) se puede ganar jugando bien", () => {
    const player = (fight: FightState): FightInput => ({
      ...base,
      fishPull: 1,
      difficulty: 0.8,
      holding: fight.tension < 0.5,
    });
    expect(run(INITIAL_FIGHT, player).outcome).toBe("caught");
  });
});
