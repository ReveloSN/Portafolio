import type { SVGProps } from "react";

export function NestBack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 560 190" aria-hidden="true" {...props}>
      <ellipse cx="280" cy="110" rx="268" ry="74" fill="#2a1a0e" />
      <g fill="none" strokeLinecap="round">
        <path
          d="M20 100C90 40 200 30 280 34s190 6 262 66"
          stroke="#7a5430"
          strokeWidth="9"
        />
        <path
          d="M36 120C110 62 210 52 290 56s180 8 236 58"
          stroke="#5d3f22"
          strokeWidth="7"
        />
        <path d="M60 80C140 30 220 24 300 28" stroke="#9a6d3d" strokeWidth="5" />
        <path d="M480 84C420 34 350 24 270 26" stroke="#8a6034" strokeWidth="5" />
      </g>
    </svg>
  );
}
