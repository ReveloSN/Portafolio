import type { CSSProperties } from "react";
import {
  AbyssShape,
  SHAPE_ASPECT,
  type AbyssShapeId,
} from "@/components/atoms/AbyssShapes";
import { Illustration } from "@/components/atoms/Illustration";
import { ABYSS_ART } from "@/data/abyssArt";
import type { AbyssArtId } from "@/types/abyss";

/** Qué forma vectorial reemplaza a cada pieza si su arte todavía no existe. */
const FALLBACK: Readonly<Partial<Record<AbyssArtId, AbyssShapeId>>> = {
  "jelly-1": "jelly",
  "jelly-2": "jelly",
  "abyssal-fish": "abyssal-fish",
  lantern: "lantern",
};

interface AbyssArtProps {
  readonly id: AbyssArtId;
  readonly sizes: string;
  readonly className?: string;
}

/**
 * Una pieza del abismo: el arte optimizado si está en el registro y, si no, su sustituto
 * vectorial. Siempre decorativa y con la caja reservada (sin saltos de diseño).
 */
export function AbyssArt({ id, sizes, className }: AbyssArtProps) {
  const art = ABYSS_ART[id];
  if (art) {
    return (
      <Illustration
        decorative
        src={art.src}
        width={art.width}
        height={art.height}
        sizes={sizes}
        loading="lazy"
        className={className}
      />
    );
  }
  const shape = FALLBACK[id];
  if (!shape) return null;
  const style = { aspectRatio: String(SHAPE_ASPECT[shape]) } as CSSProperties;
  return (
    <div className={className} style={style} aria-hidden="true" data-fallback={shape}>
      <AbyssShape shape={shape} />
    </div>
  );
}
