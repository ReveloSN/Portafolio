"use client";

import { ArtLayer } from "@/components/atoms/ArtLayer";
import { ContactForm } from "@/components/molecules/ContactForm";
import { Fireflies } from "@/components/molecules/Fireflies";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ContactNest } from "@/components/organisms/ContactNest";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { FIREFLY_COUNT } from "@/lib/constants";
import { findMailRecipient } from "@/lib/mailto";
import type { ContactChannel } from "@/types/contact";
import { seamBackground } from "@/lib/seams";

interface ContactProps {
  readonly channels: readonly ContactChannel[];
}

const BACKGROUND = seamBackground(
  "--seam-contact-start",
  "--seam-contact-end",
  "radial-gradient(ellipse 80% 60% at 30% 70%, var(--contact-glow) 0, var(--contact-bg) 70%)",
);

export function Contact({ channels }: ContactProps) {
  const { contact: copy } = COPY;
  const recipient = findMailRecipient(channels);
  return (
    <SectionShell
      id={SECTION_IDS.contact}
      background={BACKGROUND}
      className="pb-[max(var(--space-section),var(--divider-clearance))]"
      decoration={
        <>
          <ArtLayer
            src="/images/foliage-br.webp"
            width={1536}
            height={1024}
            sizes="(min-width: 1200px) 560px, 46vw"
            className="absolute right-0 bottom-0 w-[min(35rem,46vw)] opacity-80"
          />
          <Fireflies count={FIREFLY_COUNT.contact} />
        </>
      }
    >
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*83.3))]">
        <div className="mb-14">
          <SectionHeading
            align="center"
            eyebrow={copy.eyebrow}
            title={copy.title}
            intro={copy.intro}
            titleClassName="text-display"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-[clamp(36px,5vw,64px)]">
          <div className="max-w-[calc(var(--u)*46)] min-w-[280px] flex-[1_1_440px]">
            <ContactNest channels={channels} />
          </div>
          <div className="border-line max-w-[calc(var(--u)*36.1)] min-w-[280px] flex-[1_1_400px] rounded-[28px] border bg-(--panel) p-[clamp(24px,3vw,38px)] backdrop-blur-[10px]">
            {recipient ? <ContactForm recipient={recipient} /> : null}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
