import { JAW_LIP_WAVE, JAW_VIEWBOX } from "@/data/jaws";
import { seeded } from "@/lib/seeded";
import type { TeethConfig, Tooth } from "@/types/jaws";

const JITTER_X = 0.1;
const JITTER_SIZE = 0.16;
const LEAN_RATIO = 0.22;
const EDGE_TAPER = 0.3;

/** Reparte los dientes a lo ancho; los del centro son más grandes y ninguno es igual a otro. */
export function buildTeeth(config: TeethConfig): readonly Tooth[] {
  const { count, phase, rootY, lengthMin, lengthMax, halfWidth, seed } = config;
  const spacing = JAW_VIEWBOX.width / (phase === 1 ? count + 1 : count);
  return Array.from({ length: count }, (_, i) => {
    const slot = phase === 1 ? i + 1 : i + phase;
    const centered = 1 - Math.abs(slot / (JAW_VIEWBOX.width / spacing) - 0.5) * 2;
    const size = 1 - (1 - centered) * EDGE_TAPER + (seeded(i, seed) - 0.5) * JITTER_SIZE;
    const length = lengthMin + (lengthMax - lengthMin) * Math.min(1, size);
    return {
      x: slot * spacing + (seeded(i, seed + 1) - 0.5) * spacing * JITTER_X,
      baseY: rootY,
      length,
      halfWidth: halfWidth * (0.9 + 0.2 * Math.min(1, size)),
      lean: (seeded(i, seed + 2) - 0.5) * length * LEAN_RATIO,
    };
  });
}

const fix = (n: number) => Math.round(n * 10) / 10;

/** Contorno de un diente que apunta hacia abajo: base ancha y punta curvada. */
export function toothPath({ x, baseY, length, halfWidth, lean }: Tooth): string {
  const tipX = x + lean;
  const tipY = baseY + length;
  const p = (a: number, b: number) => `${fix(a)} ${fix(b)}`;
  return (
    `M${p(x - halfWidth, baseY)}` +
    `C${p(x - halfWidth * 0.9, baseY + length * 0.45)} ${p(tipX - halfWidth * 0.18, baseY + length * 0.8)} ${p(tipX, tipY)}` +
    `C${p(tipX + halfWidth * 0.2, baseY + length * 0.78)} ${p(x + halfWidth * 0.95, baseY + length * 0.4)} ${p(x + halfWidth, baseY)}Z`
  );
}

/** Sombra de la mitad derecha del diente: le da volumen sin salirse de la paleta oscura. */
export function toothShadePath({ x, baseY, length, halfWidth, lean }: Tooth): string {
  const tipX = x + lean;
  const p = (a: number, b: number) => `${fix(a)} ${fix(b)}`;
  return (
    `M${p(tipX, baseY + length)}` +
    `C${p(tipX + halfWidth * 0.2, baseY + length * 0.78)} ${p(x + halfWidth * 0.95, baseY + length * 0.4)} ${p(x + halfWidth, baseY)}` +
    `L${p(x, baseY)}Z`
  );
}

/** Brillo húmedo: un trazo fino por el flanco izquierdo del diente. */
export function toothGlossPath({ x, baseY, length, halfWidth, lean }: Tooth): string {
  const p = (a: number, b: number) => `${fix(a)} ${fix(b)}`;
  return (
    `M${p(x - halfWidth * 0.6, baseY + length * 0.16)}` +
    `C${p(x - halfWidth * 0.52, baseY + length * 0.42)} ${p(x + lean - halfWidth * 0.12, baseY + length * 0.7)} ${p(x + lean - halfWidth * 0.04, baseY + length * 0.9)}`
  );
}

/** Puntos del labio a lo ancho del lienzo; `sign = -1` da el labio espejado del otro maxilar. */
function lipPoints(lipY: number, sign: 1 | -1): readonly string[] {
  const { amplitude, wavelength, step } = JAW_LIP_WAVE;
  const points: string[] = [];
  for (let x = 0; x <= JAW_VIEWBOX.width; x += step) {
    const y = lipY + sign * Math.sin((x / wavelength) * Math.PI * 2) * amplitude;
    points.push(`${x} ${fix(y)}`);
  }
  return points;
}

/** Línea ondulada del labio a lo ancho del lienzo. */
export function lipPath(lipY: number): string {
  return `M${lipPoints(lipY, 1).join("L")}`;
}

/**
 * Interior de la boca: arranca recto bajo el labio de arriba y termina siguiendo el labio
 * del maxilar de abajo (ya espejado), para que al abrirse no quede un borde recto.
 */
export function mouthPath(topY: number, bottomLipY: number): string {
  const edge = [...lipPoints(bottomLipY, -1)].reverse();
  return `M0 ${topY}H${JAW_VIEWBOX.width}L${edge.join("L")}Z`;
}
