import { Canoe } from "@/components/worlds/Canoe";
import { Particles } from "@/components/worlds/Particles";
import { JungleBackdrop, type StageVars } from "@/components/worlds/JungleBackdrop";
import { COPY } from "@/data/copy";
import { WORLD_PARTICLE_COUNT } from "@/lib/constants";
import { makeParticles, WORLD_PARTICLES } from "@/lib/particles";

/** La canoa flota a media altura, sobre el título del proyecto. */
const CANOE_PLACEMENT = { "--b": 200 } as StageVars;
const PARTICLES = makeParticles(WORLD_PARTICLE_COUNT, WORLD_PARTICLES);

export function SelvaScene() {
  return (
    <>
      <JungleBackdrop
        waterBottom={-60}
        mid={
          <div
            className="stage-bottom pointer-events-none absolute right-0 left-0 flex justify-center"
            style={CANOE_PLACEMENT}
          >
            <Canoe alt={COPY.hero.canoeAlt} />
          </div>
        }
      >
        <Particles particles={PARTICLES} />
      </JungleBackdrop>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[62%]"
        style={{
          background: "linear-gradient(to top, rgba(4,16,10,.88) 0, transparent 100%)",
        }}
      />
    </>
  );
}
