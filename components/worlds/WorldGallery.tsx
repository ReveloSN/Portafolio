import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { COPY } from "@/data/copy";
import type { Project } from "@/types/project";

interface WorldGalleryProps {
  readonly project: Project;
}

export function WorldGallery({ project }: WorldGalleryProps) {
  const { world: copy } = COPY;
  return (
    <section className="px-gutter pt-fluid-4 pb-20">
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*86.1))]">
        <p className="font-display text-glow text-fluid-xs tracking-[.4em]">
          {copy.galleryKicker}
        </p>
        <h2 className="font-display text-fluid-3xl mt-2.5 mb-7 leading-none font-extrabold">
          {copy.galleryTitle}
        </h2>
        <ul className="gap-fluid-3 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {project.screenshots.map((label) => (
            <li
              key={label}
              className="flex aspect-[4/3] items-center justify-center rounded-[20px] border-2 border-dashed border-white/40 bg-white/5 p-4 text-center font-semibold tracking-[.1em]"
            >
              {label}
            </li>
          ))}
        </ul>
        <div className="px-fluid-4 py-fluid-3 mt-11 flex flex-wrap items-center gap-3.5 rounded-3xl border border-white/18 bg-white/7">
          <div className="min-w-[220px] flex-1">
            <p className="text-fluid-xs font-mono tracking-[.22em] opacity-70">
              {copy.technologies}
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="text-fluid-xs rounded-full border border-white/35 bg-white/8 px-3 py-[5px] font-mono"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <Button
            variant="dark"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" />
            {copy.code}
          </Button>
          <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="vercel" size={14} />
            {copy.tryDemo}
          </Button>
        </div>
      </div>
    </section>
  );
}
