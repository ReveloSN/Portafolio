import { describe, expect, it } from "vitest";
import { SWIPE_MIN_PX, formatCounter, swipeDirection, wrapIndex } from "./lightbox";

describe("wrapIndex", () => {
  it("avanza y retrocede dando la vuelta", () => {
    expect(wrapIndex(0, 1, 5)).toBe(1);
    expect(wrapIndex(4, 1, 5)).toBe(0);
    expect(wrapIndex(0, -1, 5)).toBe(4);
  });

  it("con una sola imagen se queda en ella", () => {
    expect(wrapIndex(0, 1, 1)).toBe(0);
    expect(wrapIndex(0, -1, 1)).toBe(0);
  });
});

describe("swipeDirection", () => {
  it("deslizar a la izquierda pasa a la siguiente y a la derecha a la anterior", () => {
    expect(swipeDirection(300, 300 - SWIPE_MIN_PX)).toBe(1);
    expect(swipeDirection(100, 100 + SWIPE_MIN_PX)).toBe(-1);
  });

  it("un movimiento corto (un toque) no cambia de imagen", () => {
    expect(swipeDirection(200, 200 + SWIPE_MIN_PX - 1)).toBe(0);
  });
});

describe("formatCounter", () => {
  it("cuenta desde uno", () => {
    expect(formatCounter("Captura {n} de {total}", 0, 6)).toBe("Captura 1 de 6");
  });
});
