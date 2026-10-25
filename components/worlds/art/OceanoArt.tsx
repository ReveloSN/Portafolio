export function OceanoArt() {
  return (
    <svg
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="obody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14587a" />
          <stop offset=".6" stopColor="#2b8bad" />
          <stop offset="1" stopColor="#9fe3e0" />
        </linearGradient>
        <linearGradient id="oshell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5cc490" />
          <stop offset="1" stopColor="#2a7a58" />
        </linearGradient>
        <linearGradient id="oray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="osand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a7f8f" />
          <stop offset="1" stopColor="#0b4a63" />
        </linearGradient>
      </defs>

      <g className="rays">
        <polygon
          points="300,-20 420,-20 620,820 360,820"
          fill="url(#oray)"
          opacity=".5"
        />
      </g>
      <g className="rays2">
        <polygon
          points="760,-20 900,-20 1180,820 880,820"
          fill="url(#oray)"
          opacity=".4"
        />
      </g>
      <g className="rays">
        <polygon
          points="1100,-20 1170,-20 1360,820 1180,820"
          fill="url(#oray)"
          opacity=".35"
        />
      </g>

      <g
        className="px"
        style={{
          transform: "translate(calc(var(--mx, 0) * -8px), calc(var(--my, 0) * -5px))",
        }}
      >
        <path
          d="M-40 820 L-40 560 Q80 480 200 600 Q300 540 400 640 L460 820Z"
          fill="#0c5f86"
          opacity=".7"
        />
        <path
          d="M1500 820 L1500 540 Q1380 470 1280 590 Q1190 540 1110 650 L1060 820Z"
          fill="#0c5f86"
          opacity=".7"
        />
      </g>

      <g
        className="px"
        style={{
          transform:
            "translate(calc(var(--mx, 0) * 26px), calc(var(--my, 0) * 16px)) rotate(calc(var(--mx, 0) * 2.5deg))",
        }}
      >
        <g transform="translate(790 440) scale(2.1)">
          <g className="swimA">
            <path d="M60 -4 Q135 24 180 -10 Q135 -16 62 -16Z" fill="#14587a" />
            <ellipse cx="0" cy="0" rx="68" ry="31" fill="url(#obody)" />
            <path
              d="M-52 -12 C-98 -52 -100 -118 -66 -140"
              fill="none"
              stroke="#1d7396"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M-56 -16 C-100 -54 -104 -116 -72 -140"
              fill="none"
              stroke="#7fd4d9"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".5"
            />
            <ellipse
              cx="-58"
              cy="-146"
              rx="23"
              ry="12"
              fill="#1d7396"
              transform="rotate(-18 -58 -146)"
            />
            <circle cx="-64" cy="-150" r="4.5" fill="#eaffff" />
            <circle cx="-65" cy="-150" r="2" fill="#022" />
            <circle cx="-14" cy="-14" r="5" fill="#14587a" opacity=".6" />
            <circle cx="14" cy="-18" r="4" fill="#14587a" opacity=".6" />
            <circle cx="34" cy="-10" r="5" fill="#14587a" opacity=".6" />
            <g className="flap">
              <ellipse
                cx="-34"
                cy="28"
                rx="34"
                ry="9"
                fill="#14587a"
                transform="rotate(32 -34 28)"
              />
            </g>
            <g className="flapB">
              <ellipse
                cx="34"
                cy="28"
                rx="34"
                ry="9"
                fill="#14587a"
                transform="rotate(32 34 28)"
              />
            </g>
          </g>
        </g>
      </g>

      <g
        className="px"
        style={{
          transform: "translate(calc(var(--mx, 0) * -18px), calc(var(--my, 0) * -10px))",
        }}
      >
        <g transform="translate(1180 270) scale(1.1)">
          <g className="swimB">
            <ellipse cx="0" cy="0" rx="56" ry="36" fill="url(#oshell)" />
            <path
              d="M-30 -20 L0 -34 L30 -20 L30 14 L0 30 L-30 14Z"
              fill="none"
              stroke="#1f5e44"
              strokeWidth="3"
              opacity=".6"
            />
            <path
              d="M0 -34 L0 30 M-30 -4 L30 -4"
              stroke="#1f5e44"
              strokeWidth="3"
              opacity=".5"
            />
            <circle cx="-66" cy="-6" r="14" fill="#7fd1a8" />
            <circle cx="-71" cy="-9" r="3" fill="#022" />
            <path d="M52 4 L76 12 L52 12Z" fill="#7fd1a8" />
            <g className="flap">
              <ellipse
                cx="-22"
                cy="-38"
                rx="30"
                ry="8"
                fill="#7fd1a8"
                transform="rotate(-30 -22 -38)"
              />
            </g>
            <g className="flapB">
              <ellipse
                cx="-20"
                cy="40"
                rx="30"
                ry="8"
                fill="#7fd1a8"
                transform="rotate(30 -20 40)"
              />
            </g>
          </g>
        </g>
      </g>

      <g
        className="px"
        style={{
          transform: "translate(calc(var(--mx, 0) * -22px), calc(var(--my, 0) * -8px))",
        }}
      >
        <path
          d="M-40 820 L-40 730 Q200 690 420 740 Q720 700 1000 750 Q1250 705 1480 740 L1480 820Z"
          fill="url(#osand)"
        />
        <path
          d="M120 760 C100 700 150 680 128 620 M150 760 C170 700 130 670 156 610"
          fill="none"
          stroke="#ff7a59"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M1280 770 C1260 710 1310 690 1288 630 M1312 770 C1332 710 1292 680 1318 620"
          fill="none"
          stroke="#ff9a7a"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="120" cy="620" r="9" fill="#ff7a59" />
        <circle cx="156" cy="610" r="9" fill="#ff7a59" />
        <circle cx="1288" cy="630" r="9" fill="#ff9a7a" />
        <circle cx="1318" cy="620" r="9" fill="#ff9a7a" />
      </g>
    </svg>
  );
}
