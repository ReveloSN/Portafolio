import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Avatar } from "@/components/molecules/Avatar";
import { ParallaxStage } from "@/components/molecules/ParallaxStage";
import { Canoe } from "@/components/worlds/Canoe";
import { Fireflies } from "@/components/worlds/Fireflies";
import { GiantDino } from "@/components/worlds/GiantDino";
import { JungleBackdrop } from "@/components/worlds/JungleBackdrop";
import { Pterodactyls } from "@/components/worlds/art/Pterodactyls";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { FIREFLY_COUNT } from "@/lib/constants";
import { HERO_FIREFLIES, makeParticles } from "@/lib/particles";
import type { Profile } from "@/types/profile";

interface HeroProps {
  readonly profile: Profile;
}

const FIREFLIES = makeParticles(FIREFLY_COUNT, HERO_FIREFLIES);
const TEXT_SHADE =
  "linear-gradient(90deg, rgba(3,14,9,.82) 0, rgba(3,14,9,.55) 26%, rgba(3,14,9,0) 52%)";
const CURSOR_LIGHT =
  "radial-gradient(circle, rgba(210,255,140,.55) 0, rgba(166,255,92,.18) 40%, rgba(166,255,92,0) 70%)";

export function Hero({ profile }: HeroProps) {
  const { hero } = COPY;
  return (
    <ParallaxStage
      as="section"
      id={SECTION_IDS.home}
      className="bg-jungle-700 relative h-[940px] scroll-mt-[72px] overflow-hidden [@media(pointer:fine)]:cursor-none"
    >
      <JungleBackdrop
        back={
          <>
            <Pterodactyls className="pointer-events-none absolute top-0 left-0 h-auto w-full" />
            <GiantDino alt={hero.dinoAlt} />
          </>
        }
        mid={
          <div className="pointer-events-none absolute right-0 bottom-16 left-0 flex justify-center">
            <Canoe alt={hero.canoeAlt} withReflection />
          </div>
        }
      >
        <Fireflies particles={FIREFLIES} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -mt-[75px] -ml-[75px] h-[150px] w-[150px] rounded-full transition-[left,top,opacity] duration-150 ease-out"
          style={{
            left: "var(--px, 50%)",
            top: "var(--py, 40%)",
            opacity: "var(--inside, 0)",
            background: CURSOR_LIGHT,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: TEXT_SHADE }}
        />
      </JungleBackdrop>

      <div className="absolute top-[130px] right-6 left-6 flex cursor-auto flex-col items-center gap-5 text-center md:top-[230px] md:right-auto md:left-[clamp(24px,4vw,56px)] md:w-[min(520px,46vw)] md:items-start md:text-left">
        <div className="flex items-center gap-4">
          <div className="h-[68px] w-[68px] flex-none rounded-full bg-[conic-gradient(var(--glow),#6ef0e0,var(--glow))] p-[3px]">
            <Avatar
              label={hero.photoAlt}
              background="#0d2a1d"
              figure="#6a8f77"
              className="h-full w-full"
              figureWidth="68%"
            />
          </div>
          <div className="text-left">
            <p className="font-display text-glow text-[13px] font-medium tracking-[.5em]">
              {hero.eyebrow} · {profile.year}
            </p>
            <p className="font-display mt-1 text-lg font-medium opacity-90">
              {hero.greeting}
            </p>
          </div>
        </div>
        <h1 className="font-display text-[clamp(44px,6.4vw,96px)] leading-[.95] font-extrabold tracking-[-.02em] [text-shadow:0_8px_40px_rgba(0,0,0,.45)]">
          {profile.firstName}
          <br />
          {profile.lastName}
        </h1>
        <p className="font-display text-glow text-[clamp(16px,1.7vw,24px)] font-medium tracking-[.2em] uppercase">
          {profile.role}
          <span className="cursor-blink" aria-hidden="true">
            _
          </span>
        </p>
        <p className="max-w-[460px] text-[clamp(16px,1.4vw,19px)] leading-relaxed opacity-90">
          {profile.tagline}
        </p>
        <div className="mt-1.5 flex flex-wrap justify-center gap-3.5 md:justify-start">
          <Button href={profile.cvUrl} download>
            <Icon name="download" size={18} strokeWidth={2.4} />
            {hero.primaryCta}
          </Button>
          <Button variant="ghost" href={`#${SECTION_IDS.projects}`}>
            {hero.secondaryCta} <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>

      <a
        href={`#${SECTION_IDS.about}`}
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 cursor-auto flex-col items-center gap-1.5 text-xs tracking-[.3em] no-underline opacity-85"
      >
        <span>{hero.scrollHint}</span>
        <Icon name="arrowDown" size={18} strokeWidth={2} className="h-[26px] w-[18px]" />
      </a>
    </ParallaxStage>
  );
}
