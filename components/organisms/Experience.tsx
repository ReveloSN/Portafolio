import { ExperienceList } from "@/components/molecules/ExperienceList";
import { GlyphBand } from "@/components/molecules/GlyphBand";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { FossilPuzzleLoader } from "@/components/organisms/FossilPuzzleLoader";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { sortedExperience } from "@/lib/collections";
import { seamBackground } from "@/lib/seams";

const BACKGROUND = seamBackground(
  "--seam-experience-start",
  "--seam-experience-end",
  "radial-gradient(ellipse 80% 60% at 50% 40%, var(--experience-glow) 0, var(--seam-experience-end) 75%)",
);
/** Capítulos del diario, en este orden. */
const CHAPTERS = ["work", "academic"] as const;

/**
 * Reconstrucción del fósil ilustrado, con una experiencia por fragmento. Debajo, el diario
 * de la expedición: una hoja antigua enmarcada por jeroglíficos con toda la trayectoria.
 */
export function Experience() {
  const { experience: copy } = COPY;
  return (
    <SectionShell
      id={SECTION_IDS.experience}
      background={BACKGROUND}
      decoration={<SeamLayer seam="testimonials-experience" host="lower" />}
    >
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*88.9))]">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
          titleClassName="max-w-[calc(var(--u)*59.7)]"
        />
        <FossilPuzzleLoader />
        <article className="journal-sheet" aria-labelledby="journal-title">
          <GlyphBand />
          <h3 id="journal-title" className="journal-heading">
            {copy.timelineTitle}
          </h3>
          {CHAPTERS.map((kind) => (
            <section key={kind} aria-labelledby={`experience-${kind}`}>
              <h3 id={`experience-${kind}`} className="journal-chapter">
                {copy[kind]}
              </h3>
              <ExperienceList
                entries={sortedExperience.filter((entry) => entry.kind === kind)}
                kindLabels={{ academic: copy.academic, work: copy.work }}
                achievementsLabel={copy.achievements}
                showKind={false}
              />
            </section>
          ))}
          <GlyphBand />
        </article>
      </div>
    </SectionShell>
  );
}
