import type { SVGProps } from "react";

export function TrilobiteFossil(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 64 64"
      aria-hidden="true"
      fill="none"
      stroke="#f1d9a8"
      strokeWidth="3.2"
      strokeLinecap="round"
      {...props}
    >
      <ellipse cx="32" cy="34" rx="16" ry="24" />
      <path d="M16 26h32M16 34h32M16 42h32M32 10v48" />
    </svg>
  );
}
