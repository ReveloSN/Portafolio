"use client";

import { DigToolbar } from "@/components/molecules/DigToolbar";
import { SkillCell } from "@/components/molecules/SkillCell";
import { SectionShell } from "@/components/templates/SectionShell";
import { DigHorizon } from "@/components/worlds/art/DigHorizon";
import {
  DirtLayerDeep,
  DirtLayerMid,
  DirtLayerTop,
} from "@/components/worlds/art/DirtLayers";
import { FOSSILS } from "@/components/worlds/registry";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { useDigSite } from "@/hooks/useDigSite";
import { DIG_LAYERS_PER_CELL } from "@/lib/constants";
import type { Skill } from "@/types/skill";

interface SkillsProps {
  readonly skills: readonly Skill[];
}

const BACKGROUND =
  "linear-gradient(#08171e 0, #08171e 170px, #2a1c10 170px, #5b3b22 175px, #4a2f1b 520px, #35210f 1000px, #241508 100%)";
const STRATA =
  "repeating-linear-gradient(180deg, transparent 0 150px, rgba(0,0,0,.18) 150px 154px, rgba(255,196,110,.05) 154px 230px)";
const DIRT = [
  <DirtLayerTop key="top" />,
  <DirtLayerMid key="mid" />,
  <DirtLayerDeep key="deep" />,
];

export function Skills({ skills }: SkillsProps) {
  const { skills: copy } = COPY;
  const site = useDigSite(skills.length);
  const message =
    site.found >= skills.length
      ? copy.messages.all
      : site.found
        ? copy.messages.some
        : copy.messages.none;

  return (
    <SectionShell
      id={SECTION_IDS.skills}
      background={BACKGROUND}
      className="pt-[clamp(230px,18vw,280px)] pb-[clamp(90px,9vw,140px)]"
      decoration={
        <>
          <DigHorizon
            preserveAspectRatio="xMidYMax slice"
            className="absolute top-0 left-0 h-[200px] w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[170px] bottom-0"
            style={{ background: STRATA }}
          />
        </>
      }
    >
      <div className="mx-auto max-w-[1240px]">
        <p className="font-display text-glow-amber text-sm font-medium tracking-[.5em]">
          {copy.eyebrow}
        </p>
        <h2 className="font-display mt-3.5 mb-[18px] max-w-[860px] text-[clamp(34px,5vw,72px)] leading-none font-extrabold tracking-[-.02em]">
          {copy.title}
        </h2>
        <p className="mb-[34px] max-w-[600px] text-lg leading-relaxed opacity-85">
          {copy.intro}
        </p>

        <DigToolbar
          label={copy.findings}
          found={site.found}
          total={skills.length}
          message={message}
          digAllLabel={copy.digAll}
          coverLabel={copy.cover}
          onDigAll={site.digAll}
          onCover={site.cover}
        />

        <ul className="grid gap-[26px] md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const dug = site.state.layers[i] ?? 0;
            const left = DIG_LAYERS_PER_CELL - dug;
            const Fossil = FOSSILS[skill.fossil];
            const shake =
              site.state.lastDug === i ? (site.state.tick % 2 ? "hitA" : "hitB") : "";
            return (
              <li key={skill.id} className="dig flex [&>article]:w-full">
                <SkillCell
                  skill={skill}
                  layersDug={dug}
                  totalLayers={DIG_LAYERS_PER_CELL}
                  shake={shake}
                  fossil={<Fossil />}
                  dirtLayers={DIRT}
                  labels={{
                    grid: copy.grid,
                    fossilFound: copy.fossilFound,
                    level: copy.level,
                    stateDone: copy.found,
                    stateLeft: left === 1 ? copy.layerOne : copy.layerMany,
                    hint:
                      dug === 0
                        ? copy.hintStart
                        : left === 1
                          ? copy.hintLast
                          : copy.hintKeep,
                    digAria: `${copy.digLabel} ${skill.name}: ${left} ${left === 1 ? copy.layerOne : copy.layerMany}`,
                  }}
                  onDig={() => site.dig(i)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
