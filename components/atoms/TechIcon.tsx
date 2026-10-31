import type { CSSProperties } from "react";
import { TECH_ICON_PATHS, TECH_ICON_VIEWBOXES } from "@/lib/techIcons";
import type { TechIconId } from "@/types/profile";

interface TechIconProps {
  readonly id: TechIconId;
  readonly className?: string;
  readonly style?: CSSProperties;
}

/** Logotipo decorativo de una tecnología; toma el color de `currentColor`. */
export function TechIcon({ id, className, style }: TechIconProps) {
  return (
    <svg
      viewBox={TECH_ICON_VIEWBOXES[id]}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <path d={TECH_ICON_PATHS[id]} fill="currentColor" />
    </svg>
  );
}
