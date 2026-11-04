import { describe, expect, it } from "vitest";
import { ABYSS_CREATURES, ABYSS_ZONES, DIVE_LAYOUT, PARTICLE_LAYERS } from "@/data/abyss";
import {
  activeIndexAt,
  cardProgress,
  diveProgress,
  formatDepth,
  metersAt,
  placeEntries,
  zoneAt,
} from "@/lib/abyss/depth";
import { approach, distanceToBox, hasSettled, isLit } from "@/lib/abyss/lantern";
import { makeMotes } from "@/lib/abyss/particles";
import { rodTip } from "@/lib/abyss/rig";
import { sortedExperience } from "@/lib/collections";
import { filterExperience } from "@/lib/experience";

describe("profundidad de las tarjetas", () => {
  it("las 6 entradas bajan cada vez más, de la más reciente a la más antigua", () => {
    const placed = placeEntries(sortedExperience);
    expect(placed).toHaveLength(6);
    const meters = placed.map((item) => item.meters);
    expect(meters).toEqual([...meters].sort((a, b) => a - b));
    expect(new Set(meters).size).toBe(meters.length);
    expect(placed.map((item) => item.entry)).toEqual(sortedExperience);
  });

  it("al filtrar, la primera visible vuelve a la primera profundidad", () => {
    const work = placeEntries(filterExperience(sortedExperience, "work"));
    expect(work[0]?.meters).toBe(metersAt(0));
    expect(work.every((item) => item.entry.kind === "work")).toBe(true);
  });

  it("pasado el último valor sigue bajando", () => {
    expect(metersAt(7)).toBeGreaterThan(metersAt(6));
    expect(metersAt(6)).toBeGreaterThan(metersAt(5));
  });

  it("cada tarjeta es la activa justo en su punto del recorrido", () => {
    for (const count of [1, 3, 6]) {
      const marks = Array.from({ length: count }, (_, i) =>
        cardProgress(i, count, DIVE_LAYOUT),
      );
      expect(marks).toEqual([...marks].sort((a, b) => a - b));
      marks.forEach((mark, i) => {
        expect(mark).toBeGreaterThan(0);
        expect(mark).toBeLessThan(1);
        expect(activeIndexAt(mark, count, DIVE_LAYOUT)).toBe(i);
      });
    }
    expect(activeIndexAt(0, 6, DIVE_LAYOUT)).toBe(-1);
    expect(activeIndexAt(1, 6, DIVE_LAYOUT)).toBe(5);
    expect(activeIndexAt(0.5, 0, DIVE_LAYOUT)).toBe(-1);
  });

  it("el avance sale de la caja de la sección", () => {
    expect(diveProgress(0, 5000, 1000)).toEqual({ depth: 0, surface: 0 });
    expect(diveProgress(-500, 5000, 1000)).toEqual({ depth: 0.125, surface: 0.5 });
    expect(diveProgress(-9000, 5000, 1000)).toEqual({ depth: 1, surface: 1 });
  });

  it("las zonas cubren la inmersión en orden", () => {
    expect(zoneAt(0, ABYSS_ZONES)).toBe("surface");
    expect(zoneAt(0.5, ABYSS_ZONES)).toBe("middle");
    expect(zoneAt(1, ABYSS_ZONES)).toBe("deep");
    expect(formatDepth(60)).toBe("−60 m");
  });
});

describe("criaturas y partículas", () => {
  it("cruces lentos y como mucho 6 animadas por zona (3 en móvil)", () => {
    for (const zone of ABYSS_ZONES) {
      const here = ABYSS_CREATURES.filter((creature) => creature.zone === zone.id);
      expect(here.length).toBeLessThanOrEqual(6);
      expect(here.filter((creature) => creature.mobile).length).toBeLessThanOrEqual(3);
    }
    for (const creature of ABYSS_CREATURES) {
      expect(creature.seconds).toBeGreaterThanOrEqual(30);
      expect(creature.seconds).toBeLessThanOrEqual(70);
    }
    const megalodon = ABYSS_CREATURES.find((creature) => creature.path === "pass");
    expect(megalodon?.seconds).toBe(45);
  });

  it("las motas son fijas por semilla y caen dentro de la escena", () => {
    for (const layer of PARTICLE_LAYERS) {
      const motes = makeMotes(layer);
      expect(motes).toEqual(makeMotes(layer));
      expect(motes).toHaveLength(layer.count);
      for (const mote of motes) {
        expect(mote.x).toBeGreaterThanOrEqual(0);
        expect(mote.x).toBeLessThanOrEqual(100);
        expect(mote.size).toBeGreaterThanOrEqual(layer.size[0]);
        expect(mote.size).toBeLessThanOrEqual(layer.size[1]);
      }
    }
  });
});

describe("linterna y caña", () => {
  it("la inercia acerca sin pasarse y se detiene al llegar", () => {
    const step = approach({ x: 0, y: 0 }, { x: 100, y: 50 }, 0.18);
    expect(step).toEqual({ x: 18, y: 9 });
    expect(approach(step, { x: 100, y: 50 }, 1)).toEqual({ x: 100, y: 50 });
    expect(hasSettled({ x: 10, y: 10 }, { x: 10.2, y: 10 })).toBe(true);
  });

  it("ilumina lo que el haz alcanza", () => {
    const card = { left: 100, top: 100, right: 300, bottom: 200 };
    expect(distanceToBox({ x: 150, y: 150 }, card)).toBe(0);
    expect(isLit({ x: 350, y: 150 }, card, 60)).toBe(true);
    expect(isLit({ x: 500, y: 150 }, card, 60)).toBe(false);
  });

  it("la punta de la caña queda arriba a la derecha de las manos", () => {
    const tip = rodTip();
    expect(tip.x).toBeCloseTo(60.4, 1);
    expect(tip.y).toBeCloseTo(17.2, 1);
  });
});
