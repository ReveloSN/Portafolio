import { ArtLayer } from "@/components/atoms/ArtLayer";
import { LakeBackdrop } from "@/components/molecules/LakeBackdrop";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ExperienceTimeline } from "@/components/organisms/ExperienceTimeline";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { sortedExperience } from "@/lib/collections";
import { seamBackground } from "@/lib/seams";

const BACKGROUND = seamBackground(
  "--seam-experience-start",
  "--seam-experience-end",
  "linear-gradient(var(--seam-experience-start), #0a1c26 40%, var(--seam-experience-end))",
);

/** Experiencia: el lago pintado de fondo y la bitácora académica y laboral encima. */
export function Experience() {
  const { experience: copy } = COPY;
  return (
    <SectionShell
      id={SECTION_IDS.experience}
      background={BACKGROUND}
      className="experience"
      decoration={
        <>
          <LakeBackdrop />
          <SeamLayer seam="testimonials-experience" host="lower" />
          <ArtLayer
            src="/images/trunkL.webp"
            width={1024}
            height={1536}
            sizes="(min-width: 1200px) 320px, 22vw"
            className="absolute top-0 left-0 w-[min(20rem,22vw)] opacity-35"
          />
        </>
      }
    >
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*77.8))]">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
        />
        <div className="experience-window" aria-hidden="true" />
        <ExperienceTimeline entries={sortedExperience} />
      </div>
    </SectionShell>
  );
}
