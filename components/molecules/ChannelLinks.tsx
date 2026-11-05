import { Icon, type IconName } from "@/components/atoms/Icon";
import type { ChannelId, ContactChannel } from "@/types/contact";

interface ChannelLinksProps {
  readonly channels: readonly ContactChannel[];
  readonly label: string;
  /** Texto corto antes de los enlaces ("o ve directo:"). */
  readonly lead: string;
  readonly newTabLabel: string;
}

const CHANNEL_ICONS: Readonly<Record<ChannelId, IconName>> = {
  correo: "mail",
  linkedin: "linkedin",
  github: "github",
};
const ICON_PX = 16;

const isExternal = (href: string) => !href.startsWith("mailto:");

/**
 * Enlaces reales de cada canal en una sola línea discreta bajo el nido: el huevo es un
 * juego, no un requisito para encontrar el contacto (ni para un lector de pantalla).
 */
export function ChannelLinks({ channels, label, lead, newTabLabel }: ChannelLinksProps) {
  return (
    <nav
      aria-label={label}
      className="text-fluid-sm flex flex-wrap items-center justify-center gap-x-1"
    >
      <span className="text-muted font-mono">{lead}</span>
      <ul className="flex flex-wrap justify-center">
        {channels.map((channel) => {
          const external = isExternal(channel.href);
          return (
            <li key={channel.id}>
              <a
                href={channel.href}
                title={channel.handle}
                data-testid={`link-${channel.id}`}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="hover:bg-surface inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-semibold underline-offset-4 transition-colors hover:underline"
              >
                <Icon name={CHANNEL_ICONS[channel.id]} size={ICON_PX} />
                {channel.label}
                {external ? <span className="sr-only"> {newTabLabel}</span> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
