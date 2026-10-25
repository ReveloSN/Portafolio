import { Canoe } from "@/components/worlds/Canoe";
import { Fireflies } from "@/components/worlds/Fireflies";
import { JungleBackdrop } from "@/components/worlds/JungleBackdrop";
import { COPY } from "@/data/copy";
import { WORLD_PARTICLE_COUNT } from "@/lib/constants";
import { makeParticles, WORLD_PARTICLES } from "@/lib/particles";

const PARTICLES = makeParticles(WORLD_PARTICLE_COUNT, WORLD_PARTICLES);

export function SelvaScene() {
  return (
    <>
      <JungleBackdrop
        waterTop={540}
        mid={
          <div className="pointer-events-none absolute top-[420px] right-0 left-0 flex justify-center">
            <Canoe alt={COPY.hero.canoeAlt} />
          </div>
        }
      >
        <Fireflies particles={PARTICLES} />
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
