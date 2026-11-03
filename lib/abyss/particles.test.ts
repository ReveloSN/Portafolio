import { describe, expect, it } from "vitest";
import { PARTICLE_LAYERS } from "@/data/abyss";
import { essentialCount, makeMotes, MOBILE_MOTE_SHARE } from "@/lib/abyss/particles";

describe("nieve marina", () => {
  it("el total de motas en escritorio está acotado", () => {
    const total = PARTICLE_LAYERS.reduce((sum, layer) => sum + layer.count, 0);
    expect(total).toBeLessThanOrEqual(30);
  });

  it("en móvil y con puntero táctil quedan menos motas, siempre las mismas", () => {
    expect(MOBILE_MOTE_SHARE).toBeLessThan(0.5);
    for (const layer of PARTICLE_LAYERS) {
      const motes = makeMotes(layer);
      const kept = motes.filter((mote) => !mote.extra);
      expect(kept).toHaveLength(essentialCount(layer));
      expect(kept.length).toBeGreaterThan(0);
      expect(kept.length).toBeLessThan(layer.count);
      // Las esenciales son las primeras: no cambian al pasar de escritorio a móvil
      expect(motes.slice(0, kept.length)).toEqual(kept);
    }
  });

  it("las dos capas no comparten posiciones", () => {
    const [far, near] = PARTICLE_LAYERS.map(makeMotes);
    expect(far?.[0]?.x).not.toBe(near?.[0]?.x);
  });
});
