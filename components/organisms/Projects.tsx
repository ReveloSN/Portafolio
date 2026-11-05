import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Reveal } from "@/components/molecules/Reveal";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionShell } from "@/components/templates/SectionShell";
import { THUMBNAILS } from "@/components/worlds/registry";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { worldsBySlug } from "@/lib/collections";
import type { Project } from "@/types/project";
import { seamBackground } from "@/lib/seams";

interface ProjectsProps {
  readonly projects: readonly Project[];
}

const BACKGROUND = seamBackground(
  "--seam-projects-start",
  "--seam-projects-end",
  "linear-gradient(var(--seam-projects-start), var(--seam-projects-end))",
);

export function Projects({ projects }: ProjectsProps) {
  const { projects: copy } = COPY;
  return (
    <SectionShell
      id={SECTION_IDS.projects}
      background={BACKGROUND}
      decoration={<SeamLayer seam="about-projects" host="lower" />}
    >
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*88.9))]">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
          titleClassName="max-w-[calc(var(--u)*59.7)]"
        />
        <ul className="mt-fluid-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => {
            const world = worldsBySlug.get(project.slug);
            if (!world) return null;
            const Thumbnail = THUMBNAILS[project.slug];
            return (
              <li key={project.id} className="flex">
                <Reveal className="flex w-full" delay={index * 120}>
                  <ProjectCard
                    project={project}
                    worldLabel={`MUNDO ${world.number} · ${world.name}`}
                    accent={world.accent}
                    thumbnail={<Thumbnail />}
                    labels={copy}
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
