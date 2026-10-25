import type { SVGProps } from "react";

export function NestFront(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 560 120" aria-hidden="true" {...props}>
      <g fill="none" strokeLinecap="round">
        <path
          d="M12 40C70 112 200 118 280 118s210-6 268-78"
          stroke="#8a6034"
          strokeWidth="10"
        />
        <path
          d="M30 28C90 96 210 104 280 104s190-8 250-76"
          stroke="#6a4626"
          strokeWidth="8"
        />
        <path d="M60 70C130 112 220 110 280 110" stroke="#a87a45" strokeWidth="5" />
        <path d="M500 66C430 108 350 108 280 110" stroke="#9a6d3d" strokeWidth="5" />
        <path d="M16 52C40 74 70 88 100 94" stroke="#c49455" strokeWidth="4" />
        <path d="M544 52C520 74 490 88 460 94" stroke="#c49455" strokeWidth="4" />
      </g>
    </svg>
  );
}
