import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ArtLayer } from "@/components/atoms/ArtLayer";
import { LAKE_ART } from "@/data/lakeAssets";
import { LAYER_PARALLAX } from "@/lib/fishing/scene";
import type { LakeLayerId } from "@/types/lake";

interface LakeLayersProps {
  /** Capas a pintar, de fondo a frente. */
  readonly layers: readonly LakeLayerId[];
  /** Algo que va justo encima de una capa (p. ej. el ambiente sobre el agua). */
  readonly after?: Partial<Record<LakeLayerId, ReactNode>>;
}

/** La escena ocupa ~70 % del ancho en escritorio y todo el ancho en pantallas pequeñas. */
const SIZES = "(min-width: 1024px) 70vw, 100vw";
const MOBILE = { width: 1600, maxViewport: 1024 } as const;
const PERCENT = 100;

/** Desplazamiento de parallax y escala justa para que el borde nunca quede al aire. */
function depthStyle(id: LakeLayerId, z: number): CSSProperties {
  const depth = LAYER_PARALLAX[id];
  return {
    zIndex: z,
    "--depth": `${depth}%`,
    "--cover": 1 + (2 * Math.abs(depth)) / PERCENT,
  } as CSSProperties;
}

/** Capas pintadas del lago desde el registro: decorativas, sin puntero ni lectores. */
export function LakeLayers({ layers, after }: LakeLayersProps) {
  return (
    <div className="lake-art" aria-hidden="true">
      {layers.map((id) => {
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
          <Fragment key={id}>
            <div className="lake-layer" data-layer={id} style={depthStyle(id, art.z)}>
              <ArtLayer
                src={art.src}
                width={art.width}
                height={art.height}
                sizes={SIZES}
                priority={id === "sky"}
                eager
                mobile={mobile}
                className="h-full w-full"
              />
            </div>
            {after?.[id]}
          </Fragment>
        );
      })}
    </div>
  );
}
