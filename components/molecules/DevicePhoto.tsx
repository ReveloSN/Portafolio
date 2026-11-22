"use client";

import Image from "next/image";
import { Lightbox } from "@/components/molecules/Lightbox";
import { useLightbox } from "@/hooks/useLightbox";
import { useCopy } from "@/hooks/useLocale";
import type { ProjectScreenshot } from "@/types/project";

/** La foto ocupa algo más de la mitad del contenedor de 1200 px en escritorio. */
const PHOTO_SIZES = "(min-width: 1024px) 620px, 95vw";

interface DevicePhotoProps {
  readonly photo: ProjectScreenshot;
}

/** Foto real del dispositivo; al pulsarla se ve en grande en el visor de la página. */
export function DevicePhoto({ photo }: DevicePhotoProps) {
  const { world } = useCopy();
  const lightbox = useLightbox(1);
  return (
    <figure className="world-device-photo">
      <button
        type="button"
        onClick={(event) => lightbox.open(0, event.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`${world.galleryOpen}: ${photo.alt}`}
      >
        <Image
          src={photo.src}
          alt=""
          width={photo.width}
          height={photo.height}
          sizes={PHOTO_SIZES}
        />
      </button>
      <figcaption>{photo.alt}</figcaption>
      <Lightbox shots={[photo]} controller={lightbox} />
    </figure>
  );
}
