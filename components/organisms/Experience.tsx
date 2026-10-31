"use client";

import { ArtLayer } from "@/components/atoms/ArtLayer";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ExperienceJournal } from "@/components/organisms/ExperienceJournal";
import { FishingGame } from "@/components/organisms/FishingGame";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { CREATURES } from "@/data/creatures";
import { SECTION_IDS } from "@/data/navigation";
import { useFishingGame } from "@/hooks/useFishingGame";
import { sortedExperience } from "@/lib/collections";
import { isRevealed } from "@/lib/fishing/view";
import { seamBackground } from "@/lib/seams";
import type { ExperienceEntry } from "@/types/experience";

const BACKGROUND = seamBackground(
  "--seam-experience-start",
  "--seam-experience-end",
  "linear-gradient(var(--seam-experience-start), #0a1c26 40%, var(--seam-experience-end))",
);

export function Experience() {
  const { experience: copy } = COPY;
  const game = useFishingGame(CREATURES);
  const revealed = (entry: ExperienceEntry) => isRevealed(entry, game.state);

  return (
    <SectionShell
      id={SECTION_IDS.experience}
      background={BACKGROUND}
      decoration={
        <>
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
      </div>
      <div className="mt-fluid-4 mx-auto max-w-[min(var(--content-max),calc(var(--u)*104))]">
        <FishingGame game={game} />
      </div>
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*77.8))]">
        <ExperienceJournal entries={sortedExperience} isRevealed={revealed} />
      </div>
    </SectionShell>
  );
}
