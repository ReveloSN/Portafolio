import type { ComponentType } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ParallaxStage } from "@/components/molecules/ParallaxStage";
import { COPY } from "@/data/copy";
import type { Project } from "@/types/project";
import type { World } from "@/types/world";

interface WorldHeroProps {
  readonly world: World;
  readonly project: Project;
  readonly ownerName: string;
  readonly Scene: ComponentType;
}

export function WorldHero({ world, project, ownerName, Scene }: WorldHeroProps) {
  const { world: copy, projects } = COPY;
  return (
    <ParallaxStage as="header" className="relative h-[860px] overflow-hidden">
      <Scene />
      <div className="px-gutter absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-4 py-7">
        <Button
          variant="dark"
          href="/"
          className="bg-[rgba(3,20,26,.85)] hover:-translate-x-1.5 hover:translate-y-0"
        >
          <span aria-hidden="true">←</span> {copy.back}
        </Button>
        <p className="font-display text-xl font-extrabold tracking-[.04em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.5)]">
          {ownerName}
        </p>
      </div>
      <div className="right-gutter left-gutter absolute bottom-14">
        <p className="font-display text-glow text-[15px] font-medium tracking-[.5em]">
          MUNDO {world.number} · {world.name}
        </p>
        <h1 className="font-display mt-2.5 mb-3 text-[clamp(40px,7vw,104px)] leading-[.95] font-extrabold tracking-[-.02em] [text-shadow:0_8px_40px_rgba(0,0,0,.5)]">
          {project.name}
        </h1>
        <p className="mb-5 max-w-[620px] text-[clamp(17px,1.6vw,21px)] leading-normal [text-shadow:0_2px_14px_rgba(0,0,0,.6)]">
          {project.tagline}
        </p>
        <ul className="mb-[22px] flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/35 bg-white/8 px-3 py-[5px] font-mono text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="dark"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" />
            {projects.github}
          </Button>
          <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="vercel" size={14} />
            {projects.demo}
          </Button>
        </div>
      </div>
    </ParallaxStage>
  );
}
