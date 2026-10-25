import { cn } from "@/lib/utils";

interface AvatarProps {
  readonly label?: string;
  readonly background: string;
  readonly figure: string;
  readonly className?: string;
  readonly figureWidth?: string;
}

/** Silueta provisional. Se reemplaza por la foto real en `public/images`. */
export function Avatar({
  label,
  background,
  figure,
  className,
  figureWidth = "70%",
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-center overflow-hidden rounded-full",
        className,
      )}
      style={{ background }}
    >
      <svg
        viewBox="0 0 46 52"
        style={{ width: figureWidth }}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        <circle cx="23" cy="19" r="10" fill={figure} />
        <path d="M3 52c0-13 8-21 20-21s20 8 20 21z" fill={figure} />
      </svg>
    </div>
  );
}
