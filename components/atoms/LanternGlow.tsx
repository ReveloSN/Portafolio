import { LANTERN } from "@/lib/fishing/scene";

/** Halo del farol del muelle: parpadea con un ritmo irregular (dos ciclos de 3 y 5 s). */
export function LanternGlow() {
  return (
    <span
      aria-hidden="true"
      className="lake-lantern-glow"
      style={{ left: `${LANTERN.x}%`, top: `${LANTERN.y}%` }}
    />
  );
}
