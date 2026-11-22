import type { CSSProperties } from "react";
import { TECH_ICON_VIEWBOXES, techIconHref } from "@/lib/techIcons";
import type { TechIconId } from "@/types/profile";

interface TechIconProps {
  readonly id: TechIconId;
  readonly className?: string;
  readonly style?: CSSProperties;
}

/** Logotipo decorativo de una tecnología, del sprite; toma el color de `currentColor`. */
export function TechIcon({ id, className, style }: TechIconProps) {
  return (
    <svg
      viewBox={TECH_ICON_VIEWBOXES[id]}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <use href={techIconHref(id)} fill="currentColor" />
    </svg>
  );
}
