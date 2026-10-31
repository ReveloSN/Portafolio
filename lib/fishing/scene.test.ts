import { describe, expect, it } from "vitest";
import { LAKE_ART } from "@/data/lakeAssets";
import {
  BOBBER_PERCENT,
  BUCKETS,
  DOCK,
  HOOK_POINT,
  HORIZON_Y,
  KID_LEFT,
  kidPoseBox,
  LANTERN,
  PLAY_WATER,
  ROD_TIP,
  toUnits,
} from "@/lib/fishing/scene";

describe("geometría del lago", () => {
  it("las boyas caen en las aguas de juego, bajo el horizonte", () => {
    for (const point of Object.values(BOBBER_PERCENT)) {
      expect(point.x).toBeGreaterThanOrEqual(PLAY_WATER.left);
      expect(point.x).toBeLessThanOrEqual(PLAY_WATER.right);
      expect(point.y).toBeGreaterThanOrEqual(PLAY_WATER.top);
      expect(point.y).toBeLessThanOrEqual(PLAY_WATER.bottom);
      expect(point.y).toBeGreaterThan(HORIZON_Y);
    }
  });

  it("lejos es más arriba: orilla, medio y abismo suben hacia el horizonte", () => {
    expect(BOBBER_PERCENT.shore.y).toBeGreaterThan(BOBBER_PERCENT.mid.y);
    expect(BOBBER_PERCENT.mid.y).toBeGreaterThan(BOBBER_PERCENT.deep.y);
  });

  it("los baldes van en el muelle y terminan antes que el niño", () => {
    expect(BUCKETS.hitLeft).toBeGreaterThanOrEqual(DOCK.left);
    expect(BUCKETS.hitRight).toBeLessThanOrEqual(KID_LEFT);
  });

  it("las tres poses del niño comparten pies y borde derecho (no saltan)", () => {
    const boxes = (["explorer-idle", "explorer-cast", "explorer-reel"] as const).map(
      (id) => kidPoseBox(LAKE_ART[id]!.crop!),
    );
    const bottoms = boxes.map((box) => box.top + box.height);
    const rights = boxes.map((box) => box.left + box.width);
    for (const value of bottoms) expect(value).toBeCloseTo(bottoms[0]!, 1);
    for (const value of rights) expect(value).toBeCloseTo(rights[0]!, 1);
    expect(boxes[0]!.left).toBeCloseTo(KID_LEFT, 0);
  });

  it("el farol queda detrás del niño y la caña llega sobre el agua", () => {
    const idle = kidPoseBox(LAKE_ART["explorer-idle"]!.crop!);
    expect(LANTERN.x).toBeGreaterThan(idle.left);
    expect(LANTERN.x).toBeLessThan(idle.left + idle.width);
    expect(ROD_TIP.x).toBeGreaterThan(toUnits({ x: DOCK.right, y: 0 }).x);
    expect(HOOK_POINT.y).toBeLessThan(toUnits({ x: 0, y: HORIZON_Y }).y);
  });
});
