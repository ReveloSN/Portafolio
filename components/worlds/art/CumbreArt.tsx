import type { SVGProps } from "react";

/** Estrellas del cielo de madrugada: [x, y, radio]. */
const STARS = [
  [84, 62, 1.6],
  [190, 140, 1.1],
  [262, 48, 1.4],
  [348, 196, 1],
  [430, 92, 1.8],
  [512, 30, 1.1],
  [588, 150, 1.3],
  [676, 70, 1],
  [742, 210, 1.5],
  [820, 38, 1.2],
  [904, 128, 1],
  [980, 64, 1.6],
  [1052, 176, 1.1],
  [1128, 44, 1.3],
  [1210, 120, 1],
  [1290, 30, 1.5],
  [1368, 168, 1.2],
  [1440, 80, 1],
  [1522, 146, 1.4],
  [1570, 40, 1.1],
] as const;

/** Paisaje del mundo Cumbre: una cima sobre un mar de nubes al amanecer. */
export function CumbreArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      {...props}
    >
      <defs>
        <linearGradient id="cb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#081128" />
          <stop offset=".34" stopColor="#16284a" />
          <stop offset=".5" stopColor="#2f4369" />
          <stop offset=".6" stopColor="#7d6f8a" />
          <stop offset=".68" stopColor="#d99c74" />
          <stop offset="1" stopColor="#f0c290" />
        </linearGradient>
        <radialGradient
          id="cb-sun"
          cx="1180"
          cy="500"
          r="460"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffd9a3" stopOpacity=".75" />
          <stop offset=".45" stopColor="#f2a877" stopOpacity=".25" />
          <stop offset="1" stopColor="#f2a877" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cb-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a6a8e" />
          <stop offset="1" stopColor="#34466a" />
        </linearGradient>
        <linearGradient id="cb-peak" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24375a" />
          <stop offset="1" stopColor="#101b33" />
        </linearGradient>
        <linearGradient id="cb-lit" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c98a73" stopOpacity=".55" />
          <stop offset="1" stopColor="#3a4a6c" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cb-snow" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe7d2" />
          <stop offset="1" stopColor="#9fb1cc" />
        </linearGradient>
        <linearGradient id="cb-cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ead5cc" />
          <stop offset=".22" stopColor="#a9b3cd" />
          <stop offset=".65" stopColor="#50628a" />
          <stop offset="1" stopColor="#26365a" />
        </linearGradient>
        <linearGradient id="cb-cloud-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7d8db0" />
          <stop offset=".4" stopColor="#33456b" />
          <stop offset="1" stopColor="#141f38" />
        </linearGradient>
        <radialGradient id="cb-beacon" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffe6b3" stopOpacity=".95" />
          <stop offset="1" stopColor="#ffe6b3" stopOpacity="0" />
        </radialGradient>
        <filter id="cb-soft" x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <rect width="1600" height="900" fill="url(#cb-sky)" />
      <rect width="1600" height="900" fill="url(#cb-sun)" />
      <g fill="#e8eefb">
        {STARS.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity=".7" />
        ))}
      </g>
      <path
        d="M0 500 120 440l90 30 120-80 100 60 90-40 120 60 120-45 120 35 120-60 120 50 120-40 120 50 120-40 120 30v200H0Z"
        fill="url(#cb-far)"
        opacity=".75"
      />
      <path
        d="M0 640 140 500l80 30 140-120 110 140 90 40 180 90H0Z"
        fill="#16233f"
        opacity=".9"
      />
      <path
        d="M620 680 860 430l70 30 130-210 50 50 40-30 150 200 80-30 230 170v100H620Z"
        fill="url(#cb-peak)"
      />
      <path d="m1060 250 90 20 150 200-140 50-100-140Z" fill="url(#cb-lit)" />
      <path d="M1060 250 1032 295l14-5 12 14 14-14 16 8 22 2Z" fill="url(#cb-snow)" />
      <circle cx="1061" cy="232" r="34" fill="url(#cb-beacon)" />
      <g fill="#0d1629">
        <ellipse cx="1061" cy="247" rx="9" ry="4" />
        <ellipse cx="1061" cy="240" rx="7" ry="3.4" />
        <ellipse cx="1061" cy="234" rx="5" ry="2.8" />
      </g>
      <circle cx="1061" cy="229" r="2.6" fill="#fff4dc" />
      <g fill="none" stroke="#1a2440" strokeWidth="3" strokeLinecap="round">
        <path d="m420 230 14-8 12 6 12-6 14 8" />
        <path d="m520 286 9-5 8 4 8-4 9 5" opacity=".7" />
      </g>
      <g fill="#c9c2d4" opacity=".55" filter="url(#cb-soft)">
        <ellipse cx="160" cy="612" rx="260" ry="30" />
        <ellipse cx="560" cy="626" rx="300" ry="26" />
        <ellipse cx="1000" cy="636" rx="320" ry="30" />
        <ellipse cx="1440" cy="618" rx="280" ry="32" />
      </g>
      <path
        d="M0 690q60-40 130-18 70-42 160-8 90-36 180 4 90-28 180 8 110-40 210-6 100-30 200 4 100-42 200-8 100-26 190 2 80-22 150-8v240H0Z"
        fill="url(#cb-cloud)"
      />
      <path
        d="M0 790q80-30 170-8 90-34 190 0 100-28 200 6 110-32 220-2 100-26 200 4 110-34 220-4 100-24 200 2 70-18 100-8v120H0Z"
        fill="url(#cb-cloud-deep)"
      />
      <path
        d="M0 900V770l90-30 90 26 80-20 80 50 80 30 50 74Zm1600 0V790l-100-24-80 40-90-10-70 50-40 54Z"
        fill="#0a1222"
      />
    </svg>
  );
}
