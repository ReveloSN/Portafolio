import { KID, LAKE_VIEWBOX, toUnits } from "@/lib/fishing/scene";

/** Punto de apoyo (botas, abajo al centro) y alto del dibujo original. */
const ORIGIN = { x: 267, y: 324, height: 168 } as const;
const PERCENT = 100;

const feet = toUnits(KID);
const scale = ((KID.height / PERCENT) * LAKE_VIEWBOX.height) / ORIGIN.height;
const PLACE = `translate(${feet.x} ${feet.y}) scale(${scale}) translate(${-ORIGIN.x} ${-ORIGIN.y})`;

/** El niño sentado en el muelle (SVG provisional hasta integrar su arte pintado). */
export function ProvisionalKid() {
  return (
    <g transform={PLACE} data-testid="lake-kid">
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
      <path d="M227 185 Q242 180 257 185" stroke="#a6ff5c" strokeWidth="3" fill="none" />
    </g>
  );
}
