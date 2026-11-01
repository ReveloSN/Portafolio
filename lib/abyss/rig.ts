import { LAKE_RIG } from "@/data/abyss";

/**
 * Geometría del niño y la caña sobre la escena del lago, en % de la escena (x del ancho,
 * y del alto). De la punta de la caña cuelga el sedal que se vuelve el hilo de la línea
 * de tiempo.
 */

const PERCENT = 100;
const ART = { width: 2400, height: 1116 } as const;
const DEG = Math.PI / 180;

export interface PercentBox {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

/** Caja de una pose del niño a partir de su recorte en el lienzo común. */
export function kidBox(crop: PercentBox): PercentBox {
  const { left, top, scale } = LAKE_RIG.kidCanvas;
  return {
    left: left + ((crop.left * scale) / ART.width) * PERCENT,
    top: top + ((crop.top * scale) / ART.height) * PERCENT,
    width: ((crop.width * scale) / ART.width) * PERCENT,
    height: ((crop.height * scale) / ART.height) * PERCENT,
  };
}

/** Punta de la caña en reposo (% de la escena). */
export function rodTip() {
  const { grip, rodLength, rodAngle, aspect } = LAKE_RIG;
  return {
    x: grip.x + rodLength * Math.cos(rodAngle * DEG),
    y: grip.y + rodLength * aspect * Math.sin(rodAngle * DEG),
  };
}

/**
 * Caja, pivote y giro de rod.webp: la empuñadura cae en las manos del niño y el dibujo
 * (que ya viene inclinado) se gira hasta el ángulo de reposo.
 */
export function rodPlacement() {
  const { grip, rodLength, rodAngle, aspect, rodArt } = LAKE_RIG;
  const artLength = Math.hypot(
    rodArt.tip.x - rodArt.grip.x,
    rodArt.tip.y - rodArt.grip.y,
  );
  const artAngle =
    Math.atan2(rodArt.tip.y - rodArt.grip.y, rodArt.tip.x - rodArt.grip.x) / DEG;
  /** % del ancho de la escena por px del dibujo. */
  const scale = rodLength / artLength;
  return {
    left: grip.x - rodArt.grip.x * scale,
    top: grip.y - rodArt.grip.y * scale * aspect,
    width: rodArt.width * scale,
    height: rodArt.height * scale * aspect,
    origin: {
      x: (rodArt.grip.x / rodArt.width) * PERCENT,
      y: (rodArt.grip.y / rodArt.height) * PERCENT,
    },
    rotate: rodAngle - artAngle,
  };
}
