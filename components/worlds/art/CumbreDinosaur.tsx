import type { SVGProps } from "react";

/** Lomo, cuello y cabeza: el borde que recibe la luz del amanecer. */
const BACK_EDGE =
  "M1080 620C1000 560 860 480 740 470C690 440 640 330 560 230C520 180 480 140 440 118C425 100 400 88 372 90";

/** Un braquiosaurio asoma del mar de nubes, a contraluz. Capa con transparencia. */
export function CumbreDinosaur(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1100 733"
      aria-hidden="true"
      className="block h-full w-full"
      {...props}
    >
      <defs>
        <linearGradient id="cbd-skin" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4a6a" />
          <stop offset=".5" stopColor="#1d2b46" />
          <stop offset="1" stopColor="#0e1729" />
        </linearGradient>
        <linearGradient id="cbd-cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ead5cc" />
          <stop offset=".35" stopColor="#a9b3cd" />
          <stop offset="1" stopColor="#50628a" />
        </linearGradient>
        <linearGradient id="cbd-fade-ramp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".35" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="cbd-fade">
          <rect width="1100" height="733" fill="url(#cbd-fade-ramp)" />
        </mask>
      </defs>
      <path
        d={`${BACK_EDGE}C345 92 318 100 300 112C290 120 294 130 308 132C340 136 380 138 410 146C430 152 445 162 455 175C500 240 560 360 590 450C605 500 610 560 612 620L612 733H1080Z`}
        fill="url(#cbd-skin)"
      />
      <path
        d={BACK_EDGE}
        fill="none"
        stroke="#f2c48e"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".75"
      />
      <path
        d="M560 300c20 40 30 80 34 120M520 240c14 22 24 44 30 66"
        fill="none"
        stroke="#0b1324"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".5"
      />
      <circle cx="366" cy="106" r="4" fill="#f6dcb4" />
      <path
        d="M120 733q40-46 110-34 50-44 130-20 60-58 150-36 70-62 170-40 80-52 170-24 90-46 170-10 50-14 80 4v160Z"
        fill="url(#cbd-cloud)"
        mask="url(#cbd-fade)"
      />
    </svg>
  );
}
