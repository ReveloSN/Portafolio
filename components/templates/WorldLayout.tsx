import type { CSSProperties } from "react";
import { WorldJourney } from "@/components/worlds/WorldJourney";
import { Button } from "@/components/atoms/Button";
import { SkipLink } from "@/components/atoms/SkipLink";
import { WorldSwitcher } from "@/components/molecules/WorldSwitcher";
import { WorldDetails } from "@/components/worlds/WorldDetails";
import { WorldGallery } from "@/components/worlds/WorldGallery";
import { WorldHero } from "@/components/worlds/WorldHero";
import { COPY } from "@/data/copy";
import { MAIN_CONTENT_ID } from "@/data/navigation";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { World } from "@/types/world";

interface WorldLayoutProps {
  readonly world: World;
  readonly worlds: readonly World[];
  readonly project: Project;
  readonly profile: Profile;
}

/** Plantilla común de las páginas de mundo: cambia la escena y los datos, no la estructura. */
export function WorldLayout({ world, worlds, project, profile }: WorldLayoutProps) {
  const { world: copy, site } = COPY;
  const theme = {
    "--glow": world.accent,
    "--ink": world.ink,
    background: world.background,
  } as CSSProperties;
  return (
    // Los mundos conservan su paleta en los dos temas
    <div style={theme} data-palette="night" className="world-page w-full overflow-x-clip">
      <SkipLink href={`#${MAIN_CONTENT_ID}`}>{COPY.nav.skipToContent}</SkipLink>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="focus:outline-none">
        <WorldHero world={world} project={project} ownerName={profile.firstName} />
        <nav className="world-section-nav" aria-label={copy.navigationLabel}>
          <ul>
            <li>
              <a href="#contexto">{copy.problem.title}</a>
            </li>
            <li>
              <a href="#desarrollo">{copy.role.title}</a>
            </li>
            <li>
              <a href="#recorrido">{copy.journeyTitle}</a>
            </li>
            <li>
              <a href="#aporte">{copy.result.title}</a>
            </li>
            <li>
              <a href="#funcionalidades">{copy.featuresTitle}</a>
            </li>
            {project.screenshots.length > 0 && (
              <li>
                <a href="#capturas">{copy.galleryKicker}</a>
              </li>
            )}
          </ul>
        </nav>
        <WorldDetails
          world={world}
          project={project}
          journey={<WorldJourney slug={project.slug} />}
        />
        <WorldGallery project={project} />
      </main>
      <footer className="px-gutter pt-fluid-5 pb-14 text-center">
        <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*68.1))]">
          <h2 className="font-display text-fluid-3xl mb-3 leading-none font-extrabold tracking-[-.02em]">
            {copy.chooseTitle}
          </h2>
          <p className="text-fluid-md mb-7 opacity-80">{copy.chooseIntro}</p>
          <WorldSwitcher worlds={worlds} current={world.slug} hereLabel={copy.here} />
          <div className="mt-fluid-4">
            <Button href="/">
              <span aria-hidden="true">←</span> {copy.back}
            </Button>
          </div>
        </div>
        <div className="mt-fluid-6 text-fluid-sm mx-auto flex max-w-[min(var(--content-max),calc(var(--u)*86.1))] flex-wrap justify-between gap-4 opacity-55">
          <span>
            © {profile.year} {profile.firstName}
          </span>
          <span>{site.madeWith}</span>
        </div>
      </footer>
    </div>
  );
}
