"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { ringArcPath, RING_GEOMETRY } from "@/lib/fishing/ringView";
import type { RingState } from "@/types/fishing";

interface RingGaugeProps {
  readonly ring: RingState;
  /** Centro del anillo en % de la escena (sobre la boya). */
  readonly left: string;
  readonly top: string;
  readonly hitsLabel: string;
  /** Movimiento reducido: en vez de una aguja que gira, un arco que se llena. */
  readonly reduced: boolean;
}

const FULL_TURN = 360;
const MS_PER_S = 1000;
const { size, radius, center } = RING_GEOMETRY;
const CIRCUMFERENCE = 2 * Math.PI * radius;

/**
 * Anillo del minijuego sobre la boya: arco de la zona y aguja (o arco que se llena). La
 * aguja la mueve la Web Animations API sincronizada con el reloj del motor: arranca en
 * `angleAt` en el instante `since` y da una vuelta cada 360/speed segundos.
 */
export function RingGauge({ ring, left, top, hitsLabel, reduced }: RingGaugeProps) {
  const needleRef = useRef<SVGGElement>(null);
  const fillRef = useRef<SVGCircleElement>(null);
  const { angleAt, since, speed, zoneStart, zoneDeg } = ring;

  useLayoutEffect(() => {
    const element = reduced ? fillRef.current : needleRef.current;
    if (!element) return;
    const turnMs = (FULL_TURN / speed) * MS_PER_S;
    const startOffset = (angleAt / FULL_TURN) * CIRCUMFERENCE;
    // Relleno: crece desde arriba hasta la aguja y vuelve a empezar al dar la vuelta.
    const wrapAt = 1 - angleAt / FULL_TURN;
    const keyframes: Keyframe[] = reduced
      ? [
          { offset: 0, strokeDashoffset: `${CIRCUMFERENCE - startOffset}` },
          { offset: wrapAt, strokeDashoffset: "0" },
          { offset: wrapAt, strokeDashoffset: `${CIRCUMFERENCE}` },
          { offset: 1, strokeDashoffset: `${CIRCUMFERENCE - startOffset}` },
        ]
      : [{ rotate: `${angleAt}deg` }, { rotate: `${angleAt + FULL_TURN}deg` }];
    const late = performance.now() - since;
    const animation = element.animate(keyframes, {
      duration: turnMs,
      iterations: Infinity,
      delay: Math.max(0, -late),
      fill: "backwards",
    });
    if (late > 0) animation.currentTime = late;
    return () => animation.cancel();
  }, [angleAt, since, speed, reduced]);

  return (
    <div
      className="lake-ring"
      data-testid="fight-ring"
      data-zone-start={zoneStart}
      data-zone-deg={zoneDeg}
      data-angle-at={angleAt}
      data-since={since}
      data-speed={speed}
      style={{ left, top } as CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle className="lake-ring-track" cx={center} cy={center} r={radius} />
        <path className="lake-ring-zone" d={ringArcPath(zoneStart, zoneDeg)} />
        {reduced ? (
          <circle
            ref={fillRef}
            className="lake-ring-fill"
            cx={center}
            cy={center}
            r={radius}
            strokeDasharray={CIRCUMFERENCE}
          />
        ) : (
          <g ref={needleRef} className="lake-ring-needle">
            <line x1={center} y1={center} x2={center} y2={center - radius - 4} />
            <circle cx={center} cy={center} r={3} />
          </g>
        )}
      </svg>
      <p className="lake-ring-hits">{hitsLabel}</p>
    </div>
  );
}
