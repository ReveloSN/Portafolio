import { describe, expect, it } from "vitest";
import { seeded } from "./seeded";

/** Cuántos índices se recorren para comprobar el rango y la dispersión. */
const SAMPLE_INDEXES = 200;
const SAMPLE_SALTS = [0, 1, 2, 3] as const;

describe("seeded", () => {
  it("es determinista: los mismos argumentos devuelven el mismo valor", () => {
    expect(seeded(7, 2)).toBe(seeded(7, 2));
    expect(seeded(0, 0)).toBe(seeded(0, 0));
  });

  it("devuelve siempre un número finito entre 0 (incluido) y 1 (excluido)", () => {
    for (const salt of SAMPLE_SALTS) {
      for (let index = 0; index < SAMPLE_INDEXES; index++) {
        const value = seeded(index, salt);
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    }
  });

  it("cambia con el índice y con la sal", () => {
    const byIndex = new Set(
      Array.from({ length: SAMPLE_INDEXES }, (_, index) => seeded(index, 1)),
    );
    expect(byIndex.size).toBeGreaterThan(SAMPLE_INDEXES / 2);
    expect(seeded(5, 1)).not.toBe(seeded(5, 2));
  });

  it("no depende del orden en que se pidan los valores", () => {
    const forward = Array.from({ length: 10 }, (_, index) => seeded(index, 3));
    const backward = Array.from({ length: 10 }, (_, offset) => seeded(9 - offset, 3));
    expect(backward.reverse()).toEqual(forward);
  });
});
