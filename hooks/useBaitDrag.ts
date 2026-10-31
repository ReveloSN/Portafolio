"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type PointerEvent,
  type RefObject,
} from "react";
import type { BucketInteraction } from "@/components/molecules/BaitBucket";
import {
  centerOf,
  DRAG,
  hasDragged,
  isInZone,
  relativeTo,
  type Box,
  type Point,
} from "@/lib/fishing/drag";
import type { BaitId } from "@/types/fishing";

interface BaitDragOptions {
  /** Capa del tamaño de la escena: la carnada se mueve en sus coordenadas. */
  readonly canvasRef: RefObject<HTMLElement | null>;
  readonly zoneRef: RefObject<HTMLElement | null>;
  readonly ghostRef: RefObject<HTMLElement | null>;
  /** Sin arrastre (modo relajado): basta con tomar la carnada. */
  readonly dragEnabled: boolean;
  /** Se toma una carnada: con el puntero o con Enter/Espacio sobre el balde. */
  readonly onPick: (bait: BaitId, via: "pointer" | "keyboard") => void;
  readonly onAttach: () => void;
  /** Termina un clic con el puntero (el navegador ya movió el foco al balde). */
  readonly onPointerClick?: () => void;
}

interface DragSession {
  readonly pointerId: number;
  readonly start: Point;
  readonly origin: Point;
  readonly canvas: Box;
  readonly zone: Box;
  point: Point;
  dragging: boolean;
  inside: boolean;
  frame: number;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const PRIMARY_BUTTON = 0;
const KEYBOARD_CLICK = 0;

const translate = (p: Point) => `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;

/**
 * Arrastrar la carnada de un balde hasta el anzuelo con ratón, dedo o lápiz. La carnada
 * "fantasma" se mueve con transform en requestAnimationFrame, sin re-render por cada
 * movimiento; la zona se resalta escribiendo en el DOM.
 */
export function useBaitDrag(options: BaitDragOptions) {
  const latest = useRef(options);
  useLayoutEffect(() => {
    latest.current = options;
  });
  const session = useRef<DragSession | null>(null);

  /** Lleva la carnada de un punto a otro (coordenadas de la escena) y la oculta. */
  const fly = useCallback(async (from: Point, to: Point, ms: number) => {
    const ghost = latest.current.ghostRef.current;
    if (!ghost) return;
    ghost.dataset.state = "flying";
    if (!window.matchMedia(REDUCED_MOTION).matches) {
      const frames = [{ transform: translate(from) }, { transform: translate(to) }];
      await ghost.animate(frames, { duration: ms, easing: "ease-out" }).finished;
    }
    delete ghost.dataset.state;
  }, []);

  const render = useCallback(() => {
    const current = session.current;
    const { ghostRef, zoneRef } = latest.current;
    if (!current) return;
    current.frame = 0;
    if (ghostRef.current) {
      ghostRef.current.style.transform = translate(
        relativeTo(current.point, current.canvas),
      );
    }
    if (zoneRef.current) zoneRef.current.toggleAttribute("data-active", current.inside);
  }, []);

  const end = useCallback(
    (attach: boolean) => {
      const current = session.current;
      session.current = null;
      if (!current) return;
      cancelAnimationFrame(current.frame);
      latest.current.zoneRef.current?.removeAttribute("data-active");
      if (!current.dragging) return;
      const from = relativeTo(current.point, current.canvas);
      if (attach) {
        const to = relativeTo(centerOf(current.zone), current.canvas);
        void fly(from, to, DRAG.flightMs).then(() => latest.current.onAttach());
      } else {
        void fly(from, relativeTo(current.origin, current.canvas), DRAG.returnMs);
      }
    },
    [fly],
  );

  /** Mismo vuelo que el arrastre, desde el balde: para teclado y modo relajado. */
  const flyFromBucket = useCallback(
    async (bait: BaitId) => {
      const { canvasRef, zoneRef, ghostRef } = latest.current;
      const canvas = canvasRef.current?.getBoundingClientRect();
      const zone = zoneRef.current?.getBoundingClientRect();
      const scenebox = canvasRef.current?.parentElement;
      const bucket = scenebox?.querySelector(`[data-bucket="${bait}"]`);
      if (!canvas || !zone || !bucket || !ghostRef.current) return;
      ghostRef.current.dataset.bait = bait;
      const from = relativeTo(centerOf(bucket.getBoundingClientRect()), canvas);
      await fly(from, relativeTo(centerOf(zone), canvas), DRAG.flightMs);
    },
    [fly],
  );

  const interactionFor = useCallback(
    (bait: BaitId): BucketInteraction => ({
      onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
        if (event.button !== PRIMARY_BUTTON) return;
        const { canvasRef, zoneRef, ghostRef, dragEnabled, onPick } = latest.current;
        onPick(bait, "pointer");
        const canvas = canvasRef.current?.getBoundingClientRect();
        const zone = zoneRef.current?.getBoundingClientRect();
        if (!dragEnabled || !canvas || !zone) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        if (ghostRef.current) ghostRef.current.dataset.bait = bait;
        const point = { x: event.clientX, y: event.clientY };
        session.current = {
          pointerId: event.pointerId,
          start: point,
          origin: centerOf(event.currentTarget.getBoundingClientRect()),
          canvas,
          zone,
          point,
          dragging: false,
          inside: false,
          frame: 0,
        };
      },
      onPointerMove: (event: PointerEvent<HTMLButtonElement>) => {
        const current = session.current;
        if (!current || current.pointerId !== event.pointerId) return;
        current.point = { x: event.clientX, y: event.clientY };
        if (!current.dragging && !hasDragged(current.start, current.point)) return;
        if (!current.dragging) {
          current.dragging = true;
          const ghost = latest.current.ghostRef.current;
          if (ghost) ghost.dataset.state = "dragging";
        }
        current.inside = isInZone(current.point, current.zone);
        if (!current.frame) current.frame = requestAnimationFrame(render);
      },
      onPointerUp: () => end(session.current?.inside ?? false),
      onPointerCancel: () => end(false),
      // Enter o Espacio sobre el balde: se elige sin arrastre.
      onClick: (event) => {
        if (event.detail === KEYBOARD_CLICK) latest.current.onPick(bait, "keyboard");
        else latest.current.onPointerClick?.();
      },
    }),
    [end, render],
  );

  return { interactionFor, flyFromBucket };
}
