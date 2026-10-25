import { Fireflies } from "@/components/worlds/Fireflies";
import { OceanoArt } from "@/components/worlds/art/OceanoArt";
import { WORLD_PARTICLE_COUNT } from "@/lib/constants";
import { makeParticles, OCEAN_BUBBLES } from "@/lib/particles";

const BUBBLES = makeParticles(WORLD_PARTICLE_COUNT, OCEAN_BUBBLES);

export function OceanoScene() {
  return (
    <>
      <OceanoArt />
      <Fireflies particles={BUBBLES} className="bub" omitTop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[62%]"
        style={{
          background: "linear-gradient(to top, rgba(2,20,34,.82) 0, transparent 100%)",
        }}
      />
    </>
  );
}
