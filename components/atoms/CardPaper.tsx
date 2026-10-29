import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardPaperProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Papel de la credencial: marco, esquinas y sombra comunes al frente y al reverso.
 * Las medidas están en cqw: escala con el ancho del contenedor de la tarjeta.
 */
export function CardPaper({ children, className }: CardPaperProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[6cqw] bg-[#efe6cf] p-[6cqw] text-[#17281d] shadow-[0_7cqw_14cqw_-5cqw_rgba(0,0,0,.7)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
