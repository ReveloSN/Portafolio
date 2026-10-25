import type { SVGProps } from "react";

export function FishIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 64" {...props}>
      <path
        d="M4 32 C24 4 70 2 100 32 C70 62 24 60 4 32Z M96 32 L118 12 L112 32 L118 52Z"
        fill="currentColor"
      />
      <path
        d="M40 12 C48 4 60 4 66 10 C58 12 48 12 40 12Z"
        fill="currentColor"
        opacity=".7"
      />
      <circle cx="24" cy="28" r="4" fill="#07160f" />
      <path
        d="M40 20 q6 12 0 24 M54 18 q6 14 0 28"
        stroke="#07160f"
        strokeOpacity=".3"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
