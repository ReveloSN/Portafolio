import type { ReactNode } from "react";
import type { HobbyGlyphKind } from "@/types/hobby";

interface HobbyGlyphProps {
  readonly kind: HobbyGlyphKind;
  readonly className?: string;
}

/** Trazos de una sola línea, en el color de texto: sin emojis ni rellenos. */
const PATHS: Record<HobbyGlyphKind, ReactNode> = {
  wave: (
    <>
      <path d="M3 13c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 2.5-2 3-1.6" />
      <path d="M3 18c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 2.5-2 3-1.6" opacity=".55" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8.5 5.5-13.5 14-14 0 8.5-5 14-14 14z" />
      <path d="M5 19l8.5-8.5" opacity=".55" />
    </>
  ),
  note: (
    <>
      <path d="M9 17.5V6l10-2v11.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="9" width="18" height="11" rx="2" />
      <path d="M3 9l16.5-4.5.6 2.4L3.6 11.4" />
      <path d="M8 7.6l1.6 2.6M13 6.2l1.6 2.6" opacity=".55" />
    </>
  ),
};

export function HobbyGlyph({ kind, className }: HobbyGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[kind]}
    </svg>
  );
}
