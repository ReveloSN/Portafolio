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
      <footer className="px-gutter pt-[50px] pb-14 text-center">
        <div className="mx-auto max-w-[980px]">
          <h2 className="font-display mb-3 text-[clamp(32px,5vw,60px)] leading-none font-extrabold tracking-[-.02em]">
            {copy.chooseTitle}
          </h2>
          <p className="mb-7 text-lg opacity-80">{copy.chooseIntro}</p>
          <WorldSwitcher worlds={worlds} current={world.slug} hereLabel={copy.here} />
          <div className="mt-[30px]">
            <Button href="/">
              <span aria-hidden="true">←</span> {copy.back}
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-[70px] flex max-w-[1240px] flex-wrap justify-between gap-4 text-sm opacity-55">
          <span>
            © {profile.year} {profile.firstName}
          </span>
          <span>{site.madeWith}</span>
        </div>
      </footer>
    </div>
  );
}
