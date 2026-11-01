import { ArtLayer } from "@/components/atoms/ArtLayer";
import { Fireflies } from "@/components/molecules/Fireflies";
import { LAKE_ART, LAKE_LAYER_ORDER } from "@/data/lakeAssets";
import { FIREFLY_COUNT } from "@/lib/constants";

/** Las capas ocupan todo el ancho de la sección. */
const SIZES = "100vw";
/** Versión ligera de cada capa hasta este ancho de ventana. */
const MOBILE = { width: 1600, maxViewport: 1024 } as const;

/**
 * La escena pintada del lago como fondo quieto de la sección: las cinco capas apiladas
 * (cielo a primer plano) y unas luciérnagas. Decorativa: sin puntero ni lectores.
 */
export function LakeBackdrop() {
  return (
    <div className="lake-backdrop" aria-hidden="true" data-testid="lake-backdrop">
      {LAKE_LAYER_ORDER.map((id) => {
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
          <ArtLayer
            key={id}
            src={art.src}
            width={art.width}
            height={art.height}
            sizes={SIZES}
            mobile={mobile}
            className="lake-backdrop-layer"
          />
        );
      })}
      <Fireflies count={FIREFLY_COUNT.lake} />
      <span className="lake-backdrop-shade" />
    </div>
  );
}
