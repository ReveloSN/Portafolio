import type { CSSProperties } from "react";
import { PARTICLE_LAYERS } from "@/data/abyss";
import { ABYSS_ART } from "@/data/abyssArt";
import { LAKE_ART } from "@/data/lakeAssets";
import { makeMotes } from "@/lib/abyss/particles";

/** La capa cercana usa la partícula pintada (la del abismo o, si falta, la burbuja del lago). */
const SPRITE = ABYSS_ART.particle ?? LAKE_ART["particle-1"];

/**
 * Nieve marina en dos capas con velocidades distintas: suben despacio y se desplazan con
 * --depth a ritmos diferentes. Posiciones fijas por semilla (sin Math.random). En móvil y
 * con puntero táctil solo se dibujan las motas esenciales (data-extra las oculta).
 */
export function DriftParticles() {
  return (
    <>
      {PARTICLE_LAYERS.map((layer) => {
        const sprite = layer.id === "near" && SPRITE ? `url("${SPRITE.src}")` : undefined;
        const style = {
          "--parallax": `${layer.parallax}svh`,
          "--mote-opacity": layer.opacity,
          "--mote-art": sprite,
        } as CSSProperties;
        return (
          <div key={layer.id} className="abyss-motes" data-layer={layer.id} style={style}>
            {makeMotes(layer).map((mote, i) => (
              <span
                key={i}
                className="abyss-mote"
                data-extra={mote.extra ? "" : undefined}
                style={
                  {
                    left: `${mote.x}%`,
                    top: `${mote.y}%`,
                    "--mote": mote.size,
                    "--rise": `${mote.duration}s`,
                    "--rise-delay": `${mote.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        );
      })}
    </>
  );
}
