import { WorldCover } from "@/components/worlds/WorldCover";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ProjectRepoLinks } from "@/components/molecules/ProjectRepoLinks";
import { COPY } from "@/data/copy";
import type { Project } from "@/types/project";
import type { World } from "@/types/world";

interface WorldHeroProps {
  readonly world: World;
  readonly project: Project;
  readonly ownerName: string;
}

export function WorldHero({ world, project, ownerName }: WorldHeroProps) {
  const { world: copy, projects } = COPY;
  return (
    <header className="world-hero relative overflow-hidden">
      <WorldCover slug={project.slug} hero />
      <div className="world-hero-shade" />
      <div className="world-hero-top">
        <Button
          variant="dark"
          href="/"
          className="bg-[rgba(3,20,26,.85)] hover:-translate-x-1.5 hover:translate-y-0"
        >
          <span aria-hidden="true">←</span> {copy.back}
        </Button>
        <p className="font-display text-fluid-lg font-extrabold tracking-[.04em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.5)]">
          {ownerName}
        </p>
      </div>
      <div className="world-hero-copy">
        <p className="font-display text-glow text-fluid-sm font-medium tracking-[.5em]">
          MUNDO {world.number} · {world.name}
        </p>
        <h1
          data-testid="world-title"
          className="world-hero-title font-display mt-3 font-extrabold"
        >
          {project.name}
        </h1>
        <p className="world-hero-description">{project.tagline}</p>
        <ul className="mb-fluid-3 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="text-fluid-xs rounded-full border border-white/35 bg-white/8 px-3 py-[5px] font-mono"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <ProjectRepoLinks
            project={project}
            label={projects.github}
            testId="world-cta-code"
          />
          {project.download ? (
            <Button
              variant="lime"
              href={project.download.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="download" />
              {project.download.label}
              <span className="sr-only"> {projects.newTab}</span>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
