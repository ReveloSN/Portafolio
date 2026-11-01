import type { CSSProperties, ReactNode } from "react";
import { ArtLayer } from "@/components/atoms/ArtLayer";
import { Illustration } from "@/components/atoms/Illustration";
import { LAKE_ART, LAKE_LAYER_ORDER } from "@/data/lakeAssets";
import { kidBox, rodPlacement, rodTip } from "@/lib/abyss/rig";
import type { LakeLayerId } from "@/types/lake";

/** Cuánto sube cada capa (svh) al salir de la superficie: el cielo, lento; el frente, rápido. */
const RISE: Readonly<Record<LakeLayerId | "rig", number>> = {
  sky: 40,
  trees: 55,
  water: 75,
  dock: 90,
  rig: 90,
  foreground: 115,
};
/** Versión ligera de cada capa hasta este ancho de ventana. */
const MOBILE = { width: 1600, maxViewport: 1024 } as const;

/** El niño va entre el muelle y el follaje del primer plano. */
const FRONT: LakeLayerId = "foreground";
const BEHIND_RIG = LAKE_LAYER_ORDER.filter((id) => id !== FRONT);

const percent = (value: number) => `${value.toFixed(3)}%`;
const rise = (id: keyof typeof RISE) => ({ "--rise": RISE[id] }) as CSSProperties;

function Layer({ id }: { readonly id: LakeLayerId }) {
  const art = LAKE_ART[id];
  if (!art) return null;
  const mobile = art.mobileSrc
    ? {
        src: art.mobileSrc,
        width: MOBILE.width,
        height: Math.round((art.height * MOBILE.width) / art.width),
        maxViewport: MOBILE.maxViewport,
      }
    : undefined;
  return (
    <div className="lake-layer" style={rise(id)}>
      <ArtLayer
        src={art.src}
        width={art.width}
        height={art.height}
        sizes="(max-aspect-ratio: 1/1) 180vw, 130vw"
        mobile={mobile}
        className="lake-layer-art"
      />
    </div>
  );
}

/** El niño sentado en la punta del muelle con la caña en reposo. */
function Rig(): ReactNode {
  const kidArt = LAKE_ART["explorer-idle"];
  const rodArt = LAKE_ART.rod;
  if (!kidArt?.crop || !rodArt) return null;
  const kid = kidBox(kidArt.crop);
  const rod = rodPlacement();
  return (
    <div className="lake-layer" style={rise("rig")} data-testid="lake-kid">
      <Illustration
        decorative
        src={kidArt.src}
        width={kidArt.width}
        height={kidArt.height}
        sizes="12vw"
        loading="lazy"
        className="lake-piece"
        style={{
          left: percent(kid.left),
          top: percent(kid.top),
          width: percent(kid.width),
        }}
      />
      <Illustration
        decorative
        src={rodArt.src}
        width={rodArt.width}
        height={rodArt.height}
        sizes="30vw"
        loading="lazy"
        className="lake-piece"
        style={{
          left: percent(rod.left),
          top: percent(rod.top),
          width: percent(rod.width),
          transformOrigin: `${percent(rod.origin.x)} ${percent(rod.origin.y)}`,
          rotate: `${rod.rotate.toFixed(2)}deg`,
        }}
      />
    </div>
  );
}

/**
 * Superficie: la escena pintada del lago con el niño pescando. Al bajar, las capas suben a
 * distinta velocidad y se funden con el agua; el sedal, que sale de la punta de la caña,
 * no se funde: sigue hacia abajo y es el hilo de la línea de tiempo, con un cebo
 * brillante que baja con la profundidad.
 */
export function LakeSurface() {
  const tip = rodTip();
  const style = { "--tip-x": tip.x, "--tip-y": tip.y } as CSSProperties;
  return (
    <div className="lake-surface" style={style}>
      <div className="lake-scene">
        {BEHIND_RIG.map((id) => (
          <Layer key={id} id={id} />
        ))}
        <Rig />
        <Layer id={FRONT} />
      </div>
      <span className="dive-line" style={rise("rig")} />
      <span className="dive-thread" style={rise("rig")} />
      <span className="dive-bait" data-testid="dive-bait" />
    </div>
  );
}
