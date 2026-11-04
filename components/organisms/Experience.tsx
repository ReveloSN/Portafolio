import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { FossilPuzzleLoader } from "@/components/organisms/FossilPuzzleLoader";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { seamBackground } from "@/lib/seams";

const BACKGROUND = seamBackground(
  "--seam-experience-start",
  "--seam-experience-end",
  "radial-gradient(ellipse 80% 60% at 50% 40%, var(--experience-glow) 0, var(--seam-experience-end) 75%)",
);

/**
 * Experiencia: un fósil tipo puzle. Cada hueso es una experiencia (de la más reciente a
 * la más antigua) y encajarlo revela su ficha; completo, la lista entera en texto.
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
      </div>
    </SectionShell>
  );
}
