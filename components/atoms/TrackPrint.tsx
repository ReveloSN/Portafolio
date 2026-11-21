import { cn } from "@/lib/utils";

interface TrackPrintProps {
  readonly className?: string;
}

/**
 * Huellita de terópodo (tres dedos y talón), la misma del favicon. Decorativa: toma el
 * color de `currentColor` y su tamaño del texto (1em).
 */
export function TrackPrint({ className }: TrackPrintProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-[1.05em] flex-none", className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.1}
      >
        <path d="M12 16.6V4.4" />
        <path d="M11.4 16.2 5.6 8.1" />
        <path d="M12.6 16.2 18.4 8.1" />
      </g>
      <ellipse cx="12" cy="17.6" rx="3.4" ry="2.9" fill="currentColor" />
    </svg>
  );
}
