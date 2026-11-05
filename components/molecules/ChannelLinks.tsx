import type { ContactChannel } from "@/types/contact";

interface ChannelLinksProps {
  readonly channels: readonly ContactChannel[];
  readonly label: string;
  readonly newTabLabel: string;
}

const isExternal = (href: string) => !href.startsWith("mailto:");

/**
 * Rótulo y enlace real de cada canal, siempre visibles bajo el nido: el huevo es una
 * capa de juego, no un requisito para encontrar el contacto.
 */
export function ChannelLinks({ channels, label, newTabLabel }: ChannelLinksProps) {
  return (
    <ul aria-label={label} className="grid gap-x-3 gap-y-1 sm:grid-cols-3">
      {channels.map((channel) => {
        const external = isExternal(channel.href);
        return (
          <li key={channel.id} className="min-w-0">
            <a
              href={channel.href}
              data-testid={`link-${channel.id}`}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="hover:bg-surface flex min-h-11 flex-col items-center justify-center rounded-2xl px-2 py-1.5 text-center no-underline transition-colors"
            >
              <span className="text-fluid-xs flex items-center gap-[.5em] font-mono font-semibold tracking-[.25em]">
                <span
                  aria-hidden="true"
                  className="size-[.6em] shrink-0 rounded-full"
                  style={{ background: channel.color }}
                />
                {channel.label.toUpperCase()}
              </span>
              <span className="text-fluid-sm text-muted max-w-full [overflow-wrap:anywhere]">
                {channel.handle}
              </span>
              {external ? <span className="sr-only"> {newTabLabel}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
