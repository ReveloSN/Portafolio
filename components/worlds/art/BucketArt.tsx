import type { BaitId } from "@/types/fishing";

interface BucketArtProps {
  readonly bait: BaitId;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/** Balde de madera con aros de metal y la carnada asomando (64 × 72). */
export function BucketArt({ bait, x, y, width, height }: BucketArtProps) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 64 72" aria-hidden="true">
      {bait === "firefly" ? (
        <circle cx="32" cy="16" r="18" fill="#d6ff9f" opacity=".28" />
      ) : null}
      <path d="M14 22 Q32 2 50 22" stroke="#9aa4a8" strokeWidth="2.4" fill="none" />
      {bait === "worm" ? (
        <path
          d="M22 26c2-9 8-11 10-5s6 4 8-4"
          stroke="#ff9e8a"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
      ) : null}
      {bait === "minnow" ? (
        <path d="M24 26c2-10 10-14 16-8l6-6v12l-5-2c-4 6-13 7-17 4Z" fill="#9fd6ff" />
      ) : null}
      {bait === "firefly" ? (
        <>
          <circle cx="32" cy="16" r="5" fill="#d6ff9f" />
          <path
            d="M28 12c-3-4-7-3-7 0M36 12c3-4 7-3 7 0"
            stroke="#eef6e0"
            strokeWidth="1.6"
          />
        </>
      ) : null}
      <path d="M8 24 H56 L51 68 Q32 72 13 68Z" fill="#8a5a2b" />
      <path d="M20 24 L22 69M32 24v47M44 24 L42 69" stroke="#6b4320" strokeWidth="2" />
      <ellipse cx="32" cy="24" rx="24" ry="5" fill="#5e3a1b" />
      <path d="M9 34 H55M11 56 H53" stroke="#9aa4a8" strokeWidth="3" />
    </svg>
  );
}
