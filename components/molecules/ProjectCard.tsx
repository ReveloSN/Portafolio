import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import type { Project } from "@/types/project";

export interface ProjectCardLabels {
  readonly github: string;
  readonly demo: string;
  readonly enterWorld: string;
}

interface ProjectCardProps {
  readonly project: Project;
  readonly worldLabel: string;
  readonly accent: string;
  readonly thumbnail: ReactNode;
  readonly labels: ProjectCardLabels;
}

/** Proporción del dibujo de cada mundo (viewBox 390x460). */
const THUMBNAIL_RATIO = "390 / 460";

export function ProjectCard({
  project,
  worldLabel,
  accent,
  thumbnail,
  labels,
}: ProjectCardProps) {
  return (
    <article className="group hover:border-glow/50 gap-fluid-3 flex flex-col rounded-[30px] border border-white/12 bg-white/4 p-4 pb-7 transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-24px_rgba(166,255,92,.45)]">
      {/* La escena se ve completa: el arco toma la proporción del dibujo (390x460) */}
      <div
        className="mx-auto w-full max-w-[calc(var(--u)*19)] overflow-hidden rounded-[200px_200px_18px_18px] border border-white/14 transition-transform duration-500 group-hover:-translate-y-1"
        style={{ aspectRatio: THUMBNAIL_RATIO }}
      >
        {thumbnail}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-2.5">
        <p className="text-fluid-xs font-mono tracking-[.25em]" style={{ color: accent }}>
          {worldLabel}
        </p>
        <h3 className="font-display text-fluid-xl leading-[1.1] font-extrabold">
          {project.name}
        </h3>
        <p className="text-fluid-base leading-relaxed opacity-80">{project.summary}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-2.5">
          <Button
            variant="dark"
            size="sm"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" />
            {labels.github}
          </Button>
          <Button
            size="sm"
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="vercel" size={14} />
            {labels.demo}
          </Button>
          <Button variant="ghost" size="sm" href={`/mundos/${project.slug}`}>
            {labels.enterWorld} <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
