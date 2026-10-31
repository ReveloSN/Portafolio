/** Archivo ilustrado con su tamaño real (fija la proporción y evita CLS). */
export interface ArtEntry {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Texto alternativo; vacío si es decorativo. */
  readonly alt: string;
  readonly decorative: boolean;
}

/** Huella del camino de tecnologías y la máscara de su charco (hueco y agua). */
export interface TrackArt {
  readonly art: ArtEntry;
  readonly pool: string;
}
