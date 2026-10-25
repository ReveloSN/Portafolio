import type { ComponentType, CSSProperties } from "react";
import { Button } from "@/components/atoms/Button";
import { WorldSwitcher } from "@/components/molecules/WorldSwitcher";
import { WorldDetails } from "@/components/worlds/WorldDetails";
import { WorldGallery } from "@/components/worlds/WorldGallery";
import { WorldHero } from "@/components/worlds/WorldHero";
import { COPY } from "@/data/copy";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { World } from "@/types/world";

interface WorldLayoutProps {
  readonly world: World;
  readonly worlds: readonly World[];
  readonly project: Project;
  readonly profile: Profile;
  readonly Scene: ComponentType;
}

/** Plantilla común de las páginas de mundo: cambia la escena y los datos, no la estructura. */
export function WorldLayout({
  world,
  worlds,
  project,
  profile,
  Scene,
}: WorldLayoutProps) {
  const { world: copy, site } = COPY;
  const theme = {
    "--glow": world.accent,
    "--ink": world.ink,
    background: world.background,
  } as CSSProperties;
  return (
    <div style={theme} className="text-leaf w-full overflow-x-clip">
      <WorldHero
        world={world}
        project={project}
        ownerName={profile.firstName}
        Scene={Scene}
      />
      <main>
        <WorldDetails world={world} project={project} />
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
