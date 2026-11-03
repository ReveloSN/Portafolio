import Image from "next/image";
import type { ProfilePhoto } from "@/types/profile";
import { cn } from "@/lib/utils";

interface PhotoImageProps {
  readonly photo: ProfilePhoto;
  /** Ancho real con el que se pinta, para que `next/image` elija la variante justa. */
  readonly sizes: string;
  readonly className?: string;
  readonly priority?: boolean;
}

/** Foto personal con dimensiones explícitas y texto alternativo tomado de los datos. */
export function PhotoImage({ photo, sizes, className, priority }: PhotoImageProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      className={cn("size-full object-cover", className)}
    />
  );
}
