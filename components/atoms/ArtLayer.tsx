import { Illustration } from "@/components/atoms/Illustration";

interface ArtLayerProps {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
  readonly className?: string;
  readonly imageClassName?: string;
  /** Carga inmediata; por defecto las ilustraciones se cargan al acercarse. */
  readonly eager?: boolean;
}

/** Ilustración puramente decorativa: invisible para lectores de pantalla y para el puntero. */
export function ArtLayer({
  src,
  width,
  height,
  sizes,
  className,
  imageClassName,
  eager,
}: ArtLayerProps) {
  return (
    <Illustration
      decorative
      src={src}
      width={width}
      height={height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={className}
      imageClassName={imageClassName}
    />
  );
}
