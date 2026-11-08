import type { ReactNode } from "react";
import type { GlyphKind } from "@/types/glyph";

interface GlyphProps {
  readonly kind: GlyphKind;
  readonly className?: string;
}

/** Trazos de tinta a mano alzada, como pictogramas tallados: una sola línea, sin rellenos. */
const PATHS: Record<GlyphKind, ReactNode> = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  eye: (
    <>
      <path d="M3 11.5c3-3.8 6-5.5 9-5.5s6 1.7 9 5.5c-3 3.8-6 5.5-9 5.5s-6-1.7-9-5.5z" />
      <circle cx="12" cy="11.5" r="2.4" />
      <path d="M9.5 16.5 7.5 21M13 17l2.5 3.5" />
    </>
  ),
  footprint: (
    <>
      <path d="M12 18V5M11.3 17.4 5.8 9M12.7 17.4 18.2 9" />
      <circle cx="12" cy="19" r="2" />
    </>
  ),
  water: (
    <path d="M3 8.5l3-2.5 3 2.5 3-2.5 3 2.5 3-2.5 3 2.5M3 15l3-2.5 3 2.5 3-2.5 3 2.5 3-2.5 3 2.5" />
  ),
  spiral: (
    <path d="M12 12c0-1 1.6-1.2 2 0 .6 1.9-2 3.4-3.8 2-2.6-2 .2-6 3.3-5.4 4 .8 4.3 6.6.4 8.5-4.4 2.1-9.2-1.6-8.2-6.3C6.8 6 11.6 3.5 16 5" />
  ),
  fern: (
    <path d="M12 21V4M12 8 8.5 5.8M12 8l3.5-2.2M12 12.5l-4.5-2.8M12 12.5l4.5-2.8M12 17l-4-2.5M12 17l4-2.5" />
  ),
  bird: (
    <>
      <path d="M4 14.5c3.5 0 5.5-5 9.5-5 1.8 0 3 .8 4 2l2.5-1-1.2 3c-1 2.3-3.2 3.5-6.3 3.5H8" />
      <path d="M11 17v3.5M14 17v3.5" />
    </>
  ),
  bone: (
    <>
      <path d="M8 8l8 8" />
      <circle cx="6.3" cy="7.6" r="1.8" />
      <circle cx="7.6" cy="6.3" r="1.8" />
      <circle cx="16.4" cy="17.7" r="1.8" />
      <circle cx="17.7" cy="16.4" r="1.8" />
    </>
  ),
  tool: (
    <>
      <path d="M14.5 3.5l6 6-2.8 2.8-6-6z" />
      <path d="M12.4 8.6 4 17l3 3 8.4-8.4" />
    </>
  ),
};

export function Glyph({ kind, className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[kind]}
    </svg>
  );
}
