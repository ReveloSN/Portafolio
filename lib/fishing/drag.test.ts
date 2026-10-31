import { describe, expect, it } from "vitest";
import { centerOf, DRAG, hasDragged, isInZone, relativeTo } from "@/lib/fishing/drag";

const zone = { left: 100, top: 100, width: 120, height: 120 };

describe("arrastre de la carnada", () => {
  it("un movimiento menor al umbral es un clic", () => {
    expect(hasDragged({ x: 0, y: 0 }, { x: DRAG.thresholdPx - 1, y: 0 })).toBe(false);
    expect(hasDragged({ x: 0, y: 0 }, { x: 0, y: DRAG.thresholdPx })).toBe(true);
  });

  it("la zona de enganche es un círculo alrededor del anzuelo", () => {
    expect(centerOf(zone)).toEqual({ x: 160, y: 160 });
    expect(isInZone({ x: 160, y: 160 }, zone)).toBe(true);
    expect(isInZone({ x: 160 + 59, y: 160 }, zone)).toBe(true);
    // Esquina de la caja: fuera del círculo.
    expect(isInZone({ x: 105, y: 105 }, zone)).toBe(false);
    expect(isInZone({ x: 400, y: 160 }, zone)).toBe(false);
  });

  it("convierte la posición del puntero a coordenadas de la escena", () => {
    expect(relativeTo({ x: 130, y: 150 }, zone)).toEqual({ x: 30, y: 50 });
  });
});
