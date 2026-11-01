import { describe, expect, it } from "vitest";
import { BOBBER_AT, dangleFrom, rodTip, ROD_REST_DEG } from "@/lib/fishing/scene";
import { rigLayout, type RigInput } from "@/lib/fishing/rig";
import { INITIAL_FIGHT } from "@/lib/fishing/tension";

const base: RigInput = {
  phase: "idle",
  mode: "challenge",
  depth: null,
  power: 0,
  fight: INITIAL_FIGHT,
  breach: "idle",
};

describe("aparejo", () => {
  it("en reposo la boya cuelga bajo la punta de la caña", () => {
    const rig = rigLayout(base);
    expect(rig.tip).toEqual(rodTip(ROD_REST_DEG));
    expect(rig.bobber?.point).toEqual(dangleFrom(rig.tip));
    expect(rig.bobber?.state).toBe("dangling");
  });

  it("esperando, la boya flota en su zona y el sedal va hasta ella", () => {
    const rig = rigLayout({ ...base, phase: "waiting", depth: "mid" });
    expect(rig.bobber?.point).toEqual(BOBBER_AT.mid);
    expect(rig.line.end).toEqual(BOBBER_AT.mid);
  });

  it("al saltar, el anzuelo cuelga sobre el agua con el sedal tenso y sin boya", () => {
    const rig = rigLayout({ ...base, phase: "bite", depth: "deep", breach: "rise" });
    expect(rig.bobber).toBeNull();
    expect(rig.hookInAir?.x).toBe(BOBBER_AT.deep.x);
    expect(rig.hookInAir!.y).toBeLessThan(BOBBER_AT.deep.y);
    expect(rig.line.tautness).toBe(1);
  });

  it("desde el mordisco el anzuelo desaparece", () => {
    const rig = rigLayout({ ...base, phase: "bite", depth: "deep", breach: "snap" });
    expect(rig.hookInAir).toBeNull();
    expect(rig.line.end).toEqual(BOBBER_AT.deep);
  });
});
