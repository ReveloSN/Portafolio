import type { CSSProperties } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";

import { AboutCard } from "@/components/organisms/AboutCard";
import { Fireflies } from "@/components/molecules/Fireflies";
import { RevealGroup } from "@/components/molecules/RevealGroup";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SoftSkillList } from "@/components/molecules/SoftSkillList";
import { TechTrail } from "@/components/molecules/TechTrail";
import { StaggerText } from "@/components/molecules/StaggerText";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { FIREFLY_COUNT } from "@/lib/constants";
import type { Profile, QuickFact } from "@/types/profile";
import { seamBackground } from "@/lib/seams";
import { countSentences, paragraphStarts } from "@/lib/sentences";

interface AboutProps {
  readonly profile: Profile;
}

const FACT_COLORS: Readonly<Record<QuickFact["icon"], string>> = {
  pin: "var(--glow)",
  cap: "var(--fact-cap)",
  university: "var(--amber-ink)",
  code: "var(--glow)",
  network: "var(--fact-cap)",
  cloud: "var(--amber-ink)",
  heart: "var(--amber-ink)",
};

const FACT_ICON_PX = 14;
const BACKGROUND = seamBackground(
  "--seam-about-start",
  "--seam-about-end",
  "linear-gradient(var(--seam-about-start) 0, var(--about-glow) var(--about-fade), var(--seam-about-end) 100%)",
);

export function About({ profile }: AboutProps) {
  const { about } = COPY;
  // Orden en la entrada escalonada: texto, datos rápidos, habilidades y tecnologías.
  const paragraphs = profile.aboutParagraphs;
  const starts = paragraphStarts(paragraphs);
  const factsStart = countSentences(paragraphs);
  const softSkillsStart = factsStart + profile.quickFacts.length;
  const trailStart = softSkillsStart + profile.softSkills.length;
  return (
    <SectionShell
      id={SECTION_IDS.about}
      background={BACKGROUND}
      decoration={
        <>
          <SeamLayer seam="hero-about" host="lower" />
          {/* Por debajo del contenido (z-0) y más tenues: no compiten con los datos rápidos */}
          <Fireflies count={FIREFLY_COUNT.about} className="z-0 opacity-60" />
        </>
      }
      className="about-section pt-[var(--about-pt)] pb-[var(--about-pb)] lg:grid lg:min-h-svh lg:content-center"
    >
      <div className="mx-auto grid w-full max-w-[min(var(--content-max),calc(var(--u)*92))] items-center gap-[clamp(1.75rem,calc(var(--u)*4.5),5rem)] lg:grid-cols-[auto_minmax(0,1fr)]">
        <AboutCard profile={profile} />
        <RevealGroup className="mx-auto w-full max-w-[calc(var(--u)*68)] lg:mx-0">
          {about.eyebrow ? (
            <p className="font-display text-glow text-fluid-xs font-medium tracking-[.4em]">
              {about.eyebrow}
            </p>
          ) : null}
          <h2 className="font-display mt-[calc(var(--u)*.8)] mb-[var(--about-gap)] text-[clamp(2rem,calc(var(--u)*4.2),3.75rem)] leading-[1.05] font-extrabold tracking-[-.02em] text-balance">
            {about.title}
          </h2>
          <div className="max-w-[60ch] space-y-[.8em] text-[clamp(.9rem,calc(var(--u)*1.35),1.1rem)] leading-[1.5] opacity-90">
            {paragraphs.map((paragraph, i) => (
              <StaggerText key={starts[i]} text={paragraph} startIndex={starts[i]} />
            ))}
          </div>

          <h3 className="text-fluid-xs mt-[var(--about-gap)] font-mono font-medium tracking-[.2em] opacity-70">
            {about.factsTitle}
          </h3>
          <ul className="mt-[calc(var(--u)*.6)] flex flex-wrap gap-[calc(var(--u)*.6)]">
            {profile.quickFacts.map((fact, i) => (
              <li
                key={fact.text}
                className="stagger-item max-w-full"
                style={{ "--i": factsStart + i } as CSSProperties}
              >
                {/* En pantallas angostas los datos largos parten línea en vez de salirse */}
                <Tag className="inline-flex max-w-full items-center gap-[.5em] px-[1em] py-[.35em] sm:whitespace-nowrap">
                  <Icon
                    name={fact.icon}
                    size={FACT_ICON_PX}
                    className="shrink-0"
                    style={{ color: FACT_COLORS[fact.icon] }}
                  />
                  {fact.text}
                </Tag>
              </li>
            ))}
          </ul>

          <h3 className="text-fluid-xs mt-[var(--about-gap)] font-mono font-medium tracking-[.2em] opacity-70">
            {about.softSkillsTitle}
          </h3>
          <SoftSkillList skills={profile.softSkills} startIndex={softSkillsStart} />

          <h3 className="text-fluid-xs mt-[var(--about-gap)] font-mono font-medium tracking-[.2em] opacity-70">
            {about.skillsTitle}
          </h3>
          <TechTrail technologies={profile.technologies} startIndex={trailStart} />
        </RevealGroup>
      </div>
    </SectionShell>
  );
}
