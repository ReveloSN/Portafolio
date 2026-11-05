import type { SVGProps } from "react";

export function VolcanThumbnail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 390 460"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="block h-full w-full"
      {...props}
    >
      <defs>
        <linearGradient id="pg4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0805" />
          <stop offset=".55" stopColor="#5a1a0c" />
          <stop offset="1" stopColor="#c4471c" />
        </linearGradient>
        <radialGradient id="pg4g" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffb35c" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffb35c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="390" height="460" fill="url(#pg4)" />
      <circle cx="195" cy="170" r="150" fill="url(#pg4g)" />
      <g fill="#3a1610" opacity=".75">
        <circle cx="170" cy="110" r="34" />
        <circle cx="214" cy="86" r="42" />
        <circle cx="250" cy="120" r="28" />
      </g>
      <path d="M40 460 L160 200 L230 200 L350 460Z" fill="#24100a" />
      <path d="M160 200 Q195 222 230 200 L222 214 Q195 232 168 214Z" fill="#ff7a35" />
      <path
        d="M196 214 C190 260 214 290 200 330 C190 360 206 390 198 460"
        fill="none"
        stroke="#ff8a3d"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M182 218 C170 250 160 280 168 320"
        fill="none"
        stroke="#ffc46e"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="150" cy="150" r="5" fill="#ffd48a" />
      <circle cx="244" cy="160" r="4" fill="#ffd48a" />
      <circle cx="206" cy="132" r="3" fill="#ffd48a" />
      <path
        d="M0 420 Q100 396 200 424 Q300 400 390 418 L390 460 L0 460Z"
        fill="#120604"
      />
    </svg>
  );
}
