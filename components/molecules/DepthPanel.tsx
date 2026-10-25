import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DepthPanelProps {
  readonly depthLabel: string;
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
  title,
  subtitle,
  kicker,
  heading,
  reverse = false,
  children,
}: DepthPanelProps) {
  return (
    <div className="px-gutter py-[70px] first:pt-[90px]">
      <div
        className={cn(
          "mx-auto flex max-w-[1240px] items-center gap-12",
          reverse ? "flex-wrap-reverse" : "flex-wrap",
        )}
      >
        <div
          className={cn("flex-[0_0_240px] whitespace-nowrap", reverse && "text-right")}
        >
          <p className="font-display text-glow text-[13px] tracking-[.35em]">
            {depthLabel}
          </p>
          <p className="font-display text-[clamp(44px,5.6vw,72px)] leading-none font-extrabold">
            {title}
          </p>
          <p className="mt-1.5 text-[15px] opacity-80">{subtitle}</p>
        </div>
        <div
          className={cn(
            "relative flex-[1_1_520px] rounded-[32px] border border-white/20 bg-white/8 p-[clamp(24px,3vw,40px)]",
            "hover:border-glow transition duration-400 hover:-translate-y-2 hover:shadow-[0_30px_70px_-24px_var(--glow)]",
          )}
        >
          <p className="font-display text-glow text-[13px] tracking-[.35em]">{kicker}</p>
          <h3 className="font-display mt-2.5 mb-4 text-[clamp(30px,3.6vw,46px)] leading-[1.05] font-extrabold">
            {heading}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
}
