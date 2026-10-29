import type { CSSProperties } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";

import { AboutCard } from "@/components/organisms/AboutCard";
import { Fireflies } from "@/components/molecules/Fireflies";
import { RevealGroup } from "@/components/molecules/RevealGroup";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { TechTrail } from "@/components/molecules/TechTrail";
import { StaggerText } from "@/components/molecules/StaggerText";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { FIREFLY_COUNT } from "@/lib/constants";
import type { Profile, QuickFact } from "@/types/profile";
import { seamBackground } from "@/lib/seams";

interface AboutProps {
  readonly profile: Profile;
}

const FACT_COLORS: Readonly<Record<QuickFact["icon"], string>> = {
  pin: "var(--glow)",
  cap: "#6ef0e0",
  heart: "#ffc46e",
};

/** Orden en la entrada escalonada: primero el texto, luego datos rápidos y tecnologías. */
const FACTS_START = 4;
const FACT_ICON_PX = 14;
const TRAIL_START = 7;
const BACKGROUND = seamBackground(
  "--seam-about-start",
  "--seam-about-end",
  "linear-gradient(var(--seam-about-start) 0, #0a2418 60%, var(--seam-about-end) 100%)",
);

export function About({ profile }: AboutProps) {
  const { about } = COPY;
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
        <RevealGroup className="mx-auto w-full max-w-[calc(var(--u)*64)] lg:mx-0">
          <p className="font-display text-glow text-fluid-xs font-medium tracking-[.4em]">
            {about.eyebrow}
          </p>
          <h2 className="font-display mt-[calc(var(--u)*.8)] mb-[var(--about-gap)] text-[clamp(2rem,calc(var(--u)*4.2),3.75rem)] leading-[1.05] font-extrabold tracking-[-.02em] text-balance">
            {about.title}
          </h2>
          <StaggerText
            text={profile.aboutText}
            className="max-w-[60ch] text-[clamp(.9rem,calc(var(--u)*1.35),1.1rem)] leading-[1.5] opacity-90"
          />

          <h3 className="text-fluid-xs mt-[var(--about-gap)] font-mono font-medium tracking-[.2em] opacity-70">
            {about.factsTitle}
          </h3>
          <ul className="mt-[calc(var(--u)*.6)] flex flex-wrap gap-[calc(var(--u)*.6)]">
            {profile.quickFacts.map((fact, i) => (
              <li
                key={fact.text}
                className="stagger-item"
                style={{ "--i": FACTS_START + i } as CSSProperties}
              >
                <Tag className="inline-flex items-center gap-[.5em] px-[1em] py-[.35em] whitespace-nowrap">
                  <Icon
                    name={fact.icon}
                    size={FACT_ICON_PX}
                    style={{ color: FACT_COLORS[fact.icon] }}
                  />
                  {fact.text}
                </Tag>
              </li>
            ))}
          </ul>

          <h3 className="text-fluid-xs mt-[var(--about-gap)] font-mono font-medium tracking-[.2em] opacity-70">
            {about.skillsTitle}
          </h3>
          <TechTrail technologies={profile.technologies} startIndex={TRAIL_START} />
        </RevealGroup>
      </div>
    </SectionShell>
  );
}
