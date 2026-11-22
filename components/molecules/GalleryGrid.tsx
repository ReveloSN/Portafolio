"use client";

import Image from "next/image";
import { Lightbox } from "@/components/molecules/Lightbox";
import { useLightbox } from "@/hooks/useLightbox";
import { useCopy } from "@/hooks/useLocale";
import type { ProjectScreenshot } from "@/types/project";

/** Captura principal a todo el ancho; secundarias en dos columnas. */
const GALLERY_SIZES = "(min-width: 1200px) 560px, (min-width: 640px) 45vw, 100vw";
const FIRST_SIZES = "(min-width: 1200px) 1120px, 95vw";
/** Teléfono o reloj: todas en fila, cada una de unos 260 px. */
const TALL_SIZES = "(min-width: 640px) 280px, 50vw";

interface GalleryGridProps {
  readonly shots: readonly ProjectScreenshot[];
  /** Capturas verticales o cuadradas (teléfono, reloj): en fila, sin una principal. */
  readonly tall: boolean;
}

/** Rejilla de capturas: cada una abre el visor en la misma página, en esa posición. */
export function GalleryGrid({ shots, tall }: GalleryGridProps) {
  const { world } = useCopy();
  const lightbox = useLightbox(shots.length);
  return (
    <>
      <ul className="world-gallery-grid" data-layout={tall ? "tall" : "wide"}>
        {shots.map((shot, index) => (
          <li key={shot.src}>
            <figure>
              <button
                type="button"
                onClick={(event) => lightbox.open(index, event.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`${world.galleryOpen}: ${shot.alt}`}
                className="world-gallery-shot"
              >
                <Image
                  src={shot.src}
                  alt=""
                  width={shot.width}
                  height={shot.height}
                  sizes={tall ? TALL_SIZES : index === 0 ? FIRST_SIZES : GALLERY_SIZES}
                />
              </button>
              <figcaption>{shot.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <Lightbox shots={shots} controller={lightbox} />
    </>
  );
}
