import type { SVGProps } from "react";

export function CuevaThumbnail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 390 460"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="block h-full w-full"
      {...props}
    >
      <defs>
        <linearGradient id="pg3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1810" />
          <stop offset=".6" stopColor="#8c5a2b" />
          <stop offset="1" stopColor="#d49a52" />
        </linearGradient>
        <radialGradient id="pg3g" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffd48a" stopOpacity=".85" />
          <stop offset="1" stopColor="#ffd48a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="390" height="460" fill="url(#pg3)" />
      <circle cx="195" cy="250" r="190" fill="url(#pg3g)" />
      <g fill="none" stroke="#f2e6c9" strokeWidth="9" strokeLinecap="round">
        <path d="M120 300 Q195 180 270 300" />
        <path d="M138 320 Q195 220 252 320" />
        <path d="M156 340 Q195 262 234 340" />
        <path d="M195 190 L195 400" />
      </g>
      <ellipse cx="195" cy="150" rx="46" ry="34" fill="#f2e6c9" />
      <circle cx="178" cy="146" r="9" fill="#2a1810" />
      <circle cx="212" cy="146" r="9" fill="#2a1810" />
      <path d="M170 176 L220 176" stroke="#2a1810" strokeWidth="4" />
      <path
        d="M0 400 Q100 370 200 410 Q300 380 390 405 L390 460 L0 460Z"
        fill="#4a2c18"
      />
    </svg>
  );
}
