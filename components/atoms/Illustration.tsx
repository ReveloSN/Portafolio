import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  readonly src: string;
  /** Tamaño real del archivo: fija la proporción y evita saltos de layout (CLS). */
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
  readonly className?: string;
  readonly imageClassName?: string;
  readonly style?: CSSProperties;
  readonly priority?: boolean;
  readonly loading?: "eager" | "lazy";
  readonly testId?: string;
}

/** Una ilustración con contenido necesita alt; una decorativa se oculta a lectores de pantalla. */
type IllustrationProps = BaseProps &
  (
    | { readonly alt: string; readonly decorative?: false }
    | { readonly decorative: true; readonly alt?: never }
  );

/**
 * Ilustración completa: el contenedor toma la proporción real del archivo y la imagen
 * se ajusta con object-fit: contain, así nunca se recorta.
 */
export function Illustration(props: IllustrationProps) {
  const {
    src,
    width,
    height,
    sizes,
    className,
    imageClassName,
    style,
    priority,
    loading,
    testId,
  } = props;
  const decorative = props.decorative === true;
  return (
    <div
      className={className}
      style={{ aspectRatio: `${width} / ${height}`, ...style }}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={src}
        alt={decorative ? "" : props.alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : loading}
        draggable={decorative ? false : undefined}
        data-testid={testId}
        className={cn(
          "block h-full w-full object-contain",
          decorative && "pointer-events-none select-none",
          imageClassName,
        )}
      />
    </div>
  );
}
