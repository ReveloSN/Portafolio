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
        {/* Desde 1024 px, nido a la izquierda y formulario a la derecha; antes, uno sobre otro */}
        <div className="grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,1fr)]">
          <div className="w-full max-w-[calc(var(--u)*42)] justify-self-center">
            <ContactNest channels={channels} />
          </div>
          <div className="border-line w-full max-w-[calc(var(--u)*36.1)] justify-self-center rounded-[28px] border bg-(--panel) p-[clamp(24px,3vw,38px)] backdrop-blur-[10px]">
            {recipient ? <ContactForm recipient={recipient} /> : null}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
