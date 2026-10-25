import type { SVGProps } from "react";

export function Megalodon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -20 420 190" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#46606e" />
          <stop offset=".55" stopColor="#2c4350" />
          <stop offset=".56" stopColor="#e8f1ee" />
          <stop offset="1" stopColor="#cfe0dc" />
        </linearGradient>
      </defs>
      <path
        d="M410 84 C376 56 316 38 244 40 C190 42 124 58 66 76 L20 36 C14 30 6 34 8 42 C14 70 16 96 14 126 C12 134 20 134 26 126 L66 96 C128 112 196 128 258 126 C324 124 376 108 410 84Z"
        fill="url(#sg)"
      />
      <path d="M196 42 C214 22 228 2 242 -16 C248 8 258 26 270 40Z" fill="#35505e" />
      <path
        d="M252 116 C238 140 218 158 196 170 C230 164 262 152 292 122Z"
        fill="#35505e"
      />
      <path d="M110 70 C100 56 90 46 84 38 C102 46 112 56 124 66Z" fill="#35505e" />
      <path
        d="M296 58 q8 18 0 38 M308 58 q8 18 0 38 M320 60 q8 16 0 34"
        stroke="#1f3340"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M410 84 C384 98 354 100 330 94 C352 108 388 104 410 84Z" fill="#7a2f3a" />
      <path
        d="M404 86 l-4-10 l-5 10 M384 92 l-4-10 l-5 10 M364 94 l-3-9 l-5 9 M346 94 l-3-8 l-5 8 M398 88 l2 10 l4-9 M378 96 l2 9 l4-9 M358 98 l2 8 l4-8"
        fill="#fff"
      />
      <circle cx="360" cy="68" r="6" fill="#07160f" />
      <circle cx="358" cy="66" r="1.8" fill="#fff" />
    </svg>
  );
}
