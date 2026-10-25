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
    <section className="px-gutter pt-[30px] pb-20">
      <div className="mx-auto max-w-[1240px]">
        <p className="font-display text-glow text-[13px] tracking-[.4em]">
          {copy.galleryKicker}
        </p>
        <h2 className="font-display mt-2.5 mb-7 text-[clamp(30px,4vw,56px)] leading-none font-extrabold">
          {copy.galleryTitle}
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
          {project.screenshots.map((label) => (
            <li
              key={label}
              className="flex aspect-[4/3] items-center justify-center rounded-[20px] border-2 border-dashed border-white/40 bg-white/5 p-4 text-center font-semibold tracking-[.1em]"
            >
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-11 flex flex-wrap items-center gap-3.5 rounded-3xl border border-white/18 bg-white/7 px-[26px] py-[22px]">
          <div className="min-w-[220px] flex-1">
            <p className="font-mono text-xs tracking-[.22em] opacity-70">
              {copy.technologies}
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/35 bg-white/8 px-3 py-[5px] font-mono text-xs"
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
