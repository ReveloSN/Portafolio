import { describe, expect, it } from "vitest";
import { boxCenter, inertiaFactor } from "@/lib/abyss/lantern";

const FRAME = 1000 / 60;

describe("inercia de la linterna", () => {
  it("un frame a 60 Hz avanza exactamente la fracción pedida", () => {
    expect(inertiaFactor(0.18, FRAME)).toBeCloseTo(0.18, 10);
  });

  it("va a la misma velocidad a 60, 120 y 144 Hz", () => {
    const half = inertiaFactor(0.18, FRAME / 2);
    // Dos medios frames (120 Hz) llegan al mismo punto que un frame entero
    expect(1 - (1 - half) * (1 - half)).toBeCloseTo(0.18, 10);
    const third = inertiaFactor(0.18, FRAME / 3);
    expect(1 - Math.pow(1 - third, 3)).toBeCloseTo(0.18, 10);
  });

  it("sin inercia llega de golpe y sin tiempo no se mueve", () => {
    expect(inertiaFactor(1, FRAME)).toBe(1);
    expect(inertiaFactor(0.18, 0)).toBe(0);
    expect(inertiaFactor(0.18, -5)).toBe(0);
  });

  it("tras una pausa larga no da un salto mayor que el límite", () => {
    expect(inertiaFactor(0.18, 60_000)).toBe(inertiaFactor(0.18, 100));
    expect(inertiaFactor(0.18, 100)).toBeLessThan(1);
  });
});

describe("centro de una caja", () => {
  it("es el punto medio de sus lados", () => {
    expect(boxCenter({ left: 100, top: 40, right: 300, bottom: 100 })).toEqual({
      x: 200,
      y: 70,
    });
  });
});
