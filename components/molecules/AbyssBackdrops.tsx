import type { CSSProperties } from "react";
import { ArtLayer } from "@/components/atoms/ArtLayer";
import { ABYSS_ZONES } from "@/data/abyss";
import { ABYSS_ART } from "@/data/abyssArt";
import type { AbyssArtId } from "@/types/abyss";

/** Versión ligera de los fondos hasta este ancho de ventana. */
const MOBILE = { width: 960, maxViewport: 1024 } as const;

/** Arte de una capa como variable CSS; sin arte, el CSS dibuja su sustituto. */
function artVar(id: AbyssArtId): CSSProperties | undefined {
  const art = ABYSS_ART[id];
  return art ? ({ "--art": `url("${art.src}")` } as CSSProperties) : undefined;
}

/**
 * Agua de fondo: un fondo por zona que se funde con el siguiente según --depth (el
 * degradado de la zona queda debajo si falta el arte), rayos de luz y algas de borde,
 * cada capa con su propia velocidad de parallax.
 */
export function AbyssBackdrops() {
  return (
    <div className="abyss-backdrops">
      {ABYSS_ZONES.map((zone) => {
        const art = ABYSS_ART[zone.id];
        const style = {
          "--from": zone.from,
          "--to": zone.to,
          "--water-top": zone.water[0],
          "--water-bottom": zone.water[1],
          "--fog": zone.fog,
        } as CSSProperties;
        return (
          <div key={zone.id} className="abyss-backdrop" data-zone={zone.id} style={style}>
            {art ? (
              <ArtLayer
                src={art.src}
                width={art.width}
                height={art.height}
                sizes="100vw"
                eager={zone.id === "surface"}
                className="abyss-backdrop-art"
                mobile={
                  art.mobileSrc
                    ? {
                        src: art.mobileSrc,
                        width: MOBILE.width,
                        height: Math.round((art.height * MOBILE.width) / art.width),
                        maxViewport: MOBILE.maxViewport,
                      }
                    : undefined
                }
              />
            ) : null}
            <span className="abyss-fog" />
          </div>
        );
      })}
      <div className="abyss-rays" style={artVar("rays")} />
      <div className="abyss-kelp" data-side="left" style={artVar("kelp-left")} />
      <div className="abyss-kelp" data-side="right" style={artVar("kelp-right")} />
    </div>
  );
}
