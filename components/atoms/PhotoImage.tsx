import Image from "next/image";
import type { ProfilePhoto } from "@/types/profile";
import { cn } from "@/lib/utils";

interface PhotoImageProps {
  readonly photo: ProfilePhoto;
  /** Ancho real con el que se pinta, para que `next/image` elija la variante justa. */
  readonly sizes: string;
  readonly className?: string;
  readonly priority?: boolean;
  /** "eager" para fotos visibles al cargar (p. ej. la portada) que no son la imagen principal. */
  readonly loading?: "eager" | "lazy";
}

/** Foto personal con dimensiones explícitas y texto alternativo tomado de los datos. */
export function PhotoImage({
  photo,
  sizes,
  className,
  priority,
  loading,
}: PhotoImageProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      className={cn("size-full object-cover", className)}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  );
}
