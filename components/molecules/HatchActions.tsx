import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { interpolate } from "@/lib/utils";
import type { ContactChannel } from "@/types/contact";

interface HatchActionsProps {
  /** Cría de enlace que acaba de salir: su botón aparece aquí. */
  readonly linkChannel: ContactChannel | null;
  readonly showReset: boolean;
  readonly hint: string;
  readonly copy: {
    readonly openLink: string;
    readonly newTab: string;
    readonly reset: string;
  };
  readonly onReset: () => void;
}

const ICON_PX = 16;

/** Fila bajo el nido: pista, botón de la última cría de enlace y "Volver a los huevos". */
export function HatchActions({
  linkChannel,
  showReset,
  hint,
  copy,
  onReset,
}: HatchActionsProps) {
  return (
    <div className="flex min-h-12 flex-wrap items-center justify-center gap-x-3 gap-y-2">
      {linkChannel ? (
        <Button
          size="sm"
          href={linkChannel.href}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="hatch-link"
        >
          {interpolate(copy.openLink, { label: linkChannel.label })}
          <Icon name="external" size={ICON_PX} />
          <span className="sr-only"> {copy.newTab}</span>
        </Button>
      ) : null}
      {showReset ? (
        <Button variant="ghost" size="sm" onClick={onReset} data-testid="hatch-reset">
          {copy.reset}
        </Button>
      ) : null}
      {!linkChannel && !showReset ? (
        <p className="text-fluid-sm font-mono tracking-[.12em] opacity-75">{hint}</p>
      ) : null}
    </div>
  );
}
