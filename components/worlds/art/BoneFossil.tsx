import type { SVGProps } from "react";

export function BoneFossil(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 64 64"
      aria-hidden="true"
      fill="#f1d9a8"
      {...props}
    >
      <rect x="14" y="28" width="36" height="8" rx="4" transform="rotate(-30 32 32)" />
      <circle cx="16" cy="43" r="6" transform="rotate(-30 32 32)" />
      <circle cx="16" cy="21" r="6" transform="rotate(-30 32 32)" />
      <circle cx="48" cy="43" r="6" transform="rotate(-30 32 32)" />
      <circle cx="48" cy="21" r="6" transform="rotate(-30 32 32)" />
    </svg>
  );
}
