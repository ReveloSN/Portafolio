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
  book: (
    <>
      <path d="M3 5.5C5 4.5 7.5 4.5 11 6v13c-3.5-1.5-6-1.5-8-.5z" />
      <path d="M21 5.5C19 4.5 16.5 4.5 13 6v13c3.5-1.5 6-1.5 8-.5z" />
    </>
  ),
  trail: (
    <>
      <path d="M3 20l5.5-9 3.5 4.5 2.5-3.5L21 20" />
      <path d="M11 15.5l1 1.5" opacity=".55" />
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
