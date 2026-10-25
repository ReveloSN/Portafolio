"use client";

import { useState } from "react";
import { ContactEgg } from "@/components/molecules/ContactEgg";
import { EggArt } from "@/components/worlds/art/EggArt";
import { NestBack } from "@/components/worlds/art/NestBack";
import { NestFront } from "@/components/worlds/art/NestFront";
import type { ContactEgg as ContactEggData, EggKind } from "@/types/contact";

interface EggNestProps {
  readonly eggs: readonly ContactEggData[];
  readonly hint: string;
  readonly openLabel: string;
  readonly closeLabel: string;
}

/** Nido con huevos: cada huevo se abre para revelar un dato de contacto. */
export function EggNest({ eggs, hint, openLabel, closeLabel }: EggNestProps) {
  const [openId, setOpenId] = useState<EggKind | null>(null);
  const open = eggs.find((egg) => egg.id === openId);

  return (
    <div className="max-w-[560px] min-w-[290px] flex-[1_1_440px]">
      <div className="relative mt-5 h-[290px]">
        <NestBack aria-hidden="true" className="absolute bottom-0 left-0 h-auto w-full" />
        <ul className="absolute inset-x-0 top-[46px] flex justify-center gap-[clamp(6px,2vw,22px)] px-2">
          {eggs.map((egg) => (
            <li key={egg.id}>
              <ContactEgg
                label={egg.label}
                color={egg.color}
                open={egg.id === openId}
                ariaLabel={`${egg.id === openId ? closeLabel : openLabel} ${egg.label}`}
                art={<EggArt width={104} height={130} />}
                onToggle={() => setOpenId(egg.id === openId ? null : egg.id)}
              />
            </li>
          ))}
        </ul>
        <NestFront
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-full"
        />
      </div>
      <div aria-live="polite" className="mt-[22px] min-h-[84px] text-center">
        {open ? (
          <div>
            <p className="text-glow font-mono text-xs tracking-[.3em]">
              {open.label.toUpperCase()}
            </p>
            <a
              href={open.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display border-glow mt-2 inline-block border-b-2 text-[clamp(22px,3vw,32px)] font-extrabold no-underline"
            >
              {open.value}
            </a>
          </div>
        ) : (
          <p className="font-mono text-sm tracking-[.12em] opacity-75">{hint}</p>
        )}
      </div>
    </div>
  );
}
