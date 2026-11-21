import { WorldCover } from "@/components/worlds/WorldCover";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ProjectRepoLinks } from "@/components/molecules/ProjectRepoLinks";
import { LanguageSwitch } from "@/components/molecules/LanguageSwitch";
import { TechPrints } from "@/components/molecules/TechPrints";
import { getCopy } from "@/lib/locale.server";
import type { Project } from "@/types/project";
import type { World } from "@/types/world";

interface WorldHeroProps {
  readonly world: World;
  readonly project: Project;
  readonly ownerName: string;
}

export async function WorldHero({ project, ownerName }: WorldHeroProps) {
  const COPY = await getCopy();
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
        <div className="flex items-center gap-3">
          <p className="font-display text-fluid-lg font-extrabold tracking-[.04em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.5)]">
            {ownerName}
          </p>
          <LanguageSwitch />
        </div>
      </div>
      <div className="world-hero-copy">
        <h1
          data-testid="world-title"
          className="world-hero-title font-display mt-3 font-extrabold"
        >
          {project.name}
        </h1>
        <p className="world-hero-description">{project.tagline}</p>
        <TechPrints
          technologies={project.technologies}
          label={projects.technologiesLabel}
          tone="night"
          className="mb-fluid-3"
        />
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
              <Icon name={project.download.kind === "web" ? "external" : "download"} />
              {project.download.label}
              <span className="sr-only"> {projects.newTab}</span>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
