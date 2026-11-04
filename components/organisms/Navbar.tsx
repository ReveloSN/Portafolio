"use client";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import type { NavLink } from "@/types/navigation";
import type { Profile } from "@/types/profile";

interface NavbarProps {
  readonly profile: Profile;
  readonly links: readonly NavLink[];
}

const LINK_STYLE =
  "relative py-2 no-underline opacity-80 transition hover:text-glow hover:opacity-100 after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full";

export function Navbar({ profile, links }: NavbarProps) {
  const { open, toggle, close, toggleRef, onBlur } = useMobileMenu();
  const { nav } = COPY;

  return (
    <header
      onBlur={onBlur}
      className="-mb-nav border-line sticky top-0 z-60 border-b bg-(--nav-bg) backdrop-blur-[14px]"
    >
      <div className="h-nav px-gutter mx-auto flex max-w-[min(var(--content-max),calc(var(--u)*100.0))] items-center justify-between gap-4">
        <a
          href={`#${SECTION_IDS.home}`}
          className="inline-flex min-h-11 items-center gap-3 no-underline"
        >
          <span className="font-display bg-glow text-fluid-base flex size-[max(2.25rem,calc(var(--u)*2.8))] items-center justify-center rounded-xl font-extrabold text-(--ink)">
            {profile.initials}
          </span>
          <span className="font-display text-fluid-md font-extrabold tracking-[.03em]">
            {profile.firstName}
          </span>
        </a>

        <nav
          aria-label={nav.primaryLabel}
          className="gap-fluid-4 text-fluid-sm hidden items-center font-medium min-[1041px]:flex"
        >
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={LINK_STYLE}>
              {link.label}
            </a>
          ))}
          <Button size="sm" href={profile.cvUrl} download>
            <Icon name="download" size={16} strokeWidth={2.4} />
            {nav.cvShort}
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle toDarkLabel={nav.themeToDark} toLightLabel={nav.themeToLight} />
          <button
            ref={toggleRef}
            type="button"
            aria-label={nav.toggleMenu}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={toggle}
            className="text-fg border-line-strong bg-surface inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border min-[1041px]:hidden"
          >
            <Icon name="burger" size={22} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-movil"
          aria-label={nav.primaryLabel}
          className="top-nav border-line absolute right-0 left-0 flex max-h-[calc(100svh-var(--nav-h))] flex-col overflow-y-auto border-b bg-(--nav-bg-solid) px-6 pt-3 pb-6"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={close}
              className="text-fluid-md border-line border-b px-1 py-4 font-medium no-underline"
            >
              {link.label}
            </a>
          ))}
          <Button href={profile.cvUrl} download className="mt-fluid-3" onClick={close}>
            {nav.cvFull}
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
