import type { CSSProperties } from "react";
import { ProjectEmblem } from "@/components/molecules/ProjectEmblem";
import { PortalLink } from "@/components/atoms/PortalLink";
import { TechPrints } from "@/components/molecules/TechPrints";
import { getCopy } from "@/lib/locale.server";
import { Button } from "@/components/atoms/Button";
import { ProjectRepoLinks } from "@/components/molecules/ProjectRepoLinks";
import { interpolate } from "@/lib/utils";
import type { Project } from "@/types/project";

export interface ProjectCardLabels {
  readonly github: string;
  readonly enterWorld: string;
  /** Plantilla con `{name}`: da a cada enlace repetido un nombre único. */
  readonly forProject: string;
  readonly newTab: string;
}

interface ProjectCardProps {
  readonly project: Project;
  readonly worldLabel: string;
  readonly accent: string;
  readonly labels: ProjectCardLabels;
}

/** En la tarjeta solo caben tres tecnologías; el resto se resume en "+N". */
const CARD_TECH_LIMIT = 3;

export async function ProjectCard({
  project,
  worldLabel,
  accent,
  labels,
}: ProjectCardProps) {
  const COPY = await getCopy();
  const owner = interpolate(labels.forProject, { name: project.name });
  return (
    <article
      className="project-card"
      style={{ "--world-accent": accent } as CSSProperties}
    >
      <PortalLink
        href={`/mundos/${project.slug}`}
        className="project-card-art"
        aria-label={`${labels.enterWorld} · ${project.name}`}
      >
        <ProjectEmblem slug={project.slug} name={project.name} />
      </PortalLink>
      <div className="project-card-body">
        <div className="project-card-meta">
          <p
            className="world-label text-fluid-xs font-mono tracking-[.25em]"
            style={{ "--world-accent": accent } as CSSProperties}
          >
            {worldLabel}
          </p>
          <span className="project-card-status">{COPY.projects.completed}</span>
        </div>
        <h3 className="font-display text-fluid-xl leading-[1.1] font-extrabold">
          {project.name}
        </h3>
        <p className="project-card-summary text-fluid-base">{project.summary}</p>
        <TechPrints
          technologies={project.technologies}
          label={COPY.projects.technologiesLabel}
          limit={CARD_TECH_LIMIT}
        />
        <div className="project-card-actions">
          <ProjectRepoLinks project={project} label={labels.github} size="sm" />
          <Button variant="ghost" size="sm" href={`/mundos/${project.slug}`}>
            {labels.enterWorld} <span aria-hidden="true">→</span>
            <span className="sr-only"> {owner}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
