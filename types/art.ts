/** Archivo ilustrado con su tamaño real (fija la proporción y evita CLS). */
export interface ArtEntry {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Texto alternativo; vacío si es decorativo. */
  readonly alt: string;
  readonly decorative: boolean;
}
