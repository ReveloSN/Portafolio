import Image from "next/image";
import { BancoSagaScene } from "@/components/worlds/BancoSagaScene";
import { ProjectScene } from "@/components/worlds/ProjectScene";
import { getContent } from "@/lib/locale.server";
import type { WorldSlug } from "@/types/world";

export async function WorldJourney({ slug }: { readonly slug: WorldSlug }) {
  const { copy: COPY, journeys } = await getContent();
  return (
    <section id="recorrido" aria-labelledby="recorrido-title" className="world-panel">
      <div className="mx-auto max-w-[1200px]">
        <div className="project-journey-intro">
          <div>
            {COPY.world.journeyKicker ? (
              <p className="text-glow text-fluid-xs font-mono tracking-[.25em]">
                {COPY.world.journeyKicker}
              </p>
            ) : null}
            <h2
              id="recorrido-title"
              className="font-display text-fluid-3xl mt-3 mb-8 font-extrabold"
            >
              {COPY.world.journeyTitle}
            </h2>
            <p className="project-journey-lead">{COPY.world.journeyIntro}</p>
          </div>
          <figure className="project-story-art" aria-label={COPY.world.conceptArt}>
            {slug === "cumbre" ? (
              <BancoSagaScene />
            ) : slug === "volcan" ? (
              <Image
                src="/art/projects/argus-profesor.webp"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 55vw, 630px"
                className="object-cover"
              />
            ) : (
              <ProjectScene slug={slug} />
            )}
            <figcaption className="project-story-caption">
              {COPY.world.conceptArt}
            </figcaption>
          </figure>
        </div>
        <ol className="world-journey">
          {journeys[slug].map((step, index) => (
            <li key={step.title}>
              <div className="journey-signal" aria-hidden="true" />
              <h3 className="font-display">
                <span className="text-glow text-fluid-xs mr-3 font-mono">
                  0{index + 1}
                </span>
                {step.title}
              </h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
