import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

interface TokenButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  readonly ref?: Ref<HTMLButtonElement>;
  readonly children: ReactNode;
  /** Pide atención (picada): un brillo ámbar lento. */
  readonly urgent?: boolean;
}

/** Ficha de juego: papel oscuro, borde fino y letra serif; nada de botón web neón. */
export function TokenButton({
  ref,
  children,
  urgent,
  className,
  ...rest
}: TokenButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn("lake-token", urgent && "is-urgent", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
