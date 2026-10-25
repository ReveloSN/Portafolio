import type { SVGProps } from "react";

export function EggArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="104" height="130" viewBox="0 0 120 150" aria-hidden="true" {...props}>
      <g className="baby">
        <circle cx="60" cy="92" r="26" fill="#8de05a" />
        <circle cx="50" cy="88" r="5.5" fill="#fff" />
        <circle cx="72" cy="88" r="5.5" fill="#fff" />
        <circle cx="51" cy="89" r="2.6" fill="#07160f" />
        <circle cx="73" cy="89" r="2.6" fill="#07160f" />
        <path
          d="M52 103q8 6 16 0"
          stroke="#07160f"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="40" cy="70" r="4" fill="#5cb83a" />
        <circle cx="62" cy="64" r="4" fill="#5cb83a" />
        <circle cx="82" cy="72" r="4" fill="#5cb83a" />
      </g>
      <path
        className="shell"
        d="M10 95 L28 82 L42 96 L58 80 L74 96 L90 82 L110 95 C110 130 88 148 60 148 C32 148 10 130 10 95Z"
      />
      <path
        className="shell cap"
        d="M10 95 C10 50 32 8 60 8 C88 8 110 50 110 95 L90 82 L74 96 L58 80 L42 96 L28 82Z"
      />
      <path
        d="M36 40q10-14 26-16"
        stroke="#fff"
        strokeOpacity=".55"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
