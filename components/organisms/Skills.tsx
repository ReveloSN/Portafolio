"use client";

import type { CSSProperties } from "react";
import { DigToolbar } from "@/components/molecules/DigToolbar";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SkillCell } from "@/components/molecules/SkillCell";
import { SkillInventory } from "@/components/molecules/SkillInventory";
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
import { buildDigAnnouncement } from "@/lib/digAnnouncement";
import { buildCellLabels } from "@/lib/digLabels";
import { hasDug } from "@/lib/digReducer";
import { projectsBySlug } from "@/lib/collections";
import { projectsUsing } from "@/lib/skills";
import type { Skill } from "@/types/skill";

interface SkillsProps {
  readonly skills: readonly Skill[];
}

const BACKGROUND =
  "linear-gradient(var(--seam-skills-start) 0, var(--seam-skills-start) var(--dig-soil-line), #2a1c10 var(--dig-soil-line), #5b3b22 calc(var(--dig-soil-line) + 5px), #4a2f1b 520px, #35210f 1000px, #241508 calc(100% - var(--seam-blend)), var(--seam-skills-end) 100%)";
/** Línea de tierra del sitio de excavación: ahí cuelgan las raíces del divisor. */
const SOIL = { "--dig-soil-line": "170px" } as CSSProperties;
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
  const items = skills.map((skill) => ({
    skill,
    projects: projectsUsing(skill, projectsBySlug),
  }));
  const message =
    site.found >= skills.length
      ? copy.messages.all
      : site.found
        ? copy.messages.some
        : copy.messages.none;
  const announcement = buildDigAnnouncement(
    site.state,
    skills.map((skill) => skill.name),
    { ...copy.announce, layerOne: copy.layerOne, layerMany: copy.layerMany },
  );

  return (
    <SectionShell
      id={SECTION_IDS.skills}
      palette="night"
      background={BACKGROUND}
      style={SOIL}
      className="pt-[clamp(230px,18vw,280px)] pb-[clamp(90px,9vw,140px)]"
      decoration={
        <>
          <SeamLayer seam="experience-skills" host="lower" />
          <DigHorizon
            sign={copy.sign}
            preserveAspectRatio="xMidYMax slice"
            className="absolute top-0 left-0 h-[200px] w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-(--dig-soil-line) bottom-0"
            style={{ background: STRATA }}
          />
        </>
      }
    >
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*86.1))]">
        <p className="font-display text-glow-amber text-fluid-sm font-medium tracking-[.5em]">
          {copy.eyebrow}
        </p>
        <h2 className="font-display mb-fluid-3 text-display mt-3.5 max-w-[calc(var(--u)*59.7)] leading-none font-extrabold tracking-[-.02em]">
          {copy.title}
        </h2>
        <p className="mb-fluid-4 text-fluid-md max-w-[calc(var(--u)*41.7)] leading-relaxed opacity-85">
          {copy.intro}
        </p>

        {/* Un único anuncio por acción; la barra visible no es una región viva. */}
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement}
        </p>

        <DigToolbar
          groupLabel={copy.toolbarLabel}
          label={copy.findings}
          found={site.found}
          total={skills.length}
          message={message}
          digAllLabel={copy.digAll}
          coverLabel={copy.cover}
          digAllDisabled={site.found >= skills.length}
          coverDisabled={!hasDug(site.state.layers)}
          onDigAll={site.digAll}
          onCover={site.cover}
        />

        <ul className="gap-fluid-4 grid md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ skill, projects }, i) => {
            const dug = site.state.layers[i] ?? 0;
            const Fossil = FOSSILS[skill.fossil];
            const isLast = site.state.lastDug === i;
            const shake = isLast ? (site.state.tick % 2 ? "hitA" : "hitB") : "";
            return (
              <li key={skill.id} className="dig flex [&>article]:w-full">
                <SkillCell
                  skill={skill}
                  projects={projects}
                  layersDug={dug}
                  totalLayers={DIG_LAYERS_PER_CELL}
                  shake={shake}
                  justDug={isLast && site.state.lastEvent === "dig"}
                  fossil={<Fossil />}
                  dirtLayers={DIRT}
                  labels={buildCellLabels(copy, skill.name, dug)}
                  onDig={() => site.dig(i)}
                />
              </li>
            );
          })}
        </ul>

        <SkillInventory
          title={copy.inventoryTitle}
          intro={copy.inventoryIntro}
          usedInLabel={copy.usedIn}
          items={items}
        />
      </div>
    </SectionShell>
  );
}
