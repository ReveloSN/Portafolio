import { describe, expect, it } from "vitest";
import { kidPose, rodAngle, ROD_ANGLES } from "@/lib/fishing/pose";
import { ROD_REST_DEG, rodTip, ROD_GRIP, DOCK, toUnits } from "@/lib/fishing/scene";
import { INITIAL_FIGHT } from "@/lib/fishing/tension";

describe("poses del niño y de la caña", () => {
  it("quieto en reposo y esperando, lanzando al cargar, recogiendo en la pelea", () => {
    expect(kidPose("idle")).toBe("explorer-idle");
    expect(kidPose("waiting")).toBe("explorer-idle");
    expect(kidPose("casting")).toBe("explorer-cast");
    expect(kidPose("fighting")).toBe("explorer-reel");
  });

  it("en reposo la caña está a -35° y al cargar se echa hacia atrás", () => {
    expect(rodAngle("idle", 0, INITIAL_FIGHT, "challenge")).toBe(ROD_REST_DEG);
    expect(rodAngle("casting", 1, INITIAL_FIGHT, "challenge")).toBe(
      ROD_REST_DEG - ROD_ANGLES.pullBack,
    );
  });

  it("en la pelea vibra más cuanta más tensión hay", () => {
    const at = (tension: number) =>
      Math.abs(
        rodAngle(
          "fighting",
          0,
          { ...INITIAL_FIGHT, tension, elapsedMs: 25 },
          "challenge",
        ) - ROD_ANGLES.fight,
      );
    expect(at(0)).toBe(0);
    expect(at(0.9)).toBeGreaterThan(at(0.3));
  });

  it("la punta sale de la empuñadura y en reposo queda sobre el agua", () => {
    const tip = rodTip(ROD_REST_DEG);
    expect(tip.y).toBeLessThan(ROD_GRIP.y);
    expect(tip.x).toBeGreaterThan(toUnits({ x: DOCK.right, y: 0 }).x);
  });
});
