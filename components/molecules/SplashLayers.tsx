import Image from "next/image";
import type { CSSProperties } from "react";
import type { BreachStage } from "@/types/fishing";
import type { LakeAsset } from "@/types/lake";

interface SplashLayersProps {
  readonly stage: BreachStage;
  readonly back: LakeAsset;
  readonly front: LakeAsset;
  /** Centro y línea de agua (% de la escena) y ancho de la criatura (% del ancho). */
  readonly x: number;
  readonly waterline: number;
  readonly width: number;
}

/** La columna de agua de detrás es más estrecha que la salpicadura baja de delante. */
const BACK_SCALE = 1.4;
const FRONT_SCALE = 2.2;
/** Hay salpicadura al salir del agua y al caer. */
const SPLASHING: ReadonlySet<BreachStage> = new Set(["rise", "splash"]);

const place = (x: number, waterline: number, width: number): CSSProperties => ({
  left: `${x}%`,
  top: `${waterline}%`,
  width: `${width}%`,
});

/**
 * Agua del salto: el abultamiento antes de salir, la columna de detrás (bajo la criatura)
 * y la salpicadura baja de delante. La `key` reinicia la animación en cada fase.
 */
export function SplashLayers({
  stage,
  back,
  front,
  x,
  waterline,
  width,
}: SplashLayersProps) {
  if (stage === "bulge") {
    return (
      <span
        className="breach-bulge"
        style={place(x, waterline, width)}
        aria-hidden="true"
      />
    );
  }
  if (!SPLASHING.has(stage)) return null;
  return (
    <>
      <Image
        key={`back-${stage}`}
        src={back.src}
        width={back.width}
        height={back.height}
        alt=""
        sizes="30vw"
        className="breach-splash breach-splash-back"
        style={place(x, waterline, width * BACK_SCALE)}
      />
      <Image
        key={`front-${stage}`}
        src={front.src}
        width={front.width}
        height={front.height}
        alt=""
        sizes="40vw"
        className="breach-splash breach-splash-front"
        style={place(x, waterline, width * FRONT_SCALE)}
      />
    </>
  );
}
