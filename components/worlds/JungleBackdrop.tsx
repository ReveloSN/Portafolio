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

interface FrontLayer {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
  readonly position: string;
  readonly depth: keyof typeof HERO_LAYERS;
  readonly scale: number;
  readonly imageClassName?: string;
}

const FRONT_LAYERS: readonly FrontLayer[] = [
  {
    src: "tronco-izq",
    width: 1024,
    height: 1536,
    sizes: "680px",
    position: "-left-[150px] -top-[60px] w-[680px]",
    depth: "trunks",
    scale: 1.04,
  },
  {
    src: "tronco-der",
    width: 1024,
    height: 1536,
    sizes: "680px",
    position: "-right-[150px] -top-[60px] w-[680px]",
    depth: "trunks",
    scale: 1.04,
  },
  {
    src: "foliage-bl",
    width: 1536,
    height: 1024,
    sizes: "520px",
    position: "-right-5 -top-5 w-[32vw] max-w-[520px]",
    depth: "foliage",
    scale: 1.05,
    imageClassName: "rotate-180",
  },
  {
    src: "foliage-br",
    width: 1536,
    height: 1024,
    sizes: "640px",
    position: "-right-5 -bottom-10 w-[43vw] max-w-[640px]",
    depth: "foliage",
    scale: 1.05,
  },
  {
    src: "foliage-bl",
    width: 1536,
    height: 1024,
    sizes: "590px",
    position: "-left-[60px] -bottom-10 w-[40vw] max-w-[590px]",
    depth: "foliage",
    scale: 1.05,
  },
];

const GLOW =
  "radial-gradient(ellipse 46% 44% at 52% 34%, color-mix(in srgb, var(--glow) 55%, transparent) 0%, color-mix(in srgb, var(--glow) 16%, transparent) 45%, transparent 100%)";
const MIST =
  "radial-gradient(ellipse at center, rgba(217,255,201,.13), rgba(217,255,201,0) 70%)";
const WATER_MASK = "linear-gradient(to bottom, transparent, #000 24%)";
const VIGNETTE =
  "radial-gradient(ellipse at 50% 48%, transparent 55%, rgba(0,0,0,.55) 100%)";

/** Selva de fondo: río, resplandor, niebla, agua, troncos y hojas con paralaje. */
export function JungleBackdrop({
  back,
  mid,
  waterTop = 520,
  children,
}: JungleBackdropProps) {
  const { background } = HERO_LAYERS;
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
      {FRONT_LAYERS.map((layer) => {
        const shift = HERO_LAYERS[layer.depth];
        return (
          <div
            key={`${layer.src}-${layer.position}`}
            className={`px pointer-events-none absolute ${layer.position}`}
            style={{ transform: `${layerShift(shift.x, shift.y)} scale(${layer.scale})` }}
          >
            <Image
              src={`/images/${layer.src}.webp`}
              alt=""
              width={layer.width}
              height={layer.height}
              sizes={layer.sizes}
              className={`h-auto w-full ${layer.imageClassName ?? ""}`}
            />
          </div>
        );
      })}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: VIGNETTE }}
      />
      {children}
    </>
  );
}
