import { describe, expect, it } from "vitest";
import { carouselDotLabel, carouselOffset, wrapIndex } from "./carousel";

describe("wrapIndex", () => {
  it("deja intacto un índice dentro del rango", () => {
    expect(wrapIndex(1, 3)).toBe(1);
  });

  it("vuelve al inicio al pasar del final", () => {
    expect(wrapIndex(3, 3)).toBe(0);
    expect(wrapIndex(7, 3)).toBe(1);
  });

  it("vuelve al final al bajar de cero", () => {
    expect(wrapIndex(-1, 3)).toBe(2);
    expect(wrapIndex(-4, 3)).toBe(2);
  });

  it("devuelve 0 si no hay elementos", () => {
    expect(wrapIndex(5, 0)).toBe(0);
  });
});

describe("carouselOffset", () => {
  it("marca el activo con 0", () => {
    expect(carouselOffset(1, 1, 3)).toBe(0);
  });

  it("marca el siguiente con 1 y el anterior con -1", () => {
    expect(carouselOffset(2, 1, 3)).toBe(1);
    expect(carouselOffset(0, 1, 3)).toBe(-1);
  });

  it("es circular en los extremos", () => {
    expect(carouselOffset(0, 2, 3)).toBe(1);
    expect(carouselOffset(2, 0, 3)).toBe(-1);
  });

  it("con dos elementos el otro es siempre el siguiente", () => {
    expect(carouselOffset(1, 0, 2)).toBe(1);
    expect(carouselOffset(0, 1, 2)).toBe(1);
  });
});

describe("carouselDotLabel", () => {
  it("incluye la posición (desde 1) y el total", () => {
    expect(carouselDotLabel("Testimonio {n} de {total}", 1, 3)).toBe("Testimonio 2 de 3");
  });
});
