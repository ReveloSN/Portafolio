"use client";

import Image from "next/image";
import { Lightbox } from "@/components/molecules/Lightbox";
import { useLightbox } from "@/hooks/useLightbox";
import { useCopy } from "@/hooks/useLocale";
import { interpolate } from "@/lib/utils";
import { HOBBY_FEATURED_IMAGE_SIZES, HOBBY_SMALL_IMAGE_SIZES } from "@/data/hobbyPhotos";

const PHOTOS = {
  naturaleza: [
    { id: "atardecer", width: 1280, height: 960 },
    { id: "ave-rama", width: 960, height: 1280 },
    { id: "sol-agua", width: 720, height: 1280 },
    { id: "aves-agua", width: 960, height: 1280 },
    { id: "iguana", width: 990, height: 990, unoptimized: true },
    { id: "recuerdo-orilla", width: 1280, height: 768 },
    { id: "retrato-orilla", width: 1280, height: 959, unoptimized: true },
  ],
  "tiempo-libre": [
    { id: "animacion", width: 990, height: 990 },
    { id: "jujutsu", width: 1280, height: 960 },
    { id: "teatro", width: 1280, height: 854 },
    { id: "reunion", width: 1600, height: 1200, unoptimized: true },
    { id: "luces", width: 1280, height: 960, unoptimized: true },
  ],
} as const;

export function HobbyPhotoGallery({
  gallery,
}: {
  readonly gallery: keyof typeof PHOTOS;
}) {
  const { hobbies: copy, world } = useCopy();
  const featured = gallery === "naturaleza";
  const shots = PHOTOS[gallery].map(({ id, ...image }) => ({
    ...image,
    src: `/art/hobbies/${gallery}/${id}.webp`,
    alt: copy.photoCaptions[id],
  }));
  const lightbox = useLightbox(shots.length);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={(event) => lightbox.open(0, event.currentTarget)}
        className="group absolute inset-0 h-full w-full cursor-zoom-in text-left focus-visible:outline-offset-[-4px]"
      >
        <Image
          src={shots[0]!.src}
          alt={shots[0]!.alt}
          fill
          sizes={featured ? HOBBY_FEATURED_IMAGE_SIZES : HOBBY_SMALL_IMAGE_SIZES}
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
          loading={featured ? "eager" : "lazy"}
          fetchPriority={featured ? "high" : undefined}
        />
        <span className="text-fluid-xs absolute bottom-3 left-3 rounded-full bg-[#071410]/90 px-3.5 py-2 font-semibold text-white sm:bottom-4 sm:left-4">
          {interpolate(copy.openPhotos, { total: shots.length })}{" "}
          <span aria-hidden="true">→</span>
        </span>
      </button>
      <Lightbox
        shots={shots}
        controller={lightbox}
        labels={{
          ...copy.photoViewer,
          label: featured ? copy.natureGallery : copy.cinemaGallery,
          close: world.viewer.close,
        }}
      />
    </>
  );
}
