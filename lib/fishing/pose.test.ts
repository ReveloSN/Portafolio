import { describe, expect, it } from "vitest";
import { kidPose, rodAngle, ROD_ANGLES } from "@/lib/fishing/pose";
import { ROD_REST_DEG, rodTip, ROD_GRIP, DOCK, toUnits } from "@/lib/fishing/scene";

describe("poses del niño y de la caña", () => {
  it("quieto en reposo y esperando, lanzando mientras vuela la boya, recogiendo al pelear", () => {
    expect(kidPose("idle")).toBe("explorer-idle");
    expect(kidPose("waiting")).toBe("explorer-idle");
    expect(kidPose("casting")).toBe("explorer-cast");
    expect(kidPose("fighting")).toBe("explorer-reel");
  });

  it("en reposo la caña está a -35°; la picada y la pelea la doblan hacia el agua", () => {
    expect(rodAngle("idle")).toBe(ROD_REST_DEG);
    expect(rodAngle("casting")).toBe(ROD_REST_DEG);
    expect(rodAngle("bite")).toBe(ROD_ANGLES.bite);
    expect(rodAngle("fighting")).toBe(ROD_ANGLES.fight);
  });

  it("la punta sale de la empuñadura y en reposo queda sobre el agua", () => {
    const tip = rodTip(ROD_REST_DEG);
    expect(tip.y).toBeLessThan(ROD_GRIP.y);
    expect(tip.x).toBeGreaterThan(toUnits({ x: DOCK.right, y: 0 }).x);
  });
});
