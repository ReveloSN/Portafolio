import { useId } from "react";

/**
 * Sustitutos vectoriales de las piezas del abismo que todavía no tienen arte pintado
 * (medusas, pez abisal y linterna). Decorativos: sin texto ni rol.
 */

export type AbyssShapeId = "jelly" | "abyssal-fish" | "lantern";

/** Proporción (ancho / alto) de cada forma, para reservar su caja sin saltos. */
export const SHAPE_ASPECT: Readonly<Record<AbyssShapeId, number>> = {
  jelly: 120 / 160,
  "abyssal-fish": 200 / 120,
  lantern: 80 / 110,
};

function Jelly({ id }: { readonly id: string }) {
  return (
    <svg viewBox="0 0 120 160" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="50%" cy="35%" r="65%">
          <stop offset="0" stopColor="#e9ffd0" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#7fe0c8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2a8a9a" stopOpacity="0.15" />
        </radialGradient>
      </defs>
      <g fill="none" stroke="#9fe8d6" strokeOpacity="0.55" strokeWidth="2.4">
        <path d="M34 66c-6 18 8 30 0 48s6 26 2 40" />
        <path d="M52 68c4 20-8 30 0 50s-4 20 0 36" />
        <path d="M68 68c-4 20 8 30 0 50s4 20 0 36" />
        <path d="M86 66c6 18-8 30 0 48s-6 26-2 40" />
      </g>
      <path d="M8 64C8 18 112 18 112 64c-14 9-90 9-104 0Z" fill={`url(#${id})`} />
    </svg>
  );
}

function AbyssalFish({ id }: { readonly id: string }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#fff6c2" />
          <stop offset="0.4" stopColor="#ffc46b" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffc46b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M100 30q30-30 58-16" fill="none" stroke="#3b4a52" strokeWidth="3" />
      <circle cx="160" cy="14" r="14" fill={`url(#${id})`} />
      <path
        d="M20 66q20-44 80-46 60 2 78 40-20 40-78 44-58-2-80-38Zm-18 0 22-26-4 26 4 26Z"
        fill="#1b2a33"
        stroke="#4f6b78"
        strokeWidth="2"
      />
      <path
        d="M150 70l6 10 6-10 6 10 6-10"
        fill="none"
        stroke="#d9e6e0"
        strokeWidth="2.5"
      />
      <circle cx="140" cy="52" r="6" fill="#c9f27a" />
    </svg>
  );
}

function LanternSprite({ id }: { readonly id: string }) {
  return (
    <svg viewBox="0 0 80 110" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="1" stopColor="#ffb54a" />
        </linearGradient>
      </defs>
      <path d="M24 18q16-20 32 0" fill="none" stroke="#c8b27a" strokeWidth="4" />
      <rect x="16" y="18" width="48" height="12" rx="4" fill="#5c4a2a" />
      <rect x="20" y="30" width="40" height="56" rx="6" fill={`url(#${id})`} />
      <path d="M30 30v56M50 30v56" stroke="#5c4a2a" strokeWidth="3" />
      <rect x="14" y="86" width="52" height="12" rx="4" fill="#5c4a2a" />
    </svg>
  );
}

const SHAPES = { jelly: Jelly, "abyssal-fish": AbyssalFish, lantern: LanternSprite };

/** Dibuja la forma pedida con un id de degradado propio (puede haber varias a la vez). */
export function AbyssShape({ shape }: { readonly shape: AbyssShapeId }) {
  const id = useId();
  const Shape = SHAPES[shape];
  return <Shape id={`abyss-${shape}-${id.replace(/:/g, "")}`} />;
}
