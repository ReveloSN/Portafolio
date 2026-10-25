import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContactEggProps {
  readonly label: string;
  readonly color: string;
  readonly open: boolean;
  readonly ariaLabel: string;
  readonly art: ReactNode;
  readonly onToggle: () => void;
}

/** Huevo del nido: al abrirse revela al bebé dinosaurio. */
export function ContactEgg({
  label,
  color,
  open,
  ariaLabel,
  art,
  onToggle,
}: ContactEggProps) {
  return (
    <button
      type="button"
      className={cn("egg", open && "open")}
      style={{ "--c": color } as CSSProperties}
      aria-pressed={open}
      aria-label={ariaLabel}
      onClick={onToggle}
    >
      <span>{label}</span>
      {art}
    </button>
  );
}
