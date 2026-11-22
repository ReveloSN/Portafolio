"use client";

import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import type { useLightbox } from "@/hooks/useLightbox";
import { useCopy } from "@/hooks/useLocale";
import { formatCounter } from "@/lib/lightbox";
import type { ProjectScreenshot } from "@/types/project";

type LightboxController = ReturnType<typeof useLightbox>;

interface LightboxProps {
  readonly shots: readonly ProjectScreenshot[];
  readonly controller: LightboxController;
}

/**
 * Visor a pantalla completa dentro de la misma página: la imagen elegida en grande, su
 * descripción y flechas para pasar a las demás (también con el teclado o deslizando).
 * Solo carga la imagen que se está viendo.
 */
export function Lightbox({ shots, controller }: LightboxProps) {
  const {
    world: { viewer },
  } = useCopy();
  const { dialogRef, index, close, step, dialogProps } = controller;
  const shot = index === null ? undefined : shots[index];
  const many = shots.length > 1;

  return (
    <dialog
      ref={dialogRef}
      aria-label={viewer.label}
      className="lightbox"
      {...dialogProps}
    >
      {shot && index !== null ? (
        <div className="lightbox-frame">
          <div className="lightbox-bar">
            <p aria-live="polite" className="text-fluid-xs font-mono tracking-[.18em]">
              {many ? formatCounter(viewer.counter, index, shots.length) : null}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label={viewer.close}
              className="lightbox-button"
              autoFocus
            >
              <Icon name="close" size={22} />
            </button>
          </div>
          <figure className="lightbox-figure">
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="100vw"
              loading="eager"
              className="lightbox-image"
            />
            <figcaption aria-hidden="true" className="text-fluid-sm leading-normal">
              {shot.alt}
            </figcaption>
          </figure>
          {many ? (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={viewer.previous}
                className="lightbox-button lightbox-step"
                data-side="prev"
              >
                <Icon name="chevronLeft" size={24} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={viewer.next}
                className="lightbox-button lightbox-step"
                data-side="next"
              >
                <Icon name="chevronRight" size={24} />
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </dialog>
  );
}
