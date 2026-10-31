import { describe, expect, it } from "vitest";
import { LAKE_ART, LAKE_LAYER_ORDER, LAKE_Z } from "@/data/lakeAssets";
import { SCENE_ASPECT } from "@/lib/fishing/scene";

describe("registro del arte del lago", () => {
  it("tiene las cinco capas, del cielo al primer plano, con el aspecto de la escena", () => {
    const zs = LAKE_LAYER_ORDER.map((id) => LAKE_ART[id]?.z);
    expect(zs).toEqual([0, 1, 2, 3, 7]);
    for (const id of LAKE_LAYER_ORDER) {
      const layer = LAKE_ART[id]!;
      expect(layer.width / layer.height).toBeCloseTo(SCENE_ASPECT, 2);
      expect(layer.mobileSrc).toMatch(/-1600\.webp$/);
    }
  });

  it("cada pieza tiene tamaño, anclaje entre 0 y 1 y una profundidad válida", () => {
    const depths = new Set<number>(Object.values(LAKE_Z));
    for (const asset of Object.values(LAKE_ART)) {
      expect(asset!.width).toBeGreaterThan(0);
      expect(asset!.anchor.x).toBeGreaterThanOrEqual(0);
      expect(asset!.anchor.x).toBeLessThanOrEqual(1);
      expect(depths.has(asset!.z)).toBe(true);
    }
    expect(LAKE_ART["bucket-worm"]?.z).toBe(LAKE_Z.objects);
    expect(LAKE_ART["mosasaur-open"]?.z).toBe(LAKE_Z.creatures);
    expect(LAKE_ART["drops"]?.z).toBe(LAKE_Z.fx);
  });
});
