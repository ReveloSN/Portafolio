import { notFound } from "next/navigation";

/**
 * Cualquier ruta que no existe dentro de un idioma (`/no-existe`, `/en/no-existe`) cae
 * aquí y muestra la 404 del sitio en ese idioma, con su navbar y su pie.
 */
export default function MissingPage() {
  notFound();
}
