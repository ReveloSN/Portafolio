import { describe, expect, it } from "vitest";
import {
  BOBBER_PERCENT,
  BUCKETS,
  DOCK,
  FOLIAGE_FREE_X,
  HOOK_PERCENT,
  HORIZON_Y,
  KID,
  LANTERN,
  PLAY_WATER,
  ROD_TIP_PERCENT,
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

  it("los baldes van en el muelle, libres del follaje y antes del farol y del niño", () => {
    expect(BUCKETS.left).toBeGreaterThanOrEqual(FOLIAGE_FREE_X);
    expect(BUCKETS.left).toBeGreaterThanOrEqual(DOCK.left);
    expect(BUCKETS.right).toBeLessThan(LANTERN.x);
    expect(BUCKETS.right).toBeLessThan(KID.x);
  });

  it("el niño se sienta en el muelle y la caña llega sobre el agua", () => {
    expect(KID.x).toBeGreaterThan(DOCK.left);
    expect(KID.x).toBeLessThan(DOCK.right);
    expect(ROD_TIP_PERCENT.x).toBeGreaterThan(DOCK.right);
    expect(HOOK_PERCENT.y).toBeLessThan(HORIZON_Y);
  });
});
