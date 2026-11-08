import type { ReactNode } from "react";
import type { WorldSlug } from "@/types/world";

/** Emblemas vectoriales propios; no sustituyen ni atribuyen logos oficiales. */
const EMBLEMS: Readonly<Record<WorldSlug, ReactNode>> = {
  aurora: (
    <>
      <path d="M14 48h15l10-17 12 35 11-42 9 24h11" />
      <path d="M27 15a37 37 0 0 1 42 0M27 81a37 37 0 0 0 42 0" />
    </>
  ),
  selva: (
    <>
      <circle cx="48" cy="48" r="33" />
      <path d="m60 33-7 20-20 10 10-21zM48 9v9m0 60v9M9 48h9m60 0h9" />
      <circle cx="48" cy="48" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  oceano: (
    <>
      <rect x="24" y="17" width="49" height="64" rx="8" />
      <path d="M39 17v-4h19v4M34 36l4 4 7-8m7 5h11M34 53l4 4 7-8m7 5h11M34 70l4 4 7-8m7 5h11" />
    </>
  ),
  cueva: (
    <>
      <path d="M73 38c0 20-25 43-25 43S23 58 23 38a25 25 0 0 1 50 0Z" />
      <path d="m57 28-5 16-16 5 5-16z" />
      <path d="M30 86h36" />
    </>
  ),
  volcan: (
    <>
      <path d="M9 48s15-23 39-23 39 23 39 23-15 23-39 23S9 48 9 48Z" />
      <circle cx="48" cy="48" r="12" />
      <path d="M48 13v5m0 60v5M16 20l5 5m54 46 5 5M16 76l5-5m54-46 5-5" />
    </>
  ),
};

export function ProjectEmblem({
  slug,
  name,
}: {
  readonly slug: WorldSlug;
  readonly name: string;
}) {
  return (
    <div className="project-emblem" aria-hidden="true">
      <svg
        viewBox="0 0 96 96"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {EMBLEMS[slug]}
      </svg>
      <span className="project-emblem-name font-display">{name}</span>
      <span className="project-emblem-rule" />
    </div>
  );
}
