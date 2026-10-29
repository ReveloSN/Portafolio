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
          <Fireflies count={FIREFLY_COUNT.about} />
        </>
      }
      className="pt-[clamp(3rem,calc(var(--u)*6),6.5rem)] pb-[max(clamp(3rem,calc(var(--u)*6),6.5rem),var(--divider-clearance))]"
    >
      <div className="mx-auto flex max-w-[min(var(--content-max),calc(var(--u)*83.3))] flex-wrap items-center justify-center gap-[clamp(2rem,calc(var(--u)*4),5rem)]">
        <AboutCard profile={profile} />
        <RevealGroup className="max-w-[calc(var(--u)*41.7)] min-w-[280px] flex-[1_1_440px]">
          <p className="font-display text-glow text-fluid-sm font-medium tracking-[.5em]">
            {about.eyebrow}
          </p>
          <h2 className="font-display text-display mt-3.5 mb-5 leading-none font-extrabold tracking-[-.02em]">
            {about.title}
          </h2>
          <StaggerText
            text={profile.aboutText}
            className="text-fluid-md leading-[1.75] opacity-90"
          />

          <h3 className="mt-fluid-4 text-fluid-xs font-mono font-medium tracking-[.2em] opacity-70">
            {about.factsTitle}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {profile.quickFacts.map((fact, i) => (
              <li
                key={fact.text}
                className="stagger-item"
                style={{ "--i": FACTS_START + i } as CSSProperties}
              >
                <Tag className="text-fluid-sm inline-flex items-center gap-2 px-4 py-2">
                  <Icon
                    name={fact.icon}
                    size={16}
                    style={{ color: FACT_COLORS[fact.icon] }}
                  />
                  {fact.text}
                </Tag>
              </li>
            ))}
          </ul>

          <h3 className="mt-fluid-4 text-fluid-xs font-mono font-medium tracking-[.2em] opacity-70">
            {about.skillsTitle}
          </h3>
          <TechTrail technologies={profile.technologies} startIndex={TRAIL_START} />
        </RevealGroup>
      </div>
    </SectionShell>
  );
}
