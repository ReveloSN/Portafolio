import Image from "next/image";
import { DINO_TILT, EYE_TRAVEL, HERO_LAYERS } from "@/lib/constants";
import { layerShift } from "@/lib/parallax";
import type { StageVars } from "./JungleBackdrop";

interface GiantDinoProps {
  readonly alt: string;
}

/** Posición del dino en coordenadas del diseño (1440x900): anclado arriba para no recortar la cabeza. */
const DINO_PLACEMENT = { "--x": 576, "--y": -70, "--w": 835 } as StageVars;

/** La imagen del dino termina en un corte recto a la derecha: se desvanece para que nunca se note. */
const BODY_FADE = "linear-gradient(to right, #000 78%, transparent 99%)";

const EYE_POSITION = { left: "28.43%", top: "32.81%" } as const;

/** Dinosaurio de cuello largo: respira, parpadea y su iris sigue el cursor. */
export function GiantDino({ alt }: GiantDinoProps) {
  const { dino } = HERO_LAYERS;
  return (
    <div
      className="px stage-x stage-top stage-w portrait-narrow:opacity-75 absolute origin-[60%_100%]"
      style={{
        ...DINO_PLACEMENT,
        transform: `perspective(1400px) ${layerShift(dino.x, dino.y)} rotateY(calc(var(--mx, 0) * ${DINO_TILT.y}deg)) rotateX(calc(var(--my, 0) * ${-DINO_TILT.x}deg))`,
      }}
    >
      <div className="breathe">
        <div
          className="relative w-full"
          style={{
            aspectRatio: "1365 / 1152",
            maskImage: BODY_FADE,
            WebkitMaskImage: BODY_FADE,
          }}
        >
          <Image
            src="/images/ojo.webp"
            alt=""
            width={1254}
            height={1254}
            className="absolute h-[17.4%] w-[9.5%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg]"
            style={EYE_POSITION}
          />
          <div
            className="absolute h-[6.5%] w-[5.5%] -translate-x-1/2 -translate-y-1/2"
            style={EYE_POSITION}
          >
            <Image
              src="/images/iris.webp"
              alt=""
              width={1254}
              height={1254}
              className="block h-full w-full transition-transform duration-200 ease-out"
              style={{
                transform: `translate(calc(var(--mx, 0) * ${EYE_TRAVEL.x}%), calc(var(--my, 0) * ${EYE_TRAVEL.y}%))`,
              }}
            />
          </div>
          <div
            aria-hidden="true"
            className="blink absolute h-[18.5%] w-[10.5%] origin-[50%_0] rounded-full bg-[linear-gradient(#93b35e,#6f9a55)]"
            style={EYE_POSITION}
          />
          <div
            aria-hidden="true"
            className="absolute h-[12.8%] w-[5.9%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] rounded-full shadow-[inset_0_0_12px_7px_rgba(0,24,12,.6)]"
            style={EYE_POSITION}
          />
          <Image
            src="/images/dino.webp"
            alt={alt}
            width={1365}
            height={1152}
            priority
            sizes="(min-width: 1500px) 880px, 58vw"
            className="relative block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
