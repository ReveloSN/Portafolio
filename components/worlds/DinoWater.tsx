import Image from "next/image";
import { HERO_LAYERS } from "@/lib/constants";
import { layerShift } from "@/lib/parallax";
import { DINO_IMAGE, DINO_SIZES } from "./GiantDino";

/** Centro horizontal de cada pata dentro de la imagen (porcentaje del ancho). */
const FEET = [26, 37, 45, 59] as const;
const RIPPLE_DELAY_S = 2.5;

/**
 * Sombra, reflejo volteado y ondas del dino. Se dibuja delante del agua frontal
 * y comparte la caja `.dino`, así coincide siempre con el cuerpo.
 */
export function DinoWater() {
  const { dino } = HERO_LAYERS;
  return (
    <div
      aria-hidden="true"
      className="dino px"
      style={{ transform: layerShift(dino.x, dino.y) }}
    >
      <span className="dino-shadow" />
      <div className="dino-reflection">
        <Image
          src={DINO_IMAGE.src}
          alt=""
          width={DINO_IMAGE.width}
          height={DINO_IMAGE.height}
          sizes={DINO_SIZES}
        />
      </div>
      {FEET.flatMap((x) =>
        [0, RIPPLE_DELAY_S].map((delay) => (
          <span
            key={`${x}-${delay}`}
            className="dino-ripple"
            style={{ left: `${x}%`, animationDelay: `-${delay}s` }}
          />
        )),
      )}
    </div>
  );
}
