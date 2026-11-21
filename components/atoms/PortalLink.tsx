"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { useLocalizeHref } from "@/hooks/useLocale";
import { usePortalTransition } from "@/hooks/usePortalTransition";
import { shouldIntercept } from "@/lib/portal";

type PortalLinkProps = ComponentProps<typeof Link> & { readonly href: string };

/**
 * Enlace interno que cruza el portal. Es un `<a>` real (Ctrl+clic, abrir en otra
 * pestaña y teclado siguen igual); solo el clic simple hacia otra ruta pasa por el velo.
 * Recibe la ruta sin idioma (`/hobbies`) y la lleva a la del idioma actual (`/en/hobbies`).
 */
export function PortalLink({ href: route, onClick, ...rest }: PortalLinkProps) {
  const portal = usePortalTransition();
  const pathname = usePathname();
  const href = useLocalizeHref()(route);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!portal || !shouldIntercept(event, href, pathname)) return;
    event.preventDefault();
    portal.navigate(href);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
