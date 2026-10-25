"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import type { NavLink } from "@/types/navigation";
import type { Profile } from "@/types/profile";

interface NavbarProps {
  readonly profile: Profile;
  readonly links: readonly NavLink[];
}

const LINK_STYLE =
  "relative py-2 no-underline opacity-80 transition hover:text-glow hover:opacity-100 after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full";

export function Navbar({ profile, links }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { nav } = COPY;
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-60 -mb-[72px] border-b border-white/10 bg-[rgba(5,16,11,.58)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-[clamp(20px,3vw,40px)]">
        <a
          href={`#${SECTION_IDS.home}`}
          className="inline-flex items-center gap-3 no-underline"
        >
          <span className="font-display bg-glow flex h-10 w-10 items-center justify-center rounded-xl text-base font-extrabold text-(--ink)">
            {profile.initials}
          </span>
          <span className="font-display text-[19px] font-extrabold tracking-[.03em]">
            {profile.firstName}
          </span>
        </a>

        <nav
          aria-label={nav.primaryLabel}
          className="hidden items-center gap-[26px] text-[15px] font-medium min-[1041px]:flex"
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

        <button
          type="button"
          aria-label={nav.toggleMenu}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((value) => !value)}
          className="text-leaf inline-flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-xl border border-white/25 bg-white/6 min-[1041px]:hidden"
        >
          <Icon name="burger" size={22} strokeWidth={2.4} />
        </button>
      </div>

      {open ? (
        <nav
          id="menu-movil"
          aria-label={nav.primaryLabel}
          className="absolute top-[72px] right-0 left-0 flex flex-col border-b border-white/12 bg-[rgba(5,16,11,.96)] px-6 pt-3 pb-6"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={close}
              className="border-b border-white/10 px-1 py-4 text-lg font-medium no-underline"
            >
              {link.label}
            </a>
          ))}
          <Button href={profile.cvUrl} download className="mt-[18px]" onClick={close}>
            {nav.cvFull}
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
