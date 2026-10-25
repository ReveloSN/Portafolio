import type { SVGProps } from "react";

export function OceanoThumbnail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 390 460"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="block h-full w-full"
      {...props}
    >
      <defs>
        <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5fe3e8" />
          <stop offset=".5" stopColor="#0f7a9e" />
          <stop offset="1" stopColor="#04233a" />
        </linearGradient>
      </defs>
      <rect width="390" height="460" fill="url(#pg2)" />
      <polygon points="120,0 160,0 230,460 120,460" fill="#fff" opacity=".07" />
      <polygon points="230,0 290,0 330,460 250,460" fill="#fff" opacity=".06" />
      <g className="swim">
        <g transform="translate(200 230)">
          <ellipse cx="0" cy="0" rx="62" ry="28" fill="#0a3550" />
          <path
            d="M-50 -10 C-92 -50 -90 -112 -60 -128"
            fill="none"
            stroke="#0a3550"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <ellipse cx="-52" cy="-132" rx="18" ry="11" fill="#0a3550" />
          <circle cx="-56" cy="-135" r="3" fill="#7ff5e6" />
          <path d="M55 6 Q110 20 130 0 Q100 -4 58 -4Z" fill="#0a3550" />
          <ellipse
            cx="-22"
            cy="26"
            rx="28"
            ry="9"
            fill="#0a3550"
            transform="rotate(30 -22 26)"
          />
          <ellipse
            cx="30"
            cy="26"
            rx="28"
            ry="9"
            fill="#0a3550"
            transform="rotate(30 30 26)"
          />
        </g>
      </g>
      <circle
        className="rise"
        cx="80"
        cy="420"
        r="6"
        fill="none"
        stroke="#fff"
        opacity=".6"
      />
      <circle
        className="rise"
        cx="310"
        cy="440"
        r="9"
        fill="none"
        stroke="#fff"
        opacity=".6"
        style={{ animationDelay: "-4s" }}
      />
      <circle
        className="rise"
        cx="260"
        cy="430"
        r="5"
        fill="none"
        stroke="#fff"
        opacity=".6"
        style={{ animationDelay: "-7s" }}
      />
      <path
        d="M0 460 L0 400 Q40 360 70 410 Q90 380 120 430 L120 460Z"
        fill="#ff7a59"
        opacity=".85"
      />
    </svg>
  );
}
