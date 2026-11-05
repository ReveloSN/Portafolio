import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import type { ContactEgg } from "@/types/contact";

interface EggRevealProps {
  readonly egg: ContactEgg;
  /** Aviso para lectores de pantalla en los enlaces que abren otra pestaña. */
  readonly newTabLabel: string;
}

const MAILTO_PREFIX = "mailto:";
const ICON_PX = 20;

/** Lo que deja el huevo al romperse: su nombre y un botón hacia el contacto. */
export function EggReveal({ egg, newTabLabel }: EggRevealProps) {
  const external = !egg.href.startsWith(MAILTO_PREFIX);
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-glow text-fluid-xs font-mono tracking-[.3em]">
        {egg.label.toUpperCase()}
      </p>
      <Button
        href={egg.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Icon name={egg.id} size={ICON_PX} />
        {egg.action}
        {external ? <span className="sr-only"> {newTabLabel}</span> : null}
      </Button>
    </div>
  );
}
