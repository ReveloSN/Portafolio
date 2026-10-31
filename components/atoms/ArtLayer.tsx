import { getImageProps } from "next/image";
import { Illustration } from "@/components/atoms/Illustration";
import { cn } from "@/lib/utils";

/** Versión ligera de la misma ilustración para pantallas pequeñas. */
interface MobileSource {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Ancho de ventana (px) hasta el que se usa. */
  readonly maxViewport: number;
}

interface ArtLayerProps {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
  readonly className?: string;
  readonly imageClassName?: string;
  /** Carga inmediata; por defecto las ilustraciones se cargan al acercarse. */
  readonly eager?: boolean;
  /** Primera imagen de la escena: se pide antes que el resto. */
  readonly priority?: boolean;
  readonly mobile?: MobileSource;
}

/** Ilustración puramente decorativa: invisible para lectores de pantalla y para el puntero. */
export function ArtLayer(props: ArtLayerProps) {
  const { src, width, height, sizes, className, imageClassName, eager, priority } = props;
  if (props.mobile) return <ResponsiveArt {...props} mobile={props.mobile} />;
  return (
    <Illustration
      decorative
      src={src}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={eager ? "eager" : "lazy"}
      className={className}
      imageClassName={imageClassName}
    />
  );
}

/** <picture> con next/image: archivo grande en escritorio y el ligero hasta `maxViewport`. */
function ResponsiveArt({
  src,
  width,
  height,
  sizes,
  className,
  imageClassName,
  eager,
  priority,
  mobile,
}: ArtLayerProps & { readonly mobile: MobileSource }) {
  const loading: "eager" | "lazy" = priority || eager ? "eager" : "lazy";
  const common = { alt: "", sizes, priority, loading: priority ? undefined : loading };
  const desktop = getImageProps({ ...common, src, width, height }).props;
  const small = getImageProps({
    ...common,
    src: mobile.src,
    width: mobile.width,
    height: mobile.height,
  }).props;
  return (
    <div
      className={className}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden="true"
    >
      <picture>
        <source
          media={`(max-width: ${mobile.maxViewport}px)`}
          srcSet={small.srcSet}
          sizes={sizes}
        />
        <img
          {...desktop}
          alt=""
          draggable={false}
          className={cn(
            "pointer-events-none block h-full w-full object-contain select-none",
            imageClassName,
          )}
        />
      </picture>
    </div>
  );
}
