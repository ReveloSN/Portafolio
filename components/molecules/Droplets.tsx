import Image from "next/image";
import type { CSSProperties } from "react";
import type { Droplet } from "@/lib/fishing/breach";
import type { LakeAsset } from "@/types/lake";

interface DropletsProps {
  readonly drops: readonly Droplet[];
  /** Gotas pintadas: particle-1 … particle-10. */
  readonly sprites: readonly LakeAsset[];
  /** Punto del impacto en % de la escena. */
  readonly x: number;
  readonly waterline: number;
}

/** Gotas del impacto: cada una sube y cae en una parábola fija (un solo nodo animado). */
export function Droplets({ drops, sprites, x, waterline }: DropletsProps) {
  return (
    <>
      {drops.map((drop, index) => {
        const sprite = sprites[(drop.sprite - 1) % sprites.length];
        if (!sprite) return null;
        const style = {
          left: `${x}%`,
          top: `${waterline}%`,
          width: `${drop.size}%`,
          "--dx": drop.dx,
          "--rise": drop.rise,
          "--fall": drop.fall,
          animationDuration: `${drop.duration}ms`,
          animationDelay: `${drop.delay}ms`,
        } as CSSProperties;
        return (
          <Image
            key={index}
            src={sprite.src}
            width={sprite.width}
            height={sprite.height}
            alt=""
            sizes="24px"
            className="breach-drop"
            style={style}
          />
        );
      })}
    </>
  );
}
