import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Avatar } from "@/components/molecules/Avatar";
import { ParallaxStage } from "@/components/molecules/ParallaxStage";
import { Canoe } from "@/components/worlds/Canoe";
import { Fireflies } from "@/components/worlds/Fireflies";
import { GiantDino } from "@/components/worlds/GiantDino";
import { JungleBackdrop, type StageVars } from "@/components/worlds/JungleBackdrop";
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
/** Distancia de la canoa al borde inferior, en coordenadas del diseño. */
const CANOE_PLACEMENT = { "--b": 64 } as StageVars;
const CURSOR_LIGHT =
  "radial-gradient(circle, rgba(210,255,140,.55) 0, rgba(166,255,92,.18) 40%, rgba(166,255,92,0) 70%)";

export function Hero({ profile }: HeroProps) {
  const { hero } = COPY;
  return (
    <ParallaxStage
      as="section"
      id={SECTION_IDS.home}
      className="bg-jungle-700 fine:cursor-none relative h-svh min-h-80 overflow-hidden"
    >
      <JungleBackdrop
        back={
          <>
            <Pterodactyls className="pointer-events-none absolute top-0 left-0 h-auto w-full" />
            <GiantDino alt={hero.dinoAlt} />
          </>
        }
        mid={
          <div
            className="stage-bottom pointer-events-none absolute right-0 left-0 flex justify-center"
            style={CANOE_PLACEMENT}
          >
            <Canoe alt={hero.canoeAlt} withReflection testId="hero-canoe" />
          </div>
        }
      >
        <Fireflies particles={FIREFLIES} />
        <div
          aria-hidden="true"
          className="coarse:hidden pointer-events-none absolute size-[150px] -translate-1/2 rounded-full transition-[left,top,opacity] duration-150 ease-out"
          style={{
            left: "var(--px, 50%)",
            top: "var(--py, 40%)",
            opacity: "var(--inside, 0)",
            background: CURSOR_LIGHT,
          }}
        />
        <div
          aria-hidden="true"
          className="hero-shade pointer-events-none absolute inset-0"
        />
      </JungleBackdrop>

      <div className="hero-copy pt-nav absolute inset-0 flex cursor-auto">
        <div className="hero-copy-inner gap-fluid-3 flex flex-col">
          <div className="gap-fluid-2 flex items-center">
            <div className="hero-avatar flex-none rounded-full bg-[conic-gradient(var(--glow),#6ef0e0,var(--glow))] p-[3px]">
              <Avatar
                label={hero.photoAlt}
                background="#0d2a1d"
                figure="#6a8f77"
                className="h-full w-full"
                figureWidth="68%"
              />
            </div>
            <div className="text-left">
              <p className="font-display text-glow text-fluid-xs font-medium tracking-[.5em]">
                {hero.eyebrow} · {profile.year}
              </p>
              <p className="font-display text-fluid-md mt-1 font-medium opacity-90">
                {hero.greeting}
              </p>
            </div>
          </div>
          <h1
            data-testid="hero-title"
            className="font-display text-hero font-extrabold tracking-[-.02em] [text-shadow:0_8px_40px_rgba(0,0,0,.45)]"
          >
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
          <p className="font-display text-glow text-fluid-lg tiny-h:hidden font-medium tracking-[.2em] uppercase">
            {profile.role}
            <span className="cursor-blink" aria-hidden="true">
              _
            </span>
          </p>
          <p className="hero-tagline text-fluid-md leading-relaxed opacity-90">
            {profile.tagline}
          </p>
          <div className="hero-actions gap-fluid-2 flex flex-wrap">
            <Button href={profile.cvUrl} download data-testid="hero-cta-primary">
              <Icon name="download" size={18} strokeWidth={2.4} />
              {hero.primaryCta}
            </Button>
            <Button
              variant="ghost"
              href={`#${SECTION_IDS.projects}`}
              data-testid="hero-cta-secondary"
            >
              {hero.secondaryCta} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>

      <a
        href={`#${SECTION_IDS.about}`}
        className="text-fluid-xs short:hidden bottom-fluid-2 absolute left-1/2 flex -translate-x-1/2 cursor-auto flex-col items-center gap-1.5 tracking-[.3em] no-underline opacity-85"
      >
        <span>{hero.scrollHint}</span>
        <Icon
          name="arrowDown"
          size={18}
          strokeWidth={2}
          className="h-[1.6em] w-[1.1em]"
        />
      </a>
    </ParallaxStage>
  );
}
