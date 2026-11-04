import { Icon, type IconName } from "@/components/atoms/Icon";
import type { Social, SocialKind } from "@/types/profile";

const SOCIAL_ICONS: Readonly<Record<SocialKind, IconName>> = {
  github: "github",
  linkedin: "linkedin",
  instagram: "instagram",
  mail: "mail",
};

export function SocialLink({ kind, label, href }: Social) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-fg hover:bg-glow border-line-strong bg-surface inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border transition duration-300 hover:-translate-y-1 hover:text-(--ink)"
    >
      <Icon name={SOCIAL_ICONS[kind]} size={22} strokeWidth={2} />
    </a>
  );
}
