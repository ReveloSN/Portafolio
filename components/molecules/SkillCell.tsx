"use client";

import { type ReactNode, useRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Icon } from "@/components/atoms/Icon";
import { TechIcon } from "@/components/atoms/TechIcon";
import { UsedIn } from "@/components/molecules/UsedIn";
import { useFocusOnComplete } from "@/hooks/useFocusOnComplete";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";
import type { Skill, SkillCellLabels } from "@/types/skill";

interface SkillCellProps {
  readonly skill: Skill;
  /** Proyectos donde se usó, ya resueltos desde `skill.usedIn`. */
  readonly projects: readonly Project[];
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
  projects,
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
        {/* Enterrado: inerte (ni foco ni lector de pantalla) hasta quitar la última capa. */}
        <div className="find" inert={!done}>
          <div className="flex items-center gap-3.5">
            {fossil}
            <p className="text-glow-amber text-fluid-xs font-mono tracking-[.14em]">
              {labels.fossilFound}
            </p>
          </div>
          <div className="mt-auto flex items-end gap-3.5">
            <TechIcon id={skill.icon} className="text-glow-amber size-11 flex-none" />
            <UsedIn
              label={labels.usedIn}
              projects={projects}
              className="text-fluid-sm min-w-0"
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
