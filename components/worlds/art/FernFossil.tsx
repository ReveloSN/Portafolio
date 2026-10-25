import type { SVGProps } from "react";

export function FernFossil(props: SVGProps<SVGSVGElement>) {
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
      <path d="M32 60V8" />
      <path d="M32 52l-16-8M32 52l16-8M32 40l-14-8M32 40l14-8M32 28l-11-7M32 28l11-7M32 17l-7-5M32 17l7-5" />
    </svg>
  );
}
