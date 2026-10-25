import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Reveal } from "@/components/molecules/Reveal";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { THUMBNAILS } from "@/components/worlds/registry";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { worldsBySlug } from "@/lib/collections";
import type { Project } from "@/types/project";

interface ProjectsProps {
  readonly projects: readonly Project[];
}

const BACKGROUND = "linear-gradient(#0a1f17, #06120d)";

export function Projects({ projects }: ProjectsProps) {
  const { projects: copy } = COPY;
  return (
    <SectionShell id={SECTION_IDS.projects} background={BACKGROUND}>
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
          titleClassName="max-w-[860px]"
        />
        <ul className="mt-[60px] grid grid-cols-1 gap-8 lg:grid-cols-3">
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
