import { useId, type SVGProps } from "react";

/** Paisaje del mundo de NeuroLive: auroras y un pulso de luz. */
export function AuroraThumbnail(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  return (
    <svg viewBox="0 0 390 460" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="0"
          x2="390"
          y2="460"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#061a28" />
          <stop offset=".6" stopColor="#185655" />
          <stop offset="1" stopColor="#091d30" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M0 0h390v460H0z" />
      <g strokeLinecap="round">
        <path
          d="M-40 180Q120-50 230 100T440 50"
          stroke="#8ff2ca"
          strokeOpacity=".15"
          strokeWidth="72"
        />
        <path
          d="M-40 170Q120-40 230 90T440 40"
          stroke="#a9f4e0"
          strokeOpacity=".4"
          strokeWidth="8"
        />
        <path
          d="M-20 240Q160 50 280 160T440 90"
          stroke="#a5a0ff"
          strokeOpacity=".2"
          strokeWidth="38"
        />
      </g>
      <g fill="#d9fff5">
        <circle cx="60" cy="65" r="2" />
        <circle cx="290" cy="42" r="2" />
        <circle cx="340" cy="170" r="2" />
        <circle cx="173" cy="45" r="1.5" />
      </g>
      <path d="m0 365 72-91 58 65 66-110 94 127 46-54 54 64v94H0Z" fill="#0b2432" />
      <path d="m0 420 90-64 75 53 92-40 133 51v40H0Z" fill="#061923" />
      <path
        d="M65 259h68l20-29 28 62 30-96 25 63h89"
        stroke="#a9f4e0"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
