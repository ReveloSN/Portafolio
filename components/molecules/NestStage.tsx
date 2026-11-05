import type { CSSProperties, ReactNode, Ref } from "react";
import { NestBack } from "@/components/worlds/art/NestBack";
import { NestFront } from "@/components/worlds/art/NestFront";
import { HATCH_TIMING } from "@/lib/contact/hatch";
import { NEST_STAGE } from "@/lib/contact/nestLayout";

interface NestStageProps {
  readonly label: string;
  /** Fuera de pantalla los bucles (vaivén, brillo, respiración) se pausan. */
  readonly paused: boolean;
  readonly stageRef: Ref<HTMLDivElement>;
  readonly children: ReactNode;
}

const ms = (value: number) => `${value}ms`;

const STAGE_STYLE = {
  aspectRatio: `${NEST_STAGE.width} / ${NEST_STAGE.height}`,
  "--nest-base": `${NEST_STAGE.base}%`,
  "--t-shake": ms(HATCH_TIMING.shake),
  "--t-cracks": ms(HATCH_TIMING.cracks),
  "--t-flash": ms(HATCH_TIMING.flash),
  "--t-rise": ms(HATCH_TIMING.rise),
  "--t-fade": ms(HATCH_TIMING.reducedFade),
} as CSSProperties;

/**
 * Escenario del nido en tres capas: borde trasero (0), huevos y crías (1) y borde
 * delantero (2), que tapa la base de los huevos para que queden dentro del nido.
 */
export function NestStage({ label, paused, stageRef, children }: NestStageProps) {
  return (
    <div
      ref={stageRef}
      className="nest-stage mx-auto w-full max-w-[calc(var(--u)*46)]"
      style={STAGE_STYLE}
      data-paused={paused || undefined}
      data-testid="egg-nest"
    >
      <NestBack className="nest-back" />
      <ul aria-label={label} className="absolute inset-0">
        {children}
      </ul>
      <NestFront className="nest-front" />
    </div>
  );
}
