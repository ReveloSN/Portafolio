import type { ProjectTrailer } from "@/types/project";

/** Ancla de la sección; la navegación del mundo enlaza aquí cuando el proyecto tiene tráiler. */
export const TRAILER_SECTION_ID = "trailer";

/**
 * Tráiler con el reproductor del navegador: no arranca solo ni descarga el video hasta que
 * alguien lo reproduce. Debajo va lo mismo en texto, para quien no puede verlo u oírlo.
 */
export function WorldTrailer({ trailer }: { readonly trailer: ProjectTrailer }) {
  const titleId = `${TRAILER_SECTION_ID}-title`;
  const introId = `${TRAILER_SECTION_ID}-intro`;
  return (
    <section id={TRAILER_SECTION_ID} aria-labelledby={titleId} className="world-panel">
      <div className="mx-auto max-w-[1200px]">
        <h2 id={titleId} className="font-display text-fluid-3xl font-extrabold">
          {trailer.title}
        </h2>
        <p
          id={introId}
          className="text-fluid-md mt-4 max-w-[62ch] leading-[1.65] opacity-90"
        >
          {trailer.intro}
        </p>
        <div className="world-trailer mt-fluid-5">
          <video
            controls
            playsInline
            preload="none"
            poster={trailer.poster}
            width={trailer.width}
            height={trailer.height}
            aria-labelledby={titleId}
            aria-describedby={introId}
          >
            <source src={trailer.src} type="video/mp4" />
            <a href={trailer.src}>{trailer.title}</a>
          </video>
          <p className="world-trailer-credit">{trailer.credit}</p>
          <details className="world-trailer-text">
            <summary>{trailer.transcriptTitle}</summary>
            <ol>
              {trailer.scenes.map((scene) => (
                <li key={scene.time}>
                  <span>{scene.time}</span>
                  <p>{scene.text}</p>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </div>
    </section>
  );
}
