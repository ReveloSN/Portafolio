"use client";

import Image from "next/image";
import { ContactForm } from "@/components/molecules/ContactForm";
import { EggNest } from "@/components/molecules/EggNest";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import type { ContactEgg } from "@/types/contact";
import { seamBackground } from "@/lib/seams";

interface ContactProps {
  readonly eggs: readonly ContactEgg[];
}

const BACKGROUND = seamBackground(
  "--seam-contact-start",
  "--seam-contact-end",
  "radial-gradient(ellipse 80% 60% at 30% 70%, #1d4a22 0, var(--seam-contact-end) 70%)",
);

export function Contact({ eggs }: ContactProps) {
  const { contact: copy } = COPY;
  return (
    <SectionShell
      id={SECTION_IDS.contact}
      background={BACKGROUND}
      decoration={
        <Image
          src="/images/foliage-br.webp"
          alt=""
          width={1536}
          height={1024}
          sizes="560px"
          className="pointer-events-none absolute -right-[60px] -bottom-[60px] w-[min(560px,46vw)] opacity-80"
        />
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
          <EggNest
            eggs={eggs}
            hint={copy.eggHint}
            openLabel={copy.open}
            closeLabel={copy.close}
          />
          <div className="max-w-[calc(var(--u)*36.1)] min-w-[280px] flex-[1_1_400px] rounded-[28px] border border-white/16 bg-[rgba(5,16,11,.72)] p-[clamp(24px,3vw,38px)] backdrop-blur-[10px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
