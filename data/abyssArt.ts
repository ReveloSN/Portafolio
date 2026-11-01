import manifest from "@/data/abyssArtManifest.json";
import type { AbyssArtAsset, AbyssArtId } from "@/types/abyss";

interface ManifestEntry {
  readonly src: string;
  readonly mobileSrc?: string;
  readonly width: number;
  readonly height: number;
}

/**
 * Registro del arte de la inmersión, generado por scripts/optimize-abyss.ts. Es parcial:
 * lo que falte (fondos, capas, linterna, medusas…) se dibuja con un sustituto, y basta
 * volver a correr el script para que aparezca el arte, sin tocar componentes.
 */
export const ABYSS_ART: Readonly<Partial<Record<AbyssArtId, AbyssArtAsset>>> =
  Object.fromEntries(
    Object.entries(manifest as Readonly<Record<string, ManifestEntry>>).map(
      ([id, entry]) => [
        id,
        {
          id: id as AbyssArtId,
          src: entry.src,
          mobileSrc: entry.mobileSrc,
          width: entry.width,
          height: entry.height,
        },
      ],
    ),
  );
