import type { SVGProps } from "react";

export function DigHorizon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f7a3a" />
          <stop offset="1" stopColor="#1c4a26" />
        </linearGradient>
      </defs>
      <g fill="#fff" opacity=".7">
        <circle cx="120" cy="30" r="1.5" />
        <circle cx="420" cy="52" r="1.2" />
        <circle cx="760" cy="24" r="1.6" />
        <circle cx="1060" cy="46" r="1.2" />
        <circle cx="1320" cy="28" r="1.5" />
      </g>
      <path
        d="M0 170 Q120 150 260 168 T520 166 T800 170 T1100 164 T1440 170 V200 H0Z"
        fill="url(#gr)"
      />

      <path d="M200 168 L270 92 L340 168Z" fill="#d9c79a" />
      <path d="M270 92 L270 168 L340 168Z" fill="#bba873" />
      <path d="M252 168 L270 128 L288 168Z" fill="#2a1c0e" />
      <path d="M270 92 V78" stroke="#4a2f17" strokeWidth="3" />
      <path d="M270 78 l22 6 l-22 6z" fill="#ff7a59" />

      <rect x="600" y="104" width="6" height="66" fill="#6a4626" />
      <rect x="540" y="96" width="132" height="40" rx="4" fill="#8a5a2b" />
      <text
        x="606"
        y="119"
        textAnchor="middle"
        fontFamily="JetBrains Mono,monospace"
        fontSize="11"
        fill="#f6e7c4"
        letterSpacing="2"
      >
        ZONA DE
      </text>
      <text
        x="606"
        y="132"
        textAnchor="middle"
        fontFamily="JetBrains Mono,monospace"
        fontSize="11"
        fill="#f6e7c4"
        letterSpacing="2"
      >
        EXCAVACIÓN
      </text>

      <path d="M900 172 Q960 112 1020 172Z" fill="#7a5233" />
      <path d="M1000 172 Q1040 134 1080 172Z" fill="#8a5e3a" />
      <path
        d="M1060 172 L1100 96"
        stroke="#8a5a2b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M1090 98 q16 -10 22 6 q-4 14 -20 12z" fill="#b8c2c8" />

      <rect x="1220" y="136" width="4" height="34" fill="#4a2f17" />
      <circle cx="1222" cy="128" r="30" fill="#ffc46e" opacity=".18" />
      <rect x="1214" y="118" width="16" height="18" rx="3" fill="#ffc46e" />

      <path d="M380 172 L380 150 M470 172 L470 150" stroke="#e0612b" strokeWidth="3" />
      <path
        d="M380 152 Q425 164 470 152"
        stroke="#ffc46e"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}
