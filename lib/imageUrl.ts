import { getImageProps } from "next/image";

/** `next/image` elige el ancho para pantallas de densidad 2: se le pide la mitad. */
const DENSITY = 2;

/**
 * URL optimizada (AVIF o WebP) para donde no cabe un `<Image>`: `<image>` dentro de un SVG
 * o el póster de un `<video>`. `maxPx` es el ancho real más grande que hace falta; nunca
 * se agranda por encima del archivo original.
 */
export function optimizedSrc(src: string, maxPx: number): string {
  const size = Math.round(maxPx / DENSITY);
  return getImageProps({ src, alt: "", width: size, height: size }).props.src;
}
