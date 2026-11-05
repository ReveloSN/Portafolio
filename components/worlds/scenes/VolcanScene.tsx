import { Particles } from "@/components/worlds/Particles";
import { VolcanArt } from "@/components/worlds/art/VolcanArt";
import { WORLD_PARTICLE_COUNT } from "@/lib/constants";
import { makeParticles, VOLCANO_EMBERS } from "@/lib/particles";

const EMBERS = makeParticles(WORLD_PARTICLE_COUNT, VOLCANO_EMBERS);

export function VolcanScene() {
  return (
    <>
      <VolcanArt />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(0,0,0,.55) 100%)",
        }}
      />
      <Particles particles={EMBERS} className="ember" omitTop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[62%]"
        style={{
          background: "linear-gradient(to top, rgba(18,6,4,.9) 0, transparent 100%)",
        }}
      />
    </>
  );
}
