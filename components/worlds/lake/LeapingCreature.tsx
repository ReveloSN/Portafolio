import { LakeArt } from "@/components/worlds/lake/LakeArt";
import { CREATURE_BOX } from "@/lib/fishing/scene";
import { cn } from "@/lib/utils";
import type { CreatureSize } from "@/types/fishing";
import type { LakeAsset } from "@/types/lake";

interface LeapingCreatureProps {
  readonly x: number;
  readonly y: number;
  readonly size: CreatureSize;
  readonly asset: LakeAsset;
}

const BIG: ReadonlySet<CreatureSize> = new Set(["large", "huge"]);

/** La criatura capturada salta fuera del agua con un chapoteo. */
export function LeapingCreature({ x, y, size, asset }: LeapingCreatureProps) {
  const { w, h } = CREATURE_BOX[size];
  return (
    <g style={{ transform: `translate(${x}px, ${y}px)` }} data-testid="leaping-creature">
      <ellipse className="lake-splash" rx={w * 0.3} ry="10" cy="4" />
      <g className={cn("lake-leap", BIG.has(size) ? "is-big" : "is-small")}>
        <LakeArt asset={asset} box={{ x: -w / 2, y: -h - 10, w, h }} />
      </g>
    </g>
  );
}
