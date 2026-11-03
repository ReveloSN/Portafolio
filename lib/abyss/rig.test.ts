import { describe, expect, it } from "vitest";
import { LAKE_RIG } from "@/data/abyss";
import { kidBox, rodPlacement, rodTip } from "@/lib/abyss/rig";

/** Ancho y alto del arte del lago en px (la escena mide 100 % × 100 %). */
const SCENE = { width: 2400, height: 2400 / LAKE_RIG.aspect } as const;
const DEG = Math.PI / 180;

describe("niño y caña sobre el lago", () => {
  it("la caja de una pose arranca en la esquina del lienzo común", () => {
    const box = kidBox({ left: 0, top: 0, width: 0, height: 0 });
    expect(box).toEqual({
      left: LAKE_RIG.kidCanvas.left,
      top: LAKE_RIG.kidCanvas.top,
      width: 0,
      height: 0,
    });
  });

  it("una pose más grande en el lienzo ocupa más de la escena, en proporción", () => {
    const small = kidBox({ left: 10, top: 10, width: 100, height: 100 });
    const large = kidBox({ left: 10, top: 10, width: 200, height: 200 });
    expect(large.width).toBeCloseTo(small.width * 2, 10);
    expect(large.height).toBeCloseTo(small.height * 2, 10);
  });

  it("el dibujo de la caña, girado sobre las manos, termina en la punta de reposo", () => {
    const { left, top, width, rotate, origin } = rodPlacement();
    const art = LAKE_RIG.rodArt;
    // Empuñadura del dibujo en px de la escena: la caja más el pivote
    const grip = {
      x: ((left + (origin.x / 100) * width) / 100) * SCENE.width,
      y:
        ((top + (origin.y / 100) * (width * (art.height / art.width) * LAKE_RIG.aspect)) /
          100) *
        SCENE.height,
    };
    // Las manos del niño están exactamente en la empuñadura
    expect(grip.x).toBeCloseTo((LAKE_RIG.grip.x / 100) * SCENE.width, 3);
    expect(grip.y).toBeCloseTo((LAKE_RIG.grip.y / 100) * SCENE.height, 3);
    // Vector empuñadura → punta del dibujo, a la escala de la escena y girado
    const pxPerArtPx = ((width / 100) * SCENE.width) / art.width;
    const dx = (art.tip.x - art.grip.x) * pxPerArtPx;
    const dy = (art.tip.y - art.grip.y) * pxPerArtPx;
    const angle = rotate * DEG;
    const tip = {
      x: grip.x + dx * Math.cos(angle) - dy * Math.sin(angle),
      y: grip.y + dx * Math.sin(angle) + dy * Math.cos(angle),
    };
    const expected = rodTip();
    expect(tip.x).toBeCloseTo((expected.x / 100) * SCENE.width, 1);
    expect(tip.y).toBeCloseTo((expected.y / 100) * SCENE.height, 1);
  });

  it("la caña en reposo apunta hacia arriba, con el sedal por debajo de la punta", () => {
    const tip = rodTip();
    expect(tip.x).toBeGreaterThan(LAKE_RIG.grip.x);
    expect(tip.y).toBeLessThan(LAKE_RIG.grip.y);
    expect(tip.y).toBeGreaterThan(0);
  });
});
