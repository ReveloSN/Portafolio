import { describe, expect, it } from "vitest";
import { ABYSS_ZONES, DIVE_LAYOUT } from "@/data/abyss";
import { activeIndexAt, diveProgress, zoneAt } from "@/lib/abyss/depth";
import { KIND_COLOR, countLabel, filterExperience } from "@/lib/experience";
import { sortedExperience } from "@/lib/collections";

describe("zonas de la inmersión", () => {
  it("cubren de 0 a 1 sin huecos ni solapes", () => {
    expect(ABYSS_ZONES[0]?.from).toBe(0);
    expect(ABYSS_ZONES.at(-1)?.to).toBe(1);
    ABYSS_ZONES.slice(1).forEach((zone, i) => {
      expect(zone.from).toBe(ABYSS_ZONES[i]?.to);
    });
  });

  it("la zona cambia justo en el límite y no hay saltos al pasarlo", () => {
    for (const zone of ABYSS_ZONES.slice(0, -1)) {
      expect(zoneAt(zone.to - 0.001, ABYSS_ZONES)).toBe(zone.id);
      expect(zoneAt(zone.to, ABYSS_ZONES)).not.toBe(zone.id);
    }
    expect(zoneAt(5, ABYSS_ZONES)).toBe("deep");
  });

  it("la profundidad y la placa activa solo avanzan al bajar", () => {
    let previous = { depth: -1, active: -2 };
    for (let top = 0; top >= -9000; top -= 150) {
      const { depth } = diveProgress(top, 6000, 900);
      const active = activeIndexAt(depth, 6, DIVE_LAYOUT);
      expect(depth).toBeGreaterThanOrEqual(previous.depth);
      expect(active).toBeGreaterThanOrEqual(previous.active);
      previous = { depth, active };
    }
  });
});

describe("filtros de la experiencia", () => {
  it("cada tipo de experiencia tiene color y el filtrado no modifica la lista", () => {
    const before = [...sortedExperience];
    for (const kind of ["academic", "work"] as const) {
      expect(KIND_COLOR[kind]).toMatch(/^var\(--abyss-/);
      filterExperience(sortedExperience, kind);
    }
    expect(sortedExperience).toEqual(before);
  });

  it("anuncia también cuando no hay resultados", () => {
    expect(countLabel("{shown} de {total}", 0, 6)).toBe("0 de 6");
  });
});
