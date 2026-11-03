import type { SVGProps } from "react";
import {
  JAW_LIP_WAVE,
  JAW_LIP_Y,
  JAW_VIEWBOX,
  LOWER_TEETH,
  UPPER_TEETH,
} from "@/data/jaws";
import {
  buildTeeth,
  lipPath,
  mouthPath,
  toothGlossPath,
  toothPath,
  toothShadePath,
} from "@/lib/jaws";
import type { TeethConfig } from "@/types/jaws";

/**
 * Silueta provisional de las mandíbulas (SVG). Casi negra: tiene que leerse como oscuridad.
 * Para cambiarla por arte pintado basta con devolver otro nodo (por ejemplo dos capas WebP
 * con `next/image`) desde `portalSkins.tsx`; el CSS solo espera una caja que ocupe `--jaw-h`.
 */
const PALETTE = {
  gum: "#030a06",
  gumLip: "#1a0709",
  mouthTop: "#1c080c",
  mouthDeep: "#050203",
  toothRoot: "#060907",
  toothMid: "#10150e",
  toothTip: "#1f261a",
  toothShade: "rgba(0, 0, 0, 0.42)",
  gloss: "rgba(214, 226, 188, 0.24)",
  lipGloss: "rgba(255, 214, 190, 0.2)",
} as const;

const VIEW_BOX = `0 0 ${JAW_VIEWBOX.width} ${JAW_VIEWBOX.height}`;
/** El interior se solapa con los labios para que no quede una rendija con la página detrás. */
const LIP_OVERLAP = 1.7;
const LIP_GLOSS_WIDTH = 2.4;
const TOOTH_GLOSS_WIDTH = 3.2;
const gradientStop = (offset: number, color: string) => (
  <stop offset={`${offset * 100}%`} stopColor={color} />
);

interface JawEdgeProps extends SVGProps<SVGSVGElement> {
  readonly id: string;
  readonly teeth: TeethConfig;
  /** La mandíbula de abajo es la de arriba espejada: sus dientes apuntan hacia arriba. */
  readonly flip?: boolean;
  /** Solo una de las dos pinta el interior de la boca; si no, taparía los dientes de la otra. */
  readonly mouth?: boolean;
}

function JawEdge({ id, teeth, flip = false, mouth = false, ...props }: JawEdgeProps) {
  const lip = lipPath(JAW_LIP_Y);
  const lipMargin = JAW_LIP_WAVE.amplitude * LIP_OVERLAP;
  const mouthY = JAW_LIP_Y - lipMargin;
  /** El interior llega hasta el labio del otro maxilar, que lo tapa al cerrar. */
  const mouthEnd = JAW_VIEWBOX.height - JAW_LIP_Y + lipMargin;
  const mouthShape = mouthPath(mouthY, mouthEnd);
  const flipTransform = flip
    ? `translate(0 ${JAW_VIEWBOX.height}) scale(1 -1)`
    : undefined;
  return (
    <svg viewBox={VIEW_BOX} preserveAspectRatio="none" {...props}>
      <defs>
        <linearGradient id={`${id}-gum`} x1="0" x2="0" y1="0" y2="1">
          {gradientStop(0, PALETTE.gum)}
          {gradientStop(0.78, PALETTE.gum)}
          {gradientStop(1, PALETTE.gumLip)}
        </linearGradient>
        <linearGradient id={`${id}-mouth`} x1="0" x2="0" y1="0" y2="1">
          {gradientStop(0, PALETTE.mouthTop)}
          {gradientStop(0.35, PALETTE.mouthDeep)}
          {gradientStop(1, PALETTE.mouthDeep)}
        </linearGradient>
        <linearGradient id={`${id}-tooth`} x1="0" x2="0" y1="0" y2="1">
          {gradientStop(0, PALETTE.toothRoot)}
          {gradientStop(0.45, PALETTE.toothMid)}
          {gradientStop(1, PALETTE.toothTip)}
        </linearGradient>
      </defs>
      <g transform={flipTransform}>
        {/* Interior de la boca: tapa los huecos entre dientes para que no se vea la página. */}
        {mouth && <path d={mouthShape} fill={`url(#${id}-mouth)`} />}
        {buildTeeth(teeth).map((tooth) => (
          <g key={tooth.x}>
            <path d={toothPath(tooth)} fill={`url(#${id}-tooth)`} />
            <path d={toothShadePath(tooth)} fill={PALETTE.toothShade} />
            <path
              d={toothGlossPath(tooth)}
              fill="none"
              stroke={PALETTE.gloss}
              strokeWidth={TOOTH_GLOSS_WIDTH}
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* Encía y labio por delante de las raíces. */}
        <path d={`${lip}V0H0Z`} fill={`url(#${id}-gum)`} />
        <path
          d={lip}
          fill="none"
          stroke={PALETTE.lipGloss}
          strokeWidth={LIP_GLOSS_WIDTH}
        />
      </g>
    </svg>
  );
}

export function PortalJawsTop(props: SVGProps<SVGSVGElement>) {
  return <JawEdge id="jaw-upper" teeth={UPPER_TEETH} mouth {...props} />;
}

export function PortalJawsBottom(props: SVGProps<SVGSVGElement>) {
  return <JawEdge id="jaw-lower" teeth={LOWER_TEETH} flip {...props} />;
}
