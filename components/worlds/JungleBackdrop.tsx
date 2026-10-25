import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { HERO_LAYERS } from "@/lib/constants";
import { layerShift } from "@/lib/parallax";

interface JungleBackdropProps {
  /** Capas entre la niebla y el agua (pterodáctilos, dinosaurio). */
  readonly back?: ReactNode;
  /** Capas entre el agua y los troncos (canoa). */
  readonly mid?: ReactNode;
  /** Distancia (coordenadas del diseño) del borde inferior del agua al fondo de la escena. */
  readonly waterBottom?: number;
  readonly children?: ReactNode;
}

export type StageVars = CSSProperties & Record<`--${string}`, string | number>;

interface Corner {
  readonly src: string;
  readonly className: string;
  readonly width: number;
  readonly flip?: boolean;
}

/** Hojas de las esquinas, ancladas a cada esquina y escaladas con el stage. */
const CORNERS: readonly Corner[] = [
  {
    src: "foliage-bl",
    className: "top-[calc(-20*var(--sf))] right-[calc(-20*var(--sf))]",
    width: 520,
    flip: true,
  },
  {
    src: "foliage-br",
    className: "right-[calc(-20*var(--sf))] bottom-[calc(-40*var(--sf))]",
    width: 640,
  },
  {
    src: "foliage-bl",
    className: "bottom-[calc(-40*var(--sf))] left-[calc(-60*var(--sf))]",
    width: 590,
  },
];

/** Ancho de cada tronco: nunca más de 680px, media pantalla ni 1.1 veces el alto visible. */
const TRUNK_WIDTH = "min(680px, 50vw, calc(100svh * 1.1))";

const GLOW =
  "radial-gradient(ellipse 46% 44% at 52% 34%, color-mix(in srgb, var(--glow) 55%, transparent) 0%, color-mix(in srgb, var(--glow) 16%, transparent) 45%, transparent 100%)";
const MIST =
  "radial-gradient(ellipse at center, rgba(217,255,201,.13), rgba(217,255,201,0) 70%)";
const WATER_MASK = "linear-gradient(to bottom, transparent, #000 24%)";
const VIGNETTE =
  "radial-gradient(ellipse at 50% 48%, transparent 55%, rgba(0,0,0,.55) 100%)";

/**
 * Selva de fondo como "stage" 1440x900 que se recorta igual que object-fit: cover.
 * Orden de capas: río, (dino), agua, (canoa), troncos, hojas, viñeta.
 */
export function JungleBackdrop({
  back,
  mid,
  waterBottom = -40,
  children,
}: JungleBackdropProps) {
  const { background, trunks, foliage } = HERO_LAYERS;
  return (
    <div className="stage">
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
        className="drift stage-top pointer-events-none absolute -left-[10%] h-[calc(170*var(--sf))] w-[120%]"
        style={{ "--y": 340, background: MIST } as StageVars}
      />
      {back}
      <div
        aria-hidden="true"
        className="drift2 stage-bottom pointer-events-none absolute -left-[6%] h-[calc(420*var(--sf))] w-[112%]"
        style={{ "--b": waterBottom } as StageVars}
      >
        <Image
          src="/images/agua.webp"
          alt=""
          fill
          sizes="112vw"
          className="object-cover object-top"
          style={{ maskImage: WATER_MASK, WebkitMaskImage: WATER_MASK }}
        />
      </div>
      {mid}
      <div
        data-testid="trunk-left"
        className="px pointer-events-none absolute top-[-4%] left-[-8%]"
        style={{ width: TRUNK_WIDTH, transform: layerShift(trunks.x, trunks.y, -1) }}
      >
        <Image
          src="/images/trunkL.webp"
          alt=""
          width={1024}
          height={1536}
          sizes="680px"
          className="h-auto w-full"
        />
      </div>
      <div
        data-testid="trunk-right"
        className="px pointer-events-none absolute top-[-4%] right-[-8%]"
        style={{ width: TRUNK_WIDTH, transform: layerShift(trunks.x, trunks.y, 1) }}
      >
        <Image
          src="/images/trunkR.webp"
          alt=""
          width={1024}
          height={1536}
          sizes="680px"
          className="h-auto w-full"
        />
      </div>
      {CORNERS.map((corner) => (
        <div
          key={corner.className}
          className={`px stage-w pointer-events-none absolute ${corner.className}`}
          style={
            {
              "--w": corner.width,
              transform: `${layerShift(foliage.x, foliage.y)} scale(1.05)`,
            } as StageVars
          }
        >
          <Image
            src={`/images/${corner.src}.webp`}
            alt=""
            width={1536}
            height={1024}
            sizes="(min-width: 1440px) 640px, 45vw"
            className={`h-auto w-full ${corner.flip ? "rotate-180" : ""}`}
          />
        </div>
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: VIGNETTE }}
      />
      {children}
    </div>
  );
}
