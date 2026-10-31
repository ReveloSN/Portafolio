import Image from "next/image";
import type { CSSProperties } from "react";
import type { BreachTimeline } from "@/data/breach";
import { SCENE_ASPECT } from "@/lib/fishing/scene";
import type { BreachStage } from "@/types/fishing";
import type { LakeAsset } from "@/types/lake";

interface BreachActorProps {
  readonly stage: BreachStage;
  readonly timeline: BreachTimeline;
  /** Boca abierta (y, si existe, cerrada desde el mordisco). */
  readonly open: LakeAsset;
  readonly closed: LakeAsset | null;
  /** Centro del salto y línea de agua, en % de la escena. */
  readonly x: number;
  readonly waterline: number;
  /** Giro al caer (el megalodón gira más). */
  readonly fallDeg: number;
  readonly reduced: boolean;
}

const DEG = Math.PI / 180;
/** Margen para que quede del todo bajo el agua (% del alto). */
const HIDE_MARGIN = 2;

/**
 * Alturas (% del alto de la escena) que mueven a la criatura con translateY: oculta bajo
 * el agua, asomando, con la boca a `peak` sobre el agua y a media altura (movimiento reducido).
 */
function travel(timeline: BreachTimeline, art: LakeAsset) {
  const width = timeline.width * SCENE_ASPECT;
  const height = (width * art.height) / art.width;
  const angle = Math.abs(timeline.rotate.snap) * DEG;
  const extent = width * Math.sin(angle) + height * Math.cos(angle);
  const hide = height / 2 + extent / 2 + HIDE_MARGIN;
  const peak = height / 2 + extent / 2 - timeline.peak;
  return { hide, peak, bulge: hide - HIDE_MARGIN * 2, mid: (hide + peak) / 2 };
}

/**
 * La criatura que sale del agua: transform según la fase, recortada en la línea de agua.
 * Al morder cambia del dibujo con la boca abierta al de la boca cerrada.
 */
export function BreachActor(props: BreachActorProps) {
  const { stage, timeline, open, closed, x, waterline, fallDeg, reduced } = props;
  const y = travel(timeline, open);
  const bitten = stage === "snap" || stage === "fall" || stage === "splash";
  const style = {
    left: `${x}%`,
    width: `${timeline.width}%`,
    "--hide-y": y.hide,
    "--bulge-y": y.bulge,
    "--peak-y": y.peak,
    "--mid-y": y.mid,
    "--arc": timeline.arc,
    "--rise-deg": `${timeline.rotate.rise}deg`,
    "--snap-deg": `${timeline.rotate.snap}deg`,
    "--fall-deg": `${fallDeg}deg`,
    "--stage-ms": `${stage === "idle" ? 0 : timeline.stages[stage]}ms`,
  } as CSSProperties;
  return (
    <div className="breach-clip" style={{ height: `${waterline}%` }}>
      <div
        className="breach-actor"
        data-stage={stage}
        data-reduced={reduced || undefined}
        data-bitten={(bitten && closed !== null) || undefined}
        style={style}
      >
        <Image
          src={open.src}
          width={open.width}
          height={open.height}
          alt=""
          sizes="20vw"
        />
        {closed ? (
          <Image
            src={closed.src}
            width={closed.width}
            height={closed.height}
            alt=""
            sizes="20vw"
            className="breach-closed"
          />
        ) : null}
      </div>
    </div>
  );
}
