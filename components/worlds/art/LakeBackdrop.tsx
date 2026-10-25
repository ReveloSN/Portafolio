export function LakeDefs() {
  return (
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#06182a" />
        <stop offset=".6" stopColor="#1d4d5c" />
        <stop offset="1" stopColor="#6aa59a" />
      </linearGradient>
      <linearGradient id="lk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2e7a82" />
        <stop offset=".25" stopColor="#0f4a5a" />
        <stop offset="1" stopColor="#041a24" />
      </linearGradient>
      <radialGradient id="moon" cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#fff6d6" stopOpacity=".9" />
        <stop offset="1" stopColor="#fff6d6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="lamp" cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#ffc46e" stopOpacity=".8" />
        <stop offset="1" stopColor="#ffc46e" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

export function LakeScenery() {
  return (
    <>
      <rect width="1120" height="270" fill="url(#sky)" />
      <circle cx="430" cy="146" r="1.0" fill="#fff" opacity=".9" />
      <circle cx="632" cy="141" r="1.0" fill="#fff" opacity=".9" />
      <circle cx="204" cy="131" r="1.8" fill="#fff" opacity=".6" />
      <circle cx="863" cy="35" r="1.8" fill="#fff" opacity=".6" />
      <circle cx="675" cy="72" r="1.8" fill="#fff" opacity=".6" />
      <circle cx="90" cy="31" r="1.8" fill="#fff" opacity=".4" />
      <circle cx="850" cy="41" r="1.4" fill="#fff" opacity=".7" />
      <circle cx="166" cy="18" r="1.8" fill="#fff" opacity=".4" />
      <circle cx="467" cy="67" r="1.0" fill="#fff" opacity=".7" />
      <circle cx="798" cy="115" r="1.4" fill="#fff" opacity=".4" />
      <circle cx="436" cy="83" r="1.4" fill="#fff" opacity=".4" />
      <circle cx="667" cy="99" r="1.0" fill="#fff" opacity=".7" />
      <circle cx="271" cy="48" r="1.0" fill="#fff" opacity=".9" />
      <circle cx="236" cy="16" r="1.0" fill="#fff" opacity=".7" />
      <circle cx="1027" cy="59" r="1.8" fill="#fff" opacity=".8" />
      <circle cx="415" cy="128" r="1.8" fill="#fff" opacity=".5" />
      <circle cx="298" cy="121" r="1.8" fill="#fff" opacity=".7" />
      <circle cx="268" cy="115" r="1.4" fill="#fff" opacity=".5" />
      <circle cx="30" cy="83" r="1.8" fill="#fff" opacity=".6" />
      <circle cx="70" cy="67" r="1.0" fill="#fff" opacity=".7" />
      <circle cx="235" cy="24" r="1.0" fill="#fff" opacity=".5" />
      <circle cx="934" cy="80" r="1.0" fill="#fff" opacity=".8" />
      <circle cx="703" cy="89" r="1.4" fill="#fff" opacity=".4" />
      <circle cx="182" cy="37" r="1.0" fill="#fff" opacity=".8" />
      <circle cx="527" cy="17" r="1.8" fill="#fff" opacity=".6" />
      <circle cx="791" cy="130" r="1.0" fill="#fff" opacity=".8" />
      <circle cx="1020" cy="48" r="1.4" fill="#fff" opacity=".5" />
      <circle cx="345" cy="93" r="1.0" fill="#fff" opacity=".8" />
      <circle cx="540" cy="62" r="1.0" fill="#fff" opacity=".9" />
      <circle cx="432" cy="113" r="1.4" fill="#fff" opacity=".8" />
      <circle cx="190" cy="121" r="1.0" fill="#fff" opacity=".4" />
      <circle cx="253" cy="23" r="1.8" fill="#fff" opacity=".6" />
      <circle cx="518" cy="114" r="1.4" fill="#fff" opacity=".7" />
      <circle cx="1035" cy="89" r="1.8" fill="#fff" opacity=".5" />
      <circle cx="880" cy="96" r="120" fill="url(#moon)" />
      <circle cx="880" cy="96" r="44" fill="#fff6d6" />
      <circle cx="868" cy="84" r="9" fill="#e8dcae" opacity=".7" />
      <circle cx="895" cy="108" r="6" fill="#e8dcae" opacity=".7" />
      <path
        d="M0 270 L0 206 Q35 177 70 188 Q105 158 140 202 Q175 169 210 187 Q245 162 280 186 Q315 155 350 204 Q385 154 420 206 Q455 162 490 198 Q525 157 560 199 Q595 180 630 184 Q665 162 700 189 Q735 157 770 191 Q805 167 840 186 Q875 183 910 199 Q945 152 980 202 Q1015 159 1050 194 Q1085 192 1120 185 L1120 270Z"
        fill="#0c2e26"
      />
      <path
        d="M0 270 L0 236 Q28 194 56 219 Q84 193 112 222 Q140 190 168 218 Q196 210 224 231 Q252 190 280 221 Q308 182 336 217 Q364 211 392 233 Q420 194 448 227 Q476 213 504 234 Q532 188 560 216 Q588 220 616 217 Q644 197 672 222 Q700 183 728 216 Q756 212 784 217 Q812 222 840 220 Q868 218 896 235 Q924 220 952 230 Q980 207 1008 217 Q1036 221 1064 222 Q1092 202 1120 222 L1120 270Z"
        fill="#081f19"
      />
      <rect y="262" width="1120" height="258" fill="url(#lk)" />
      <g stroke="#fff6d6" strokeLinecap="round" opacity=".5">
        <path d="M830 280h100" strokeWidth="3" />
        <path d="M845 296h70" strokeWidth="2.5" />
        <path d="M856 312h48" strokeWidth="2" />
        <path d="M866 328h28" strokeWidth="2" />
      </g>
      <g stroke="#8de0e0" strokeLinecap="round" opacity=".18">
        <path
          d="M380 300h90M470 360h120M120 400h140M700 410h160M900 380h120M560 470h200M40 470h120"
          strokeWidth="2"
        />
      </g>

      <g>
        <g fill="#4a2f17">
          <rect x="36" y="278" width="16" height="130" />
          <rect x="146" y="278" width="16" height="140" />
          <rect x="256" y="278" width="16" height="130" />
          <rect x="316" y="278" width="14" height="110" />
        </g>

        <rect x="0" y="260" width="340" height="20" rx="3" fill="#8a5a2b" />
        <path
          d="M0 270h340M60 260v20M130 260v20M200 260v20M270 260v20"
          stroke="#5e3a1b"
          strokeWidth="2"
        />
        <rect x="52" y="214" width="8" height="48" fill="#4a2f17" />
        <circle cx="56" cy="206" r="60" fill="url(#lamp)" />
        <rect x="48" y="196" width="16" height="20" rx="3" fill="#ffc46e" />
      </g>

      <g>
        <path d="M254 262 H300 V274 H262Z" fill="#14312a" />
        <rect x="292" y="266" width="13" height="52" rx="6" fill="#14312a" />
        <path d="M290 316h22v8h-24z" fill="#3b2412" />
        <path d="M222 262 L226 214 Q240 202 256 214 L262 262Z" fill="#1f6b3a" />
        <path
          d="M248 222 L280 238"
          stroke="#1f6b3a"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <circle cx="282" cy="239" r="5.5" fill="#c98f62" />
        <circle cx="242" cy="194" r="14" fill="#c98f62" />
        <path d="M226 188 Q242 156 258 188Z" fill="#d9b25f" />
        <ellipse cx="242" cy="188" rx="29" ry="6" fill="#e6c577" />
        <path
          d="M227 185 Q242 180 257 185"
          stroke="#a6ff5c"
          strokeWidth="3"
          fill="none"
        />
      </g>
    </>
  );
}

export function LakeReeds() {
  return (
    <g stroke="#06130e" strokeWidth="5" strokeLinecap="round" fill="none">
      <path d="M1040 520 Q1034 440 1020 396M1060 520 Q1062 450 1080 404M1086 520 Q1090 470 1104 430M1010 520 Q1000 470 982 440" />
    </g>
  );
}
