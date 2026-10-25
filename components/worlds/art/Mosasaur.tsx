import type { SVGProps } from "react";

export function Mosasaur(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 420 150" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f6b5a" />
          <stop offset="1" stopColor="#173d3a" />
        </linearGradient>
      </defs>
      <path
        d="M6 40 C20 52 24 66 34 74 C70 62 110 62 150 66 C200 70 250 60 296 52 C320 47 340 42 362 44 L372 40 C384 38 400 44 412 54 C416 58 414 62 408 62 L372 64 C336 70 300 86 262 92 C214 98 164 92 120 88 C86 85 56 92 30 102 C22 108 14 120 4 136 C8 116 14 98 22 84 C14 72 8 56 6 40Z"
        fill="url(#mg)"
      />
      <path
        d="M30 102 C56 92 86 85 120 88 C164 92 214 98 262 92 C300 86 336 70 372 64 L408 62 C406 70 396 74 372 74 C336 80 300 96 262 102 C214 108 164 104 120 100 C86 97 56 104 30 112Z"
        fill="#a9d7b0"
        opacity=".85"
      />
      <path
        d="M120 66 L128 56 L140 66 M180 68 L188 58 L200 68 M240 62 L248 52 L260 62"
        stroke="#173d3a"
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M256 90 C262 112 250 128 232 140 C246 126 238 108 236 92Z M150 86 C150 104 138 116 122 126 C134 114 128 102 128 88Z"
        fill="#245a4f"
      />
      <path d="M372 64 L412 62 C414 68 408 80 392 84 L364 80Z" fill="#1c4a44" />
      <path d="M376 63 l4 8 l4-8 M390 62 l4 8 l4-8 M362 66 l3 7 l4-7" fill="#fff" />
      <path d="M380 46 q8-6 16 0" stroke="#173d3a" strokeWidth="3" fill="none" />
      <circle cx="350" cy="50" r="7" fill="#ffd36e" />
      <ellipse cx="351" cy="50" rx="2" ry="5.5" fill="#07160f" />
    </svg>
  );
}
