import type { SVGProps } from "react";

export function SelvaThumbnail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 390 460"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="block h-full w-full"
      {...props}
    >
      <defs>
        <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d4a30" />
          <stop offset="1" stopColor="#2e9b4a" />
        </linearGradient>
        <radialGradient id="pg1g" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#b6ff6e" stopOpacity=".9" />
          <stop offset="1" stopColor="#b6ff6e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="390" height="460" fill="url(#pg1)" />
      <circle cx="195" cy="190" r="170" fill="url(#pg1g)" />
      <rect x="30" y="0" width="22" height="460" fill="#0a2a1d" opacity=".7" />
      <rect x="330" y="0" width="30" height="460" fill="#0a2a1d" opacity=".7" />
      <path
        d="M300 -10 C300 80 230 70 210 170"
        fill="none"
        stroke="#1e6a45"
        strokeWidth="42"
        strokeLinecap="round"
      />
      <ellipse
        cx="190"
        cy="180"
        rx="44"
        ry="26"
        fill="#2a7d52"
        transform="rotate(-12 190 180)"
      />
      <circle cx="200" cy="172" r="9" fill="#eaffb8" />
      <circle cx="202" cy="173" r="4" fill="#0b1f16" />
      <rect y="330" width="390" height="130" fill="#0f6a33" />
      <path d="M130 345 Q195 392 260 345 Q195 360 130 345Z" fill="#2d4a2c" />
      <path
        d="M178 346 C176 322 188 310 196 310 C206 310 214 322 212 346Z"
        fill="#e0612b"
      />
    </svg>
  );
}
