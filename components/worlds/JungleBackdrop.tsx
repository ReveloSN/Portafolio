import Image from "next/image";
import type { ReactNode } from "react";
import { HERO_LAYERS } from "@/lib/constants";
import { layerShift } from "@/lib/parallax";

interface JungleBackdropProps {
  /** Capas entre la niebla y el agua (pterodáctilos, dinosaurio). */
  readonly back?: ReactNode;
  /** Capas entre el agua y los troncos (canoa). */
  readonly mid?: ReactNode;
  /** Altura (px) a la que empieza el agua. */
  readonly waterTop?: number;
  readonly children?: ReactNode;
}

const GLOW =
  "radial-gradient(ellipse 46% 44% at 52% 34%, color-mix(in srgb, var(--glow) 55%, transparent) 0%, color-mix(in srgb, var(--glow) 16%, transparent) 45%, transparent 100%)";
const MIST =
  "radial-gradient(ellipse at center, rgba(217,255,201,.13), rgba(217,255,201,0) 70%)";
const WATER_MASK = "linear-gradient(to bottom, transparent, #000 24%)";

/** Selva de fondo: río, resplandor, niebla, agua, troncos y hojas con paralaje. */
export function JungleBackdrop({
  back,
  mid,
  waterTop = 520,
  children,
}: JungleBackdropProps) {
  const { background, trunks, foliage } = HERO_LAYERS;
  return (
    <>
      <div
        className="px absolute -inset-[3%]"
        style={{ transform: layerShift(background.x, background.y) }}
      >
        <Image
          src="/images/rio.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ background: GLOW }}
      />
      <div
        aria-hidden="true"
        className="drift pointer-events-none absolute top-[340px] -left-[10%] h-[170px] w-[120%]"
        style={{ background: MIST }}
      />
      {back}
      <div
        aria-hidden="true"
        className="drift2 pointer-events-none absolute -left-[6%] h-[420px] w-[112%]"
        style={{ top: waterTop }}
      >
        <Image
          src="/images/agua.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          style={{ maskImage: WATER_MASK, WebkitMaskImage: WATER_MASK }}
        />
      </div>
      {mid}
      <div
        className="px pointer-events-none absolute -top-[60px] -left-[150px] w-[680px]"
        style={{ transform: `${layerShift(trunks.x, trunks.y)} scale(1.04)` }}
      >
        <Image
          src="/images/tronco-izq.webp"
          alt=""
          width={1024}
          height={1536}
          sizes="680px"
          className="h-auto w-full"
        />
      </div>
      <div
        className="px pointer-events-none absolute -top-[60px] -right-[150px] w-[680px]"
        style={{ transform: `${layerShift(trunks.x, trunks.y)} scale(1.04)` }}
      >
        <Image
          src="/images/tronco-der.webp"
          alt=""
          width={1024}
          height={1536}
          sizes="680px"
          className="h-auto w-full"
        />
      </div>
      <div
        className="px pointer-events-none absolute -top-5 -right-5 w-[32vw] max-w-[520px]"
        style={{ transform: `${layerShift(foliage.x, foliage.y)} scale(1.05)` }}
      >
        <Image
          src="/images/foliage-bl.webp"
          alt=""
          width={1536}
          height={1024}
          sizes="520px"
          className="h-auto w-full rotate-180"
        />
      </div>
      <div
        className="px pointer-events-none absolute -right-5 -bottom-10 w-[43vw] max-w-[640px]"
        style={{ transform: `${layerShift(foliage.x, foliage.y)} scale(1.05)` }}
      >
        <Image
          src="/images/foliage-br.webp"
          alt=""
          width={1536}
          height={1024}
          sizes="640px"
          className="h-auto w-full"
        />
      </div>
      <div
        className="px pointer-events-none absolute -bottom-10 -left-[60px] w-[40vw] max-w-[590px]"
        style={{ transform: `${layerShift(foliage.x, foliage.y)} scale(1.05)` }}
      >
        <Image
          src="/images/foliage-bl.webp"
          alt=""
          width={1536}
          height={1024}
          sizes="590px"
          className="h-auto w-full"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, transparent 55%, rgba(0,0,0,.55) 100%)",
        }}
      />
      {children}
    </>
  );
}
