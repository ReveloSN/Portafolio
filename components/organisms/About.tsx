import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import { ExplorerCard } from "@/components/molecules/ExplorerCard";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
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

const CHIP_COLORS = ["166,255,92", "110,240,224", "255,196,110"] as const;
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
      decoration={<SeamLayer seam="hero-about" host="lower" />}
    >
      <div className="mx-auto flex max-w-[min(var(--content-max),calc(var(--u)*83.3))] flex-wrap items-center justify-center gap-[clamp(40px,6vw,88px)]">
        <ExplorerCard profile={profile} />
        <div className="max-w-[calc(var(--u)*41.7)] min-w-[280px] flex-[1_1_440px]">
          <p className="font-display text-glow text-fluid-sm font-medium tracking-[.5em]">
            {about.eyebrow}
          </p>
          <h2 className="font-display text-display mt-3.5 mb-5 leading-none font-extrabold tracking-[-.02em]">
            {about.title}
          </h2>
          <p className="text-fluid-md leading-[1.75] opacity-90">{profile.aboutText}</p>

          <h3 className="mt-fluid-4 text-fluid-xs font-mono font-medium tracking-[.2em] opacity-70">
            {about.factsTitle}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {profile.quickFacts.map((fact) => (
              <li key={fact.text}>
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
          <ul className="mt-3.5 flex flex-wrap gap-3">
            {profile.technologies.map((tech, i) => {
              const rgb = CHIP_COLORS[i % CHIP_COLORS.length];
              return (
                <li
                  key={tech}
                  className="chip-float rounded-full border px-5 py-2.5 font-semibold"
                  style={{
                    borderColor: `rgba(${rgb},.55)`,
                    background: `rgba(${rgb},.08)`,
                    animationDelay: `${-i}s`,
                  }}
                >
                  {tech}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
