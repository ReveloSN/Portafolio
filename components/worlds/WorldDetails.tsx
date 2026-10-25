import { DepthPanel } from "@/components/molecules/DepthPanel";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { COPY } from "@/data/copy";
import type { Project } from "@/types/project";
import type { World } from "@/types/world";

interface WorldDetailsProps {
  readonly world: World;
  readonly project: Project;
}

export function WorldDetails({ world, project }: WorldDetailsProps) {
  const { world: copy } = COPY;
  const [first, second, third] = world.depths;
  return (
    <>
      <DepthPanel
        depthLabel={`${copy.depth} 1`}
        title={first.title}
        subtitle={first.subtitle}
        kicker={copy.problem.kicker}
        heading={copy.problem.title}
      >
        <p className="text-lg leading-[1.65] opacity-90">{project.problem}</p>
      </DepthPanel>
      <DepthPanel
        reverse
        depthLabel={`${copy.depth} 2`}
        title={second.title}
        subtitle={second.subtitle}
        kicker={copy.role.kicker}
        heading={copy.role.title}
      >
        <ul className="flex flex-col gap-3">
          {project.roleItems.map((item) => (
            <li key={item} className="flex gap-3 text-[17px] leading-normal opacity-90">
              <span
                aria-hidden="true"
                className="bg-glow mt-2 h-[9px] w-[9px] flex-none rounded-full"
              />
              {item}
            </li>
          ))}
        </ul>
      </DepthPanel>
      <DepthPanel
        depthLabel={`${copy.depth} 3`}
        title={third.title}
        subtitle={third.subtitle}
        kicker={copy.result.kicker}
        heading={copy.result.title}
      >
        <ul className="grid grid-cols-3 gap-3.5">
          {project.metrics.map((metric) => (
            <li
              key={metric.label}
              className="rounded-2xl border border-white/18 bg-white/7 px-3.5 py-[18px] text-center"
            >
              <p className="font-display text-glow text-[clamp(24px,3vw,36px)] font-extrabold">
                {metric.value}
              </p>
              <p className="mt-1 text-[13px] opacity-80">{metric.label}</p>
            </li>
          ))}
        </ul>
      </DepthPanel>
      <section className="px-gutter pt-10 pb-[70px]">
        <div className="mx-auto max-w-[1240px]">
          <p className="font-display text-glow text-[13px] tracking-[.4em]">
            {copy.featuresKicker}
          </p>
          <h2 className="font-display mt-2.5 mb-7 text-[clamp(30px,4vw,56px)] leading-none font-extrabold">
            {copy.featuresTitle}
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
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
