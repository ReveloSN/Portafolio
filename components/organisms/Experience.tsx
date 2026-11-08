import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { FossilPuzzleLoader } from "@/components/organisms/FossilPuzzleLoader";
import { ExperienceList } from "@/components/molecules/ExperienceList";
import { sortedExperience } from "@/lib/collections";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { seamBackground } from "@/lib/seams";

const BACKGROUND = seamBackground(
  "--seam-experience-start",
  "--seam-experience-end",
  "radial-gradient(ellipse 80% 60% at 50% 40%, var(--experience-glow) 0, var(--seam-experience-end) 75%)",
);

/** Reconstrucción del fósil ilustrado, con una experiencia por fragmento. */
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
        <div className="mt-fluid-6">
          <h3 className="font-display text-fluid-2xl mb-6 font-extrabold">
            {copy.timelineTitle}
          </h3>
          <ExperienceList
            entries={sortedExperience}
            kindLabels={{ academic: copy.academic, work: copy.work }}
            achievementsLabel={copy.achievements}
          />
        </div>
      </div>
    </SectionShell>
  );
}
