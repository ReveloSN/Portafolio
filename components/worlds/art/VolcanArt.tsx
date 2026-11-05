/** Escena del volcán: humo al fondo, cono con lava que baja y rocas al frente. */
export function VolcanArt() {
  return (
    <svg
      viewBox="0 0 1440 860"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="vl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#120504" />
          <stop offset=".5" stopColor="#3a120a" />
          <stop offset="1" stopColor="#7a2a10" />
        </linearGradient>
        <radialGradient id="vlg" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ff9a4c" stopOpacity=".6" />
          <stop offset="1" stopColor="#ff9a4c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd48a" />
          <stop offset=".4" stopColor="#ff7a35" />
          <stop offset="1" stopColor="#b8321a" />
        </linearGradient>
      </defs>
      <rect width="1440" height="860" fill="url(#vl)" />
      <circle cx="720" cy="300" r="560" fill="url(#vlg)" className="lava-glow" />
      <g
        className="px"
        style={{
          transform: "translate(calc(var(--mx, 0) * -6px), calc(var(--my, 0) * -4px))",
        }}
      >
        <g fill="#2a0f0a" opacity=".8" className="drift">
          <circle cx="640" cy="150" r="90" />
          <circle cx="740" cy="110" r="120" />
          <circle cx="850" cy="160" r="80" />
          <circle cx="560" cy="210" r="60" />
        </g>
        <path
          d="M-40 860 V520 Q120 430 260 500 Q380 420 470 520 L560 860Z"
          fill="#1e0b07"
          opacity=".85"
        />
        <path
          d="M1480 860 V500 Q1330 420 1200 490 Q1080 430 980 520 L900 860Z"
          fill="#1e0b07"
          opacity=".85"
        />
      </g>
      <g
        className="px"
        style={{
          transform: "translate(calc(var(--mx, 0) * 14px), calc(var(--my, 0) * 8px))",
        }}
      >
        <path d="M300 860 L640 300 L800 300 L1140 860Z" fill="#2a100a" />
        <path d="M640 300 L800 300 L760 340 Q720 356 680 340Z" fill="#170806" />
        <path d="M646 300 Q720 330 794 300 L782 318 Q720 344 658 318Z" fill="#ff7a35" />
        <g className="lava-glow">
          <path
            d="M712 322 C700 420 750 480 724 580 C706 650 740 720 724 860"
            fill="none"
            stroke="url(#vll)"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M690 326 C660 400 630 470 650 560 C664 620 628 700 600 860"
            fill="none"
            stroke="url(#vll)"
            strokeWidth="12"
            strokeLinecap="round"
            opacity=".85"
          />
          <path
            d="M752 326 C790 420 830 480 812 600"
            fill="none"
            stroke="url(#vll)"
            strokeWidth="9"
            strokeLinecap="round"
            opacity=".75"
          />
        </g>
      </g>
      <g
        className="px"
        style={{
          transform: "translate(calc(var(--mx, 0) * -22px), calc(var(--my, 0) * -8px))",
        }}
      >
        <path
          d="M0 860 V770 L60 720 L130 760 L210 700 L300 770 L380 730 L440 790 L520 750 L560 860Z"
          fill="#120604"
        />
        <path
          d="M1440 860 V760 L1380 710 L1300 750 L1230 690 L1150 760 L1070 730 L1010 790 L940 760 L900 860Z"
          fill="#120604"
        />
        <path d="M210 700 L232 720 L196 724Z" fill="#ff7a35" opacity=".6" />
        <path d="M1230 690 L1254 712 L1216 716Z" fill="#ff7a35" opacity=".6" />
      </g>
    </svg>
  );
}
