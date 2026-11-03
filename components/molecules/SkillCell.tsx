"use client";

import { type ReactNode, useRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Icon } from "@/components/atoms/Icon";
import { Illustration } from "@/components/atoms/Illustration";
import { BoneMeter } from "@/components/molecules/BoneMeter";
import { ART } from "@/data/art";
import { useFocusOnComplete } from "@/hooks/useFocusOnComplete";
import { cn } from "@/lib/utils";
import type { BoneKind, Skill, SkillCellLabels } from "@/types/skill";
import type { ArtEntry } from "@/types/art";

const BONES: Readonly<Record<BoneKind, ArtEntry>> = { femur: ART.bone1, rib: ART.bone2 };

interface SkillCellProps {
  readonly skill: Skill;
  readonly layersDug: number;
  readonly totalLayers: number;
  readonly shake: "hitA" | "hitB" | "";
  /** La última acción del usuario fue excavar esta cuadrícula. */
  readonly justDug: boolean;
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
  justDug,
  fossil,
  dirtLayers,
  labels,
  onDig,
}: SkillCellProps) {
  const done = layersDug >= totalLayers;
  const left = totalLayers - layersDug;
  const headingRef = useRef<HTMLHeadingElement>(null);
  // El botón de excavar desaparece al terminar: el foco pasa al título.
  useFocusOnComplete(done, justDug, headingRef);

  return (
    <article data-testid="dig-cell" className={cn("cell", done && "full")}>
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0">
          <p className="text-glow-amber text-fluid-xs font-mono tracking-[.2em]">
            {labels.grid} {skill.grid} · {skill.depth}
          </p>
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-fluid-lg mt-1.5 rounded-sm leading-[1.1] font-extrabold"
          >
            {skill.name}
          </h3>
          <p className="text-fluid-xs mt-[3px] font-mono tracking-[.16em] opacity-80">
            {skill.area}
          </p>
        </div>
        <Badge>{done ? labels.stateDone : `${left} ${labels.stateLeft}`}</Badge>
      </div>
      <div className={cn("pit", shake)}>
        {/* Mientras el fósil sigue enterrado no se expone a lectores de pantalla. */}
        <div className="find" aria-hidden={done ? undefined : true}>
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
        <div className="dirt">
          {!done && (
            <button
              type="button"
              className="dirtbtn"
              aria-label={labels.digAria}
              onClick={onDig}
            >
              <span className="dhint">
                <Icon name="shovel" size={16} />
                {labels.hint}
              </span>
            </button>
          )}
          {[...dirtLayers].reverse().map((layer, reversedIndex) => {
            const index = dirtLayers.length - 1 - reversedIndex;
            return (
              <span key={index} className={cn("dl", layersDug > index && "gone")}>
                {layer}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}
