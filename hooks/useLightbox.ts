"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { swipeDirection, wrapIndex } from "@/lib/lightbox";

/**
 * Estado del visor de imágenes: cuál está abierta (o ninguna), pasar a la anterior o la
 * siguiente con flechas o deslizando, y cerrar. Usa un <dialog> modal nativo: atrapa el
 * foco, Esc lo cierra y al cerrarse el foco vuelve al botón que lo abrió.
 */
export function useLightbox(count: number) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const [index, setIndex] = useState<number | null>(null);

  const opener = useRef<HTMLElement | null>(null);
  /** `from`: el botón que lo abre, para devolverle el foco al cerrar (Safari no lo enfoca al pulsar). */
  const open = useCallback((next: number, from?: HTMLElement) => {
    opener.current = from ?? null;
    setIndex(next);
  }, []);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((current) => (current === null ? null : wrapIndex(current, delta, count))),
    [count],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null) {
      if (dialog.open) dialog.close();
      opener.current?.focus();
      opener.current = null;
    }
  }, [index]);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
  };
  const onPointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    swipeStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent<HTMLDialogElement>) => {
    if (swipeStart.current === null) return;
    const direction = swipeDirection(swipeStart.current, event.clientX);
    swipeStart.current = null;
    swiped.current = direction !== 0;
    if (direction !== 0) step(direction);
  };
  /** Un clic en el fondo oscuro (el propio <dialog>, no su contenido) cierra; un deslizamiento no. */
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget && !swiped.current) close();
    swiped.current = false;
  };

  return {
    dialogRef,
    index,
    open,
    close,
    step,
    dialogProps: { onKeyDown, onPointerDown, onPointerUp, onClick, onClose: close },
  };
}
