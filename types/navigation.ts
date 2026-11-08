export interface NavLink {
  readonly id: string;
  readonly label: string;
  /** Ruta propia; si no existe, el enlace apunta a la sección de la portada. */
  readonly href?: string;
}
