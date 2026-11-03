import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CARD_DIM_OPACITY } from "@/data/abyss";
import { blend, contrastRatio, parseHex, type Rgb } from "@/lib/abyss/contrast";

const AA_TEXT = 4.5;

/** Valor de un token de color de app/globals.css (la fuente de los colores de las placas). */
function token(name: string): string {
  const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8");
  const match = new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
  if (!match?.[1]) throw new Error(`No existe el token ${name}`);
  return match[1];
}

/**
 * Peor fondo bajo el texto: el principio del degradado de la placa (rgba(14,32,40,.92),
 * el tramo más claro) sobre un agua más clara que cualquiera de las tres zonas.
 */
const LIGHTEST_WATER = parseHex("#3a8f98");
const PLATE: Rgb = blend([14, 32, 40], LIGHTEST_WATER, 0.92);

describe("contraste de las placas (WCAG AA)", () => {
  it("calcula la razón de contraste de WCAG", () => {
    expect(contrastRatio(parseHex("#000000"), parseHex("#ffffff"))).toBeCloseTo(21, 5);
    expect(contrastRatio(parseHex("#777777"), parseHex("#777777"))).toBe(1);
    expect(() => parseHex("rojo")).toThrow();
  });

  it("el texto de la placa se lee a pleno brillo sobre el agua oscura", () => {
    for (const name of [
      "--abyss-ink",
      "--abyss-muted",
      "--abyss-amber",
      "--abyss-lime",
    ]) {
      expect(contrastRatio(parseHex(token(name)), PLATE), name).toBeGreaterThanOrEqual(
        AA_TEXT,
      );
    }
  });

  it("los logros siguen leyéndose antes de que la luz los alcance", () => {
    expect(CARD_DIM_OPACITY).toBeGreaterThan(0);
    expect(CARD_DIM_OPACITY).toBeLessThan(1);
    for (const name of ["--abyss-ink", "--abyss-amber"]) {
      const dimmed = blend(parseHex(token(name)), PLATE, CARD_DIM_OPACITY);
      expect(contrastRatio(dimmed, PLATE), name).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });
});
