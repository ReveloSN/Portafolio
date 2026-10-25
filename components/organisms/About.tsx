import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
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
const BARCODE_BARS = [
  [0, 3],
  [6, 1.5],
  [11, 4],
  [19, 2],
  [25, 1.5],
  [30, 4],
  [38, 2],
  [44, 3],
  [51, 1.5],
  [56, 4],
  [64, 2],
  [70, 3],
] as const;
const BACKGROUND = "linear-gradient(#07160f 0, #0a2418 60%, #0a1f17 100%)";

function ExplorerCard({ profile }: AboutProps) {
  const { about } = COPY;
  return (
    <div className="min-w-[260px] flex-[0_1_360px]">
      <div className="-rotate-3 rounded-[22px] bg-[#efe6cf] p-[18px] pb-[22px] text-[#17281d] shadow-[0_30px_60px_-24px_rgba(0,0,0,.7)] transition duration-500 ease-out hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_40px_80px_-30px_rgba(166,255,92,.5)]">
        <div className="mb-3 flex justify-between font-mono text-[11px] tracking-[.12em] text-[#4d5b3f]">
          <span>{about.idLeft}</span>
          <span>
            {about.idRight} {profile.year}
          </span>
        </div>
        <div className="relative flex aspect-[4/5] flex-col items-center justify-end overflow-hidden rounded-[14px] border-2 border-dashed border-[#7d8a62] bg-[linear-gradient(160deg,#cfe3b2,#8fb77a)]">
          <svg width="62%" viewBox="0 0 46 52" aria-hidden="true" className="block">
            <circle cx="23" cy="19" r="10" fill="#4f7a5a" />
            <path d="M3 52c0-13 8-21 20-21s20 8 20 21z" fill="#4f7a5a" />
          </svg>
          <p className="absolute inset-x-0 top-3.5 text-center text-[13px] font-semibold tracking-[.14em] text-[#2c4a30]">
            {about.photoPlaceholder}
          </p>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-2xl leading-[1.05] font-extrabold">
              {profile.firstName}
            </p>
            <p className="mt-0.5 text-sm text-[#41523a]">{profile.role}</p>
          </div>
          <svg width="76" height="34" viewBox="0 0 76 34" aria-hidden="true">
            <g fill="#17281d">
              {BARCODE_BARS.map(([x, w]) => (
                <rect key={x} x={x} width={w} height="34" />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

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
