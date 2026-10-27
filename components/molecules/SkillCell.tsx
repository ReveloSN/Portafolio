import type { ReactNode } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Icon } from "@/components/atoms/Icon";
import { Illustration } from "@/components/atoms/Illustration";
import { BoneMeter } from "@/components/molecules/BoneMeter";
import { ART } from "@/data/art";
import { cn } from "@/lib/utils";
import type { BoneKind, Skill } from "@/types/skill";
import type { ArtEntry } from "@/types/art";

const BONES: Readonly<Record<BoneKind, ArtEntry>> = { femur: ART.bone1, rib: ART.bone2 };

export interface SkillCellLabels {
  readonly grid: string;
  readonly fossilFound: string;
  readonly level: string;
  readonly stateDone: string;
  readonly stateLeft: string;
  readonly hint: string;
  readonly digAria: string;
}

interface SkillCellProps {
  readonly skill: Skill;
  readonly layersDug: number;
  readonly totalLayers: number;
  readonly shake: "hitA" | "hitB" | "";
  readonly fossil: ReactNode;
  /** Capas de arriba abajo: la primera es la que se quita primero. */
  readonly dirtLayers: readonly ReactNode[];
  readonly labels: SkillCellLabels;
  readonly onDig: () => void;
}

export function SkillCell({
  skill,
  layersDug,
  totalLayers,
  shake,
  fossil,
  dirtLayers,
  labels,
  onDig,
}: SkillCellProps) {
  const done = layersDug >= totalLayers;
  const left = totalLayers - layersDug;
  return (
    <article data-testid="dig-cell" className={cn("cell", done && "full")}>
      <div className="flex items-start justify-between gap-2.5">
        <div>
          <p className="text-glow-amber text-fluid-xs font-mono tracking-[.2em]">
            {labels.grid} {skill.grid} · {skill.depth}
          </p>
          <h3 className="font-display text-fluid-lg mt-1.5 leading-[1.1] font-extrabold">
            {skill.name}
          </h3>
          <p className="text-fluid-xs mt-[3px] font-mono tracking-[.16em] opacity-70">
            {skill.area}
          </p>
        </div>
        <Badge>{done ? labels.stateDone : `${left} ${labels.stateLeft}`}</Badge>
      </div>
      <div className={cn("pit", shake)}>
        <div className="find">
          <div className="flex items-center gap-3.5">
            {fossil}
            <p className="text-glow-amber text-fluid-xs font-mono tracking-[.14em]">
              {labels.fossilFound}
            </p>
          </div>
          <p className="text-fluid-sm leading-normal opacity-90">{skill.note}</p>
          <div className="mt-auto flex items-end justify-between gap-3">
            <div className="text-fluid-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Illustration
                  decorative
                  src={ART.boneSmall.src}
                  width={ART.boneSmall.width}
                  height={ART.boneSmall.height}
                  sizes="24px"
                  className="w-5 flex-none"
                />
                {labels.level}
              </span>
              <span className="text-glow-amber mt-1 block">
                {skill.levelLabel} · {skill.percent}%
              </span>
            </div>
            <BoneMeter
              bone={BONES[skill.bone]}
              percent={skill.percent}
              label={`${labels.level} ${skill.name}`}
            />
          </div>
        </div>
        <button
          type="button"
          className={cn("dirt", done && "done")}
          aria-label={labels.digAria}
          onClick={onDig}
        >
          {[...dirtLayers].reverse().map((layer, reversedIndex) => {
            const index = dirtLayers.length - 1 - reversedIndex;
            return (
              <span key={index} className={cn("dl", layersDug > index && "gone")}>
                {layer}
              </span>
            );
          })}
          <span className="dhint">
            <Icon name="shovel" size={16} />
            {labels.hint}
          </span>
        </button>
      </div>
    </article>
  );
}
