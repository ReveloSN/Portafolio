import Image from "next/image";
import { cn } from "@/lib/utils";

interface ArtLayerProps {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
  readonly className?: string;
  /** Carga inmediata; por defecto las ilustraciones se cargan al acercarse. */
  readonly eager?: boolean;
}

/** Imagen puramente decorativa: invisible para lectores de pantalla y para el puntero. */
export function ArtLayer({ src, width, height, sizes, className, eager }: ArtLayerProps) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      sizes={sizes}
      draggable={false}
      loading={eager ? "eager" : "lazy"}
      className={cn("pointer-events-none block h-auto w-full select-none", className)}
    />
  );
}
