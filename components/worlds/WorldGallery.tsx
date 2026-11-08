import Image from "next/image";
import { ProjectRepoLinks } from "@/components/molecules/ProjectRepoLinks";
import { COPY } from "@/data/copy";
import type { Project } from "@/types/project";

/** Captura principal a todo el ancho; secundarias en dos columnas. */
const GALLERY_SIZES = "(min-width: 1200px) 560px, (min-width: 640px) 45vw, 100vw";

interface WorldGalleryProps {
  readonly project: Project;
}

export function WorldGallery({ project }: WorldGalleryProps) {
  const { world: copy } = COPY;
  return (
    <section id="capturas" className="px-gutter pt-fluid-4 pb-20">
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*86.1))]">
        {project.screenshots.length > 0 && (
          <>
            <p className="font-display text-glow text-fluid-xs tracking-[.4em]">
              {copy.galleryKicker}
            </p>
            <h2 className="font-display text-fluid-3xl mt-2.5 mb-7 leading-none font-extrabold">
              {copy.galleryTitle}
            </h2>
            <ul className="world-gallery-grid">
              {project.screenshots.map((shot, index) => (
                <li key={shot.src}>
                  <figure>
                    <a
                      href={shot.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="world-gallery-shot"
                      aria-label={`${copy.galleryOpen} · ${shot.alt} ${COPY.projects.newTab}`}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        sizes={
                          index === 0 ? "(min-width: 1200px) 1120px, 95vw" : GALLERY_SIZES
                        }
                      />
                    </a>
                    <figcaption>{shot.alt}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </>
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
          <ProjectRepoLinks project={project} label={copy.code} />
        </div>
      </div>
    </section>
  );
}
