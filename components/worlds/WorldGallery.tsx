import Image from "next/image";
import { ProjectRepoLinks } from "@/components/molecules/ProjectRepoLinks";
import { ProjectTechTrail } from "@/components/molecules/ProjectTechTrail";
import { getCopy } from "@/lib/locale.server";
import type { Project } from "@/types/project";

/** Captura principal a todo el ancho; secundarias en dos columnas. */
const GALLERY_SIZES = "(min-width: 1200px) 560px, (min-width: 640px) 45vw, 100vw";
/** Teléfono o reloj: todas en fila, cada una de unos 260 px. */
const TALL_SIZES = "(min-width: 640px) 280px, 50vw";

interface WorldGalleryProps {
  readonly project: Project;
}

export async function WorldGallery({ project }: WorldGalleryProps) {
  const COPY = await getCopy();
  const { world: copy } = COPY;
  // Capturas verticales o cuadradas (teléfono, reloj) van en fila, sin una principal.
  const tall = project.screenshots.every((shot) => shot.height >= shot.width);
  return (
    <section id="capturas" className="px-gutter pt-fluid-4 pb-20">
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*86.1))]">
        {project.screenshots.length > 0 && (
          <>
            {copy.galleryKicker ? (
              <p className="font-display text-glow text-fluid-xs tracking-[.4em]">
                {copy.galleryKicker}
              </p>
            ) : null}
            <h2 className="font-display text-fluid-3xl mt-2.5 mb-7 leading-none font-extrabold">
              {copy.galleryTitle}
            </h2>
            <ul className="world-gallery-grid" data-layout={tall ? "tall" : "wide"}>
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
                          tall
                            ? TALL_SIZES
                            : index === 0
                              ? "(min-width: 1200px) 1120px, 95vw"
                              : GALLERY_SIZES
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
        <div className="px-fluid-4 py-fluid-4 mt-11 rounded-3xl border border-white/18 bg-white/7">
          <p className="text-fluid-xs text-center font-mono tracking-[.22em] opacity-70">
            {copy.technologies}
          </p>
          <ProjectTechTrail
            technologies={project.technologies}
            label={copy.technologies}
          />
          <div className="mt-fluid-4 flex justify-center">
            <ProjectRepoLinks project={project} label={copy.code} />
          </div>
        </div>
      </div>
    </section>
  );
}
