import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { SocialLink } from "@/components/molecules/SocialLink";
import { FooterCanopy } from "@/components/worlds/art/FooterCanopy";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import type { NavLink } from "@/types/navigation";
import type { Profile } from "@/types/profile";

interface FooterProps {
  readonly profile: Profile;
  readonly links: readonly NavLink[];
}

const HEADING = "font-mono text-xs tracking-[.25em] text-glow mb-4";

export function Footer({ profile, links }: FooterProps) {
  const { footer, site } = COPY;
  return (
    <footer className="px-gutter relative -mt-px bg-[#05100b] pt-[clamp(70px,8vw,110px)] pb-9">
      <FooterCanopy
        preserveAspectRatio="none"
        className="pointer-events-none absolute -top-[89px] left-0 h-[90px] w-full"
      />
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-[380px] flex-[1_1_280px]">
            <a
              href={`#${SECTION_IDS.home}`}
              className="inline-flex items-center gap-3 no-underline"
            >
              <span className="font-display bg-glow flex h-11 w-11 items-center justify-center rounded-xl text-[17px] font-extrabold text-(--ink)">
                {profile.initials}
              </span>
              <span className="font-display text-[22px] font-extrabold">
                {profile.firstName}
              </span>
            </a>
            <p className="mt-4 leading-relaxed opacity-70">
              {profile.role}. {footer.blurb}
            </p>
          </div>
          <nav aria-label={footer.navLabel} className="flex-[0_1_200px]">
            <p className={HEADING}>{footer.quickLinks.toUpperCase()}</p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-glow no-underline opacity-80 transition hover:opacity-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex-[0_1_260px]">
            <p className={HEADING}>{footer.follow}</p>
            <ul className="flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <li key={social.kind}>
                  <SocialLink {...social} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-dashed border-white/18 pt-[26px]">
          <p className="text-sm leading-relaxed opacity-70">
            © {profile.year} {profile.firstName} · {site.madeWith}
          </p>
          <Button
            size="sm"
            href={`#${SECTION_IDS.home}`}
            aria-label={footer.backToTop}
            className="totop"
          >
            <Icon name="arrowUp" size={18} strokeWidth={2.6} />
            {footer.backToTop}
          </Button>
        </div>
      </div>
    </footer>
  );
}
