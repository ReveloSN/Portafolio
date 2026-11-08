import { PhotoImage } from "@/components/atoms/PhotoImage";
import { cn } from "@/lib/utils";
import type { ProfilePhoto } from "@/types/profile";

interface AvatarProps {
  readonly label?: string;
  readonly background: string;
  readonly figure: string;
  readonly className?: string;
  readonly figureWidth?: string;
  /** Foto real: reemplaza la silueta y usa su propio texto alternativo. */
  readonly photo?: ProfilePhoto;
  /** Ancho con el que se pinta la foto (atributo `sizes`). */
  readonly photoSizes?: string;
  /** "eager" cuando el avatar se ve al cargar la página (portada). */
  readonly photoLoading?: "eager" | "lazy";
}

/** Silueta provisional; si hay `photo` (datos del perfil) se muestra la foto real. */
export function Avatar({
  label,
  background,
  figure,
  className,
  figureWidth = "70%",
  photo,
  photoSizes,
  photoLoading,
}: AvatarProps) {
  if (photo && photoSizes) {
    return (
      <div
        className={cn("overflow-hidden rounded-full", className)}
        style={{ background }}
      >
        <PhotoImage photo={photo} sizes={photoSizes} loading={photoLoading} />
      </div>
    );
  }
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
