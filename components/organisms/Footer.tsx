import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { SeamLayer } from "@/components/molecules/SeamLayer";
import { SocialLink } from "@/components/molecules/SocialLink";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import type { NavLink } from "@/types/navigation";
import type { Profile } from "@/types/profile";

interface FooterProps {
  readonly profile: Profile;
  readonly links: readonly NavLink[];
}

const HEADING = "font-mono text-fluid-xs tracking-[.25em] text-glow mb-4";

export function Footer({ profile, links }: FooterProps) {
  const { footer, site } = COPY;
  return (
    <footer className="px-gutter relative isolate -mt-px bg-(--seam-contact-end) pt-[clamp(70px,8vw,110px)] pb-9">
      <SeamLayer seam="contact-footer" host="lower" />
      <div className="relative z-[2] mx-auto max-w-[min(var(--content-max),calc(var(--u)*83.3))]">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-[calc(var(--u)*26.4)] flex-[1_1_280px]">
            <a
              href={`#${SECTION_IDS.home}`}
              className="inline-flex items-center gap-3 no-underline"
            >
              <span className="font-display bg-glow text-fluid-base flex h-11 w-11 items-center justify-center rounded-xl font-extrabold text-(--ink)">
                {profile.initials}
              </span>
              <span className="font-display text-fluid-lg font-extrabold">
                {profile.firstName}
              </span>
            </a>
            <p className="mt-4 leading-relaxed opacity-70">
              {profile.role}. {footer.blurb}
            </p>
          </div>
          <nav aria-label={footer.navLabel} className="flex-[0_1_200px]">
            <p className={HEADING}>{footer.quickLinks.toUpperCase()}</p>
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-glow coarse:min-h-11 inline-flex min-h-8 items-center no-underline opacity-80 transition hover:opacity-100"
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
        <div className="pt-fluid-4 mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-dashed border-white/18">
          <p className="text-fluid-sm leading-relaxed opacity-70">
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
