import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import { ExplorerCard } from "@/components/molecules/ExplorerCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import type { Profile, QuickFact } from "@/types/profile";

interface AboutProps {
  readonly profile: Profile;
}

const FACT_COLORS: Readonly<Record<QuickFact["icon"], string>> = {
  pin: "var(--glow)",
  cap: "#6ef0e0",
  heart: "#ffc46e",
};

const CHIP_COLORS = ["166,255,92", "110,240,224", "255,196,110"] as const;
const BACKGROUND = "linear-gradient(#07160f 0, #0a2418 60%, #0a1f17 100%)";

export function About({ profile }: AboutProps) {
  const { about } = COPY;
  return (
    <SectionShell
      id={SECTION_IDS.about}
      background={BACKGROUND}
      decoration={
        <>
          <Image
            src="/images/foliage-bl.webp"
            alt=""
            width={1536}
            height={1024}
            sizes="520px"
            className="pointer-events-none absolute -bottom-[60px] -left-[90px] w-[min(520px,44vw)] opacity-85"
          />
          <Image
            src="/images/foliage-bl.webp"
            alt=""
            width={1536}
            height={1024}
            sizes="420px"
            className="pointer-events-none absolute -top-[30px] -right-[60px] w-[min(420px,36vw)] rotate-180 opacity-80"
          />
        </>
      }
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-[clamp(40px,6vw,88px)]">
        <ExplorerCard profile={profile} />
        <div className="max-w-[600px] min-w-[280px] flex-[1_1_440px]">
          <p className="font-display text-glow text-sm font-medium tracking-[.5em]">
            {about.eyebrow}
          </p>
          <h2 className="font-display mt-3.5 mb-5 text-[clamp(34px,4.6vw,64px)] leading-none font-extrabold tracking-[-.02em]">
            {about.title}
          </h2>
          <p className="text-lg leading-[1.75] opacity-90">{profile.aboutText}</p>

          <h3 className="mt-[30px] font-mono text-xs font-medium tracking-[.2em] opacity-70">
            {about.factsTitle}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {profile.quickFacts.map((fact) => (
              <li key={fact.text}>
                <Tag className="inline-flex items-center gap-2 px-4 py-2 text-sm">
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

          <h3 className="mt-[30px] font-mono text-xs font-medium tracking-[.2em] opacity-70">
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
