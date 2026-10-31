/** Archivo ilustrado con su tamaño real (fija la proporción y evita CLS). */
export interface ArtEntry {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Texto alternativo; vacío si es decorativo. */
  readonly alt: string;
  readonly decorative: boolean;
}

/** Dónde va el logo dentro de la huella: centro de la zona ancha y ancho (% del lado). */
export interface TrackLogoBox {
  readonly x: number;
  readonly y: number;
  readonly size: number;
}

/**
 * Huella del camino de tecnologías. `pool` es la cavidad interior (hueco y agua de
 * los dedos) y `rim` el borde interior de la tierra; ambas máscaras y `logo` salen
 * de scripts/track-masks.py.
 */
export interface TrackArt {
  readonly art: ArtEntry;
  readonly pool: string;
  readonly rim: string;
  readonly logo: TrackLogoBox;
}
