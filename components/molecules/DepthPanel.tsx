import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DepthPanelProps {
  readonly depthLabel: string;
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly kicker: string;
  readonly heading: string;
  readonly reverse?: boolean;
  readonly children: ReactNode;
}

/** Fila de la página de mundo: nombre de la profundidad + tarjeta con el contenido. */
export function DepthPanel({
  depthLabel,
  id,
  title,
  subtitle,
  kicker,
  heading,
  reverse = false,
  children,
}: DepthPanelProps) {
  return (
    <section id={id} className="world-panel" aria-labelledby={`${id}-title`}>
      <div className={cn("world-panel-inner", reverse && "world-panel-reverse")}>
        <div className="world-panel-mark">
          <p className="font-display text-glow text-fluid-xs tracking-[.35em]">
            {depthLabel}
          </p>
          <p className="font-display text-display leading-none font-extrabold">{title}</p>
          <p className="text-fluid-sm mt-1.5 opacity-80">{subtitle}</p>
        </div>
        <div className="world-panel-card">
          {kicker ? (
            <p className="font-display text-glow text-fluid-xs tracking-[.35em]">
              {kicker}
            </p>
          ) : null}
          <h2
            id={`${id}-title`}
            className="font-display text-fluid-2xl mt-2.5 mb-4 leading-[1.1] font-extrabold"
          >
            {heading}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
