import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { FossilPuzzleLoader } from "@/components/organisms/FossilPuzzleLoader";
import { JournalBook } from "@/components/organisms/JournalBook";
import { ExperienceLinkProvider } from "@/components/templates/ExperienceLinkProvider";
import { SectionShell } from "@/components/templates/SectionShell";
import { SECTION_IDS } from "@/data/navigation";
import { boneLabelsByEntry } from "@/lib/journalLink";
import { getCollections, getContent } from "@/lib/locale.server";
import { seamBackground } from "@/lib/seams";

const BACKGROUND = seamBackground(
  "--seam-experience-start",
  "--seam-experience-end",
  "radial-gradient(ellipse 80% 60% at 50% 40%, var(--experience-glow) 0, var(--seam-experience-end) 75%)",
);
/** Un diario por tipo de experiencia, en este orden. */
const BOOKS = ["work", "academic"] as const;

/**
 * Reconstrucción del fósil ilustrado, con una experiencia por hueso. Debajo, dos diarios
 * (profesional y académico) que se leen página a página; encajar un hueso abre su página.
 */
export async function Experience() {
  const { copy: allCopy, boneShapes } = await getContent();
  const { sortedExperience } = await getCollections();
  const { experience: copy } = allCopy;
  // Hueso de cada experiencia: lo dice cada página del diario.
  const bones = boneLabelsByEntry(sortedExperience, boneShapes);
  const labels = {
    achievements: copy.achievements,
    prev: copy.prevPage,
    next: copy.nextPage,
    pageOf: copy.pageOf,
    pager: copy.pagerLabel,
    fragment: copy.fragment,
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
        <ExperienceLinkProvider>
          <FossilPuzzleLoader entries={sortedExperience} bones={boneShapes} />
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
                bones={bones}
                labels={labels}
              />
            ))}
          </div>
        </ExperienceLinkProvider>
      </div>
    </SectionShell>
  );
}
