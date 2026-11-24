import Image from "next/image";
import { HobbyGlyph } from "@/components/atoms/HobbyGlyph";
import { HobbyPhotoGallery } from "@/components/molecules/HobbyPhotoGallery";
import { HOBBY_PHOTOS, HOBBY_SMALL_IMAGE_SIZES } from "@/data/hobbyPhotos";
import { cn } from "@/lib/utils";
import type { Hobby } from "@/types/hobby";

interface HobbyCardProps {
  readonly hobby: Hobby;
  readonly exampleLabel: string;
}

export function HobbyCard({ hobby, exampleLabel }: HobbyCardProps) {
  const featured = hobby.featured === true;
  const photo = HOBBY_PHOTOS[hobby.id];
  const gallery =
    hobby.id === "naturaleza" || hobby.id === "tiempo-libre" ? hobby.id : undefined;
  const wideTablet = hobby.wide && !featured;
  return (
    <article
      className={cn(
        "border-line bg-surface h-full overflow-hidden rounded-3xl border",
        featured ? "grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]" : "flex flex-col",
        wideTablet && "md:max-lg:grid md:max-lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
      )}
    >
      {gallery || photo ? (
        <div
          className={cn(
            "relative isolate overflow-hidden bg-[#0b211e]",
            featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-80" : "aspect-[2/1]",
            wideTablet && "md:max-lg:aspect-auto md:max-lg:min-h-44",
          )}
        >
          {gallery ? (
            <HobbyPhotoGallery gallery={gallery} />
          ) : photo ? (
            <Image
              src={photo.src}
              alt=""
              fill
              sizes={HOBBY_SMALL_IMAGE_SIZES}
              className="object-cover"
            />
          ) : null}
        </div>
      ) : null}
      <div
        className={cn(
          "flex flex-col gap-3 p-6",
          (featured || wideTablet) && "justify-center",
          featured && "lg:p-10",
        )}
      >
        {!gallery && !photo ? (
          <HobbyGlyph kind={hobby.glyph} className="text-glow size-12" />
        ) : null}
        <h2
          className={cn(
            "font-display font-bold",
            featured ? "text-fluid-2xl" : "text-fluid-lg",
          )}
        >
          {hobby.name}
        </h2>
        <p
          className={cn(
            "max-w-[52ch] leading-relaxed opacity-85",
            featured ? "text-fluid-base" : "text-fluid-sm",
          )}
        >
          {hobby.description}
        </p>
        {/* Opacidad 70 %: con 60 % el tema claro queda en 4,15:1, por debajo de AA (4,5:1). */}
        {hobby.example ? (
          <span className="text-fluid-xs font-mono tracking-[.15em] opacity-70">
            {exampleLabel}
          </span>
        ) : null}
      </div>
    </article>
  );
}
