import { Fireflies } from "@/components/worlds/Fireflies";
import { CuevaArt } from "@/components/worlds/art/CuevaArt";
import { WORLD_PARTICLE_COUNT } from "@/lib/constants";
import { makeParticles, WORLD_PARTICLES } from "@/lib/particles";

const EMBERS = makeParticles(WORLD_PARTICLE_COUNT, WORLD_PARTICLES);

export function CuevaScene() {
  return (
    <>
      <CuevaArt />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, transparent 50%, rgba(0,0,0,.6) 100%)",
        }}
      />
      <Fireflies particles={EMBERS} className="ff ff-torch" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[62%]"
        style={{
          background: "linear-gradient(to top, rgba(16,8,3,.88) 0, transparent 100%)",
        }}
      />
    </>
  );
}
