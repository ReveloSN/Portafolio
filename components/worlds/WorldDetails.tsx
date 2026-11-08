import { DepthPanel } from "@/components/molecules/DepthPanel";
import type { ReactNode } from "react";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { ProjectFactList } from "@/components/molecules/ProjectFactList";
import { COPY } from "@/data/copy";
import type { Project } from "@/types/project";
import type { World } from "@/types/world";

interface WorldDetailsProps {
  readonly world: World;
  readonly project: Project;
  readonly journey: ReactNode;
}

export function WorldDetails({ world, project, journey }: WorldDetailsProps) {
  const { world: copy } = COPY;
  const [first, second, third] = world.depths;
  return (
    <>
      <DepthPanel
        id="contexto"
        depthLabel={`${copy.depth} 1`}
        title={first.title}
        subtitle={first.subtitle}
        kicker={copy.problem.kicker}
        heading={copy.problem.title}
      >
        <p className="text-fluid-md leading-[1.65] opacity-90">{project.problem}</p>
        <ProjectFactList facts={project.facts} labels={copy.facts} />
      </DepthPanel>
      <DepthPanel
        id="desarrollo"
        reverse
        depthLabel={`${copy.depth} 2`}
        title={second.title}
        subtitle={second.subtitle}
        kicker={copy.role.kicker}
        heading={copy.role.title}
      >
        <ul className="flex flex-col gap-3">
          {project.roleItems.map((item) => (
            <li
              key={item}
              className="text-fluid-base flex gap-3 leading-normal opacity-90"
            >
              <span
                aria-hidden="true"
                className="bg-glow mt-2 h-[9px] w-[9px] flex-none rounded-full"
              />
              {item}
            </li>
          ))}
        </ul>
      </DepthPanel>
      {journey}
      <DepthPanel
        id="aporte"
        depthLabel={`${copy.depth} 3`}
        title={third.title}
        subtitle={third.subtitle}
        kicker={copy.result.kicker}
        heading={copy.result.title}
      >
        <div className="flex flex-col gap-5">
          {project.contribution.map((paragraph) => (
            <p key={paragraph} className="text-fluid-md leading-[1.65] opacity-90">
              {paragraph}
            </p>
          ))}
        </div>
      </DepthPanel>
      <section
        id="funcionalidades"
        aria-labelledby="funcionalidades-title"
        className="px-gutter pb-fluid-6 pt-10"
      >
        <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*86.1))]">
          <p className="font-display text-glow text-fluid-xs tracking-[.4em]">
            {copy.featuresKicker}
          </p>
          <h2
            id="funcionalidades-title"
            className="font-display text-fluid-3xl mt-2.5 mb-7 leading-none font-extrabold"
          >
            {copy.featuresTitle}
          </h2>
          <ul className="world-feature-grid">
            {project.features.map((feature, i) => (
              <li key={feature.title}>
                <FeatureCard
                  index={i + 1}
                  title={feature.title}
                  description={feature.description}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
