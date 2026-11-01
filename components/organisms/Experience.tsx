import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { DiveScenery } from "@/components/organisms/DiveScenery";
import { ExperienceDive } from "@/components/organisms/ExperienceDive";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { sortedExperience } from "@/lib/collections";
import { seamBackground } from "@/lib/seams";

const BACKGROUND = seamBackground(
  "--seam-experience-start",
  "--seam-experience-end",
  "linear-gradient(var(--seam-experience-start), #0a2c3d 30%, #050f1b 80%, var(--seam-experience-end))",
);

/**
 * Experiencia: una inmersión del lago al abismo guiada por el scroll, con la experiencia
 * académica y laboral en placas de la más reciente a la más antigua.
 */
export function Experience() {
  const { experience: copy } = COPY;
  return (
    <SectionShell
      id={SECTION_IDS.experience}
      background={BACKGROUND}
      className="experience"
      decoration={<SeamLayer seam="testimonials-experience" host="lower" />}
    >
      <ExperienceDive
        entries={sortedExperience}
        heading={
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
        }
        scenery={<DiveScenery />}
      />
    </SectionShell>
  );
}
