import type { ReactNode } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Icon } from "@/components/atoms/Icon";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/skill";

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
    <article className={cn("cell", done && "full")}>
      <div className="flex items-start justify-between gap-2.5">
        <div>
          <p className="text-glow-amber font-mono text-[11px] tracking-[.2em]">
            {labels.grid} {skill.grid} · {skill.depth}
          </p>
          <h3 className="font-display mt-1.5 text-2xl leading-[1.1] font-extrabold">
            {skill.name}
          </h3>
          <p className="mt-[3px] font-mono text-[11px] tracking-[.16em] opacity-70">
            {skill.area}
          </p>
        </div>
        <Badge>{done ? labels.stateDone : `${left} ${labels.stateLeft}`}</Badge>
      </div>
      <div className={cn("pit", shake)}>
        <div className="find">
          <div className="flex items-center gap-3.5">
            {fossil}
            <p className="text-glow-amber font-mono text-xs tracking-[.14em]">
              {labels.fossilFound}
            </p>
          </div>
          <p className="text-sm leading-normal opacity-90">{skill.note}</p>
          <div className="mt-auto">
            <div className="flex justify-between text-[13px] font-semibold">
              <span>{labels.level}</span>
              <span className="text-glow-amber">
                {skill.levelLabel} · {skill.percent}%
              </span>
            </div>
            <div className="mt-1.5">
              <ProgressBar
                percent={skill.percent}
                label={`${labels.level} ${skill.name}`}
              />
            </div>
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
