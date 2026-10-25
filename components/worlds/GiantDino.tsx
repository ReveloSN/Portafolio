import Image from "next/image";
import { EYE_TRAVEL, HERO_LAYERS } from "@/lib/constants";
import { layerShift } from "@/lib/parallax";

interface GiantDinoProps {
  readonly alt: string;
}

/** Tamaño real de la imagen del dino (cuerpo completo, cuenca del ojo transparente). */
export const DINO_IMAGE = {
  src: "/images/dino-full.webp",
  width: 1850,
  height: 850,
} as const;

/** Ocupa hasta 56% del ancho en escritorio y todo el ancho en móvil vertical. */
export const DINO_SIZES = "(max-aspect-ratio: 4/5) and (max-width: 900px) 100vw, 56vw";

/**
 * Dinosaurio de cuerpo completo: respira, parpadea y su iris sigue el cursor.
 * El ojo vive detrás de la imagen y se ve a través de la cuenca recortada.
 * Va detrás del agua frontal; su reflejo y ondas están en `DinoWater`.
 */
export function GiantDino({ alt }: GiantDinoProps) {
  const { dino } = HERO_LAYERS;
  return (
    <div className="dino px" style={{ transform: layerShift(dino.x, dino.y) }}>
      <div className="dino-body">
        <Image
          src="/images/eyeball.webp"
          alt=""
          width={1254}
          height={1254}
          sizes="40px"
          className="dino-eye dino-eyeball"
        />
        <Image
          src="/images/iris.webp"
          alt=""
          width={1254}
          height={1254}
          sizes="24px"
          className="dino-eye dino-iris"
          style={{
            transform: `translate(calc(var(--mx, 0) * ${EYE_TRAVEL.x}%), calc(var(--my, 0) * ${EYE_TRAVEL.y}%))`,
          }}
        />
        <span aria-hidden="true" className="dino-eye dino-lid" />
        <Image
          src={DINO_IMAGE.src}
          alt={alt}
          width={DINO_IMAGE.width}
          height={DINO_IMAGE.height}
          priority
          sizes={DINO_SIZES}
          data-testid="hero-dino"
          className="dino-img relative block h-full w-full"
        />
        <span aria-hidden="true" className="dino-tint" />
      </div>
    </div>
  );
}
