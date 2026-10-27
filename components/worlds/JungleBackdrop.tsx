import Image from "next/image";
import { Illustration } from "@/components/atoms/Illustration";
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

/** Hojas de las esquinas: ancladas a cada esquina, completas y sin desplazarse fuera del borde. */
const CORNERS: readonly Corner[] = [
  {
    src: "foliage-bl",
    className: "top-0 right-0",
    width: 400,
    flip: true,
  },
  {
    src: "foliage-br",
    className: "right-0 bottom-0",
    width: 480,
  },
  {
    src: "foliage-bl",
    className: "bottom-0 left-0",
    width: 440,
  },
];

/** Ancho de cada tronco: nunca más de 680px, media pantalla ni 1.1 veces el alto visible (0.85 en pantallas bajas). */
const TRUNK_WIDTH = "min(680px, 50cqw, calc(100cqh * var(--trunk-ratio, 1.1)))";
/** El tronco derecho es más angosto, anclado al borde y completo, para no tapar la cola del dino. */
const TRUNK_RIGHT_WIDTH = `calc(${TRUNK_WIDTH} * 0.75)`;
const TRUNK_RIGHT_OFFSET = 0;

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
  const { background, trunks } = HERO_LAYERS;
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
        className="drift2 stage-water pointer-events-none absolute -left-[6%] h-[calc(420*var(--sf))] w-[112%]"
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
        <Illustration
          decorative
          priority
          src="/images/trunkL.webp"
          width={1024}
          height={1536}
          sizes="(min-width: 1400px) 680px, 50vw"
        />
      </div>
      <div
        data-testid="trunk-right"
        className="px pointer-events-none absolute top-[-4%]"
        style={{
          width: TRUNK_RIGHT_WIDTH,
          right: `calc(${TRUNK_RIGHT_WIDTH} * ${TRUNK_RIGHT_OFFSET})`,
          transform: layerShift(trunks.x, trunks.y, 1),
        }}
      >
        <Illustration
          decorative
          priority
          src="/images/trunkR.webp"
          width={1024}
          height={1536}
          sizes="(min-width: 1400px) 680px, 50vw"
        />
      </div>
      {CORNERS.map((corner) => (
        <div
          key={corner.className}
          className={`stage-w pointer-events-none absolute ${corner.className}`}
          style={
            {
              "--w": corner.width,
            } as StageVars
          }
        >
          <Illustration
            decorative
            src={`/images/${corner.src}.webp`}
            width={1536}
            height={1024}
            sizes="(min-width: 1440px) 480px, 34vw"
            imageClassName={corner.flip ? "rotate-180" : undefined}
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
