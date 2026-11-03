import { describe, expect, it } from "vitest";
import { JAW_LIP_Y, JAW_VIEWBOX, LOWER_TEETH, UPPER_TEETH } from "@/data/jaws";
import { buildTeeth, lipPath, mouthPath, toothPath } from "@/lib/jaws";

describe("buildTeeth", () => {
  const upper = buildTeeth(UPPER_TEETH);
  const lower = buildTeeth(LOWER_TEETH);

  it("crea la cantidad pedida, dentro del lienzo y siempre igual", () => {
    expect(upper).toHaveLength(UPPER_TEETH.count);
    expect(lower).toHaveLength(LOWER_TEETH.count);
    expect(buildTeeth(UPPER_TEETH)).toEqual(upper);
    for (const tooth of [...upper, ...lower]) {
      expect(tooth.x).toBeGreaterThan(0);
      expect(tooth.x).toBeLessThan(JAW_VIEWBOX.width);
    }
  });

  it("las puntas no pasan del labio del otro maxilar", () => {
    const limit = JAW_VIEWBOX.height - JAW_LIP_Y;
    for (const tooth of [...upper, ...lower]) {
      expect(tooth.baseY + tooth.length).toBeLessThanOrEqual(limit);
    }
  });

  it("los dientes de un maxilar caen en los huecos del otro", () => {
    for (const bottom of lower) {
      const gaps = upper.map((top) => Math.abs(top.x - bottom.x));
      expect(Math.min(...gaps)).toBeGreaterThan(UPPER_TEETH.halfWidth);
    }
  });
});

describe("trazados", () => {
  it("el diente es un contorno cerrado", () => {
    const [tooth] = buildTeeth(UPPER_TEETH);
    expect(toothPath(tooth)).toMatch(/^M.*Z$/);
  });

  it("el interior de la boca es un contorno cerrado", () => {
    expect(mouthPath(0, JAW_VIEWBOX.height - JAW_LIP_Y)).toMatch(/^M.*Z$/);
  });

  it("el labio recorre todo el ancho", () => {
    expect(lipPath(JAW_LIP_Y)).toContain(`${JAW_VIEWBOX.width} `);
  });
});
