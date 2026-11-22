import type { SVGProps } from "react";

export function CumbreThumbnail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 390 460"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="block h-full w-full"
      {...props}
    >
      <defs>
        <linearGradient id="pg6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#081128" />
          <stop offset=".5" stopColor="#2f4369" />
          <stop offset="1" stopColor="#d99c74" />
        </linearGradient>
        <linearGradient id="pg6c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ead5cc" />
          <stop offset=".4" stopColor="#a9b3cd" />
          <stop offset="1" stopColor="#26365a" />
        </linearGradient>
        <radialGradient id="pg6g" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffe6b3" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffe6b3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="390" height="460" fill="url(#pg6)" />
      <path d="M0 330 90 250l50 24 70-60 80 90 100-30v120H0Z" fill="#34466a" />
      <path d="M60 360 200 120l130 240Z" fill="#16233f" />
      <path d="m200 120 130 240-90 0-30-150Z" fill="#c98a73" opacity=".35" />
      <path d="m200 120-28 48 14-4 14 14 14-12 16 4Z" fill="#fbe7d2" />
      <circle cx="200" cy="106" r="26" fill="url(#pg6g)" />
      <circle cx="200" cy="106" r="3" fill="#fff4dc" />
      <path
        d="M0 350q40-26 90-10 50-28 110-2 60-26 110 4 50-20 80-6v124H0Z"
        fill="url(#pg6c)"
      />
    </svg>
  );
}
