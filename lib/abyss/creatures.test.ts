import { describe, expect, it } from "vitest";
import { ABYSS_CREATURES, ABYSS_ZONES, ZONE_FADE } from "@/data/abyss";
import { creatureWindow } from "@/lib/abyss/depth";

describe("criaturas de la inmersión", () => {
  it("como mucho 4 animadas a la vez en escritorio y 3 en móvil", () => {
    for (const zone of ABYSS_ZONES) {
      const here = ABYSS_CREATURES.filter((creature) => creature.zone === zone.id);
      expect(here.length).toBeLessThanOrEqual(4);
      expect(here.filter((creature) => creature.mobile).length).toBeLessThanOrEqual(3);
    }
  });

  it("cada criatura pertenece a una zona que existe y los ids no se repiten", () => {
    const zones = new Set(ABYSS_ZONES.map((zone) => zone.id));
    expect(ABYSS_CREATURES.every((creature) => zones.has(creature.zone))).toBe(true);
    expect(new Set(ABYSS_CREATURES.map((creature) => creature.id)).size).toBe(
      ABYSS_CREATURES.length,
    );
  });

  it("solo se ven mientras se animan: su fundido cae dentro de su zona", () => {
    const windows = ABYSS_ZONES.map((zone) => creatureWindow(zone, ZONE_FADE));
    // La primera ya está visible al empezar y la última sigue hasta el final
    expect(windows[0]?.from).toBeLessThan(0);
    expect(windows.at(-1)?.to).toBeGreaterThan(1);
    // Las zonas del medio conservan sus límites: nadie se ve fuera de su zona
    ABYSS_ZONES.forEach((zone, i) => {
      const window = windows[i];
      if (zone.from > 0) expect(window?.from).toBe(zone.from);
      if (zone.to < 1) expect(window?.to).toBe(zone.to);
    });
    // Cada ventana deja sitio al fundido de entrada y al de salida
    for (const { from, to } of windows) expect(to - from).toBeGreaterThan(ZONE_FADE * 2);
  });
});
