import { HOOK_WIDTH, widthUnits } from "@/lib/fishing/scene";
import type { LakeAsset } from "@/types/lake";

interface HangingHookProps {
  readonly hook: LakeAsset;
  /** Punto del que cuelga (unidades del SVG). */
  readonly x: number;
  readonly y: number;
}

const hookW = widthUnits(HOOK_WIDTH);

/** El anzuelo colgando en el aire mientras la criatura sale a morderlo. */
export function HangingHook({ hook, x, y }: HangingHookProps) {
  return (
    <image
      href={hook.src}
      x={x - hookW / 2}
      y={y}
      width={hookW}
      height={(hookW * hook.height) / hook.width}
      data-testid="hanging-hook"
    />
  );
}
