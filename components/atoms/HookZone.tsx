import type { Ref } from "react";
import { HOOK_POINT, toScenePercent } from "@/lib/fishing/scene";

interface HookZoneProps {
  readonly ref?: Ref<HTMLDivElement>;
  /** Visible mientras hay carnada elegida sin enganchar. */
  readonly visible: boolean;
}

/**
 * Círculo de enganche alrededor del anzuelo. Su caja es la que se usa para saber si la
 * carnada cae dentro (una sola fuente de verdad). El arrastre escribe data-active.
 */
export function HookZone({ ref, visible }: HookZoneProps) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="lake-hookzone"
      data-visible={visible || undefined}
      data-testid="hook-zone"
      style={toScenePercent(HOOK_POINT)}
    >
      <span className="lake-hookzone-tip" />
    </div>
  );
}
