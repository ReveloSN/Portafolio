import type { SVGProps } from "react";

export function HatchedEgg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="92"
      height="92"
      viewBox="0 0 120 150"
      aria-hidden="true"
      style={{ overflow: "visible" }}
      {...props}
    >
      <circle cx="60" cy="92" r="30" fill="#8de05a" />
      <circle cx="49" cy="87" r="6" fill="#fff" />
      <circle cx="73" cy="87" r="6" fill="#fff" />
      <circle cx="50" cy="88" r="2.8" fill="#07160f" />
      <circle cx="74" cy="88" r="2.8" fill="#07160f" />
      <path
        d="M50 104q10 8 20 0"
        stroke="#07160f"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10 112 L28 100 L42 114 L58 98 L74 114 L90 100 L110 112 C110 140 88 150 60 150 C32 150 10 140 10 112Z"
        fill="#ffe9a6"
      />
    </svg>
  );
}
