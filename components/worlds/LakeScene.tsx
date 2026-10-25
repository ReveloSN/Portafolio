import { LakeDefs, LakeReeds, LakeScenery } from "@/components/worlds/art/LakeBackdrop";
import { FishIcon } from "@/components/worlds/art/FishIcon";
import { Megalodon } from "@/components/worlds/art/Megalodon";
import { Mosasaur } from "@/components/worlds/art/Mosasaur";
import { cn } from "@/lib/utils";
import type { LakeCssPhase } from "@/lib/fishingView";
import type { RareCreature } from "@/types/fishing";

export type Leaping =
  { readonly kind: "fish"; readonly color: string } | { readonly kind: RareCreature };

interface LakeSceneProps {
  readonly phase: LakeCssPhase;
  readonly leaping: Leaping | null;
  readonly label: string;
}

const ROD_PATH = "M280 240 Q362 168 440 100";
const HOOK_AT = "translate(640 330)";

/** Escena del lago. El estado visual llega solo por `phase` y `leaping`. */
export function LakeScene({ phase, leaping, label }: LakeSceneProps) {
  const leap = phase === "leap";
  return (
    <svg className="lakesvg" viewBox="0 0 1120 520" role="img" aria-label={label}>
      <LakeDefs />
      <LakeScenery />
      <g className={cn("rod", phase === "bite" && "bite")}>
        <path
          d={ROD_PATH}
          stroke="#8a5a2b"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={ROD_PATH}
          stroke="#c7954f"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <path
        className={cn("ln", phase)}
        d="M440 100 Q 604 122 640 324"
        stroke="#eef6e0"
        strokeOpacity=".8"
        strokeWidth="1.6"
        fill="none"
      />
      <g transform={HOOK_AT}>
        <ellipse
          className={cn("rg", phase)}
          cx="0"
          cy="4"
          rx="26"
          ry="7"
          fill="none"
          stroke="#bff6f0"
          strokeWidth="2"
        />
        <ellipse
          className={cn("rg rg2", phase)}
          cx="0"
          cy="4"
          rx="26"
          ry="7"
          fill="none"
          stroke="#bff6f0"
          strokeWidth="2"
        />
        <ellipse
          className={cn("splash", phase)}
          cx="0"
          cy="4"
          rx="40"
          ry="10"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
        />
        <g className={cn("bobi", phase)}>
          <path d="M-8 -2 a8 8 0 0 1 16 0z" fill="#ff5a5a" />
          <path d="M-8 -2 a8 8 0 0 0 16 0z" fill="#fff" />
          <path d="M0 -10v-6" stroke="#fff" strokeWidth="2" />
          <g className={cn("alert", phase)}>
            <circle cx="0" cy="-44" r="15" fill="#ffc46e" />
            <path d="M0 -53v10" stroke="#2a1c08" strokeWidth="4" strokeLinecap="round" />
            <circle cx="0" cy="-35" r="2.6" fill="#2a1c08" />
          </g>
        </g>
      </g>
      <g transform={HOOK_AT}>
        <g
          className={cn("cr", leap && leaping?.kind === "fish" && "sm")}
          style={{ color: leaping?.kind === "fish" ? leaping.color : undefined }}
        >
          <FishIcon x={-60} y={-32} width={120} height={64} />
        </g>
        <g className={cn("cr", leap && leaping?.kind === "mosasaur" && "big")}>
          <Mosasaur x={-250} y={-90} width={500} height={179} />
        </g>
        <g className={cn("cr", leap && leaping?.kind === "megalodon" && "big")}>
          <Megalodon x={-250} y={-110} width={500} height={226} />
        </g>
      </g>
      <LakeReeds />
    </svg>
  );
}
