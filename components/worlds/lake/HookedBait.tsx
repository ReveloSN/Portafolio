import { BaitArt } from "@/components/worlds/art/BaitArt";
import { HOOK_POINT } from "@/lib/fishing/scene";
import type { BaitId } from "@/types/fishing";

interface HookedBaitProps {
  readonly bait: BaitId;
}

const SIZE = 26;

/** La carnada colgando del anzuelo, lista para lanzar. */
export function HookedBait({ bait }: HookedBaitProps) {
  return (
    <g
      className="lake-hooked"
      transform={`translate(${HOOK_POINT.x - SIZE / 2} ${HOOK_POINT.y - SIZE / 2})`}
      data-testid="hooked-bait"
    >
      <path d={`M${SIZE / 2} -8 v8`} stroke="#c9d2d6" strokeWidth="1.6" />
      <svg width={SIZE} height={SIZE} viewBox="0 0 24 24">
        <BaitArt bait={bait} />
      </svg>
    </g>
  );
}
