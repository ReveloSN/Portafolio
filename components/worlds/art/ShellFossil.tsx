import type { SVGProps } from "react";

export function ShellFossil(props: SVGProps<SVGSVGElement>) {
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
      strokeLinejoin="round"
      {...props}
    >
      <path d="M32 56L6 26C12 12 22 8 32 8s20 4 26 18z" />
      <path d="M32 56L20 12M32 56l12-44M32 56V8" />
    </svg>
  );
}
