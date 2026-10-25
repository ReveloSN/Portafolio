import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  readonly id: string;
  readonly background: string;
  readonly children: ReactNode;
  /** Decoración absoluta (hojas, ilustraciones) detrás del contenido. */
  readonly decoration?: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly clip?: boolean;
}

/** Contenedor común de las secciones: id para el scroll suave, fondo y padding fluido. */
export function SectionShell({
  id,
  background,
  children,
  decoration,
  className,
  style,
  clip = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        // isolate: las ilustraciones quedan entre el fondo y el contenido de cada sección
        "px-gutter py-section relative isolate",
        // Recorte solo horizontal: los divisores pueden cruzar la costura en vertical
        clip && "overflow-x-clip",
        className,
      )}
      style={{ background, ...style }}
    >
      {decoration}
      <div className="relative z-[2]">{children}</div>
    </section>
  );
}
