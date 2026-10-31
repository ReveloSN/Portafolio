import type { BaitId } from "@/types/fishing";

interface BaitArtProps {
  readonly bait: BaitId;
}

/** Íconos de las carnadas (24 × 24). */
export function BaitArt({ bait }: BaitArtProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      {bait === "worm" ? (
        <path
          d="M4 16c2-5 5 1 7-3s5-3 6-1 3 3 3 0"
          stroke="#ff9e8a"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ) : null}
      {bait === "minnow" ? (
        <path d="M3 12c4-5 10-5 14 0-4 5-10 5-14 0Zm14 0 4-3v6Z" fill="#9fd6ff" />
      ) : null}
      {bait === "firefly" ? (
        <>
          <circle cx="12" cy="14" r="6" fill="#d6ff9f" opacity=".35" />
          <circle cx="12" cy="14" r="3.2" fill="#d6ff9f" />
          <path
            d="M9 9c-2-3-5-2-5 0M15 9c2-3 5-2 5 0"
            stroke="#eef6e0"
            strokeWidth="1.6"
          />
        </>
      ) : null}
    </svg>
  );
}
