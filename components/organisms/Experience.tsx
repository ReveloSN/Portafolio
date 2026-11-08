import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { FossilPuzzleLoader } from "@/components/organisms/FossilPuzzleLoader";
import { JournalBook } from "@/components/organisms/JournalBook";
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
/** Un diario por tipo de experiencia, en este orden. */
const BOOKS = ["work", "academic"] as const;

/**
 * Reconstrucción del fósil ilustrado, con una experiencia por fragmento. Debajo, dos
 * diarios de la expedición (profesional y académico) que se leen página a página.
 */
export function Experience() {
  const { experience: copy } = COPY;
  const labels = {
    achievements: copy.achievements,
    prev: copy.prevPage,
    next: copy.nextPage,
    pageOf: copy.pageOf,
    pager: copy.pagerLabel,
  };
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
        <h3 className="font-display text-fluid-2xl mt-fluid-6 font-extrabold">
          {copy.timelineTitle}
        </h3>
        <div className="journal-books">
          {BOOKS.map((kind) => (
            <JournalBook
              key={kind}
              id={`diario-${kind}`}
              title={copy[kind]}
              entries={sortedExperience.filter((entry) => entry.kind === kind)}
              labels={labels}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
