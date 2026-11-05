import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { COPY } from "@/data/copy";
import type { Project } from "@/types/project";

/** Ancho aproximado de cada captura: tres columnas en escritorio, una en móvil. */
const GALLERY_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw";

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
        {project.screenshots.length > 0 ? (
          <ul className="gap-fluid-3 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {project.screenshots.map((shot) => (
              <li
                key={shot.src}
                className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] border border-white/18 bg-black/40 p-2"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes={GALLERY_SIZES}
                  className="h-full w-full rounded-[14px] object-contain"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-[20px] border-2 border-dashed border-white/40 bg-white/5 p-8 text-center font-semibold tracking-[.06em]">
            {copy.galleryEmpty}
          </p>
        )}
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
        </div>
      </div>
    </section>
  );
}
