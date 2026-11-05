"use client";

import { useRef } from "react";
import { ChannelLinks } from "@/components/molecules/ChannelLinks";
import { HatchActions } from "@/components/molecules/HatchActions";
import { NestEgg } from "@/components/molecules/NestEgg";
import { NestStage } from "@/components/molecules/NestStage";
import { COPY } from "@/data/copy";
import { useEggHint } from "@/hooks/useEggHint";
import { useHatch } from "@/hooks/useHatch";
import { useOnScreen } from "@/hooks/useOnScreen";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { focusFirstField, hatchAnnouncement, openChannel } from "@/lib/contact/actions";
import { EGG_SLOTS } from "@/lib/contact/nestLayout";
import { shellFlights } from "@/lib/contact/shells";
import { interpolate } from "@/lib/utils";
import type { ChannelId, ContactChannel } from "@/types/contact";

interface ContactNestProps {
  readonly channels: readonly ContactChannel[];
}

/** Nido con un huevo por canal: al romperlo sale la cría y lleva al contacto. */
export function ContactNest({ channels }: ContactNestProps) {
  const { contact: copy } = COPY;
  const reducedMotion = useReducedMotion();
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const firstEgg = useRef<HTMLButtonElement>(null);
  const ids = channels.map((channel) => channel.id);
  const find = (id: ChannelId) => channels.find((channel) => channel.id === id);

  const hatch = useHatch({
    ids,
    reducedMotion,
    onSettled: (id) => {
      if (find(id)?.action === "focusForm") focusFirstField();
    },
    onHatchlingPress: (id) => {
      const channel = find(id);
      if (channel) openChannel(channel);
    },
  });
  const hint = useEggHint(ids, hatch.phases, onScreen && !reducedMotion);
  const last = hatch.lastHatch ? find(hatch.lastHatch.id) : undefined;
  const lastIsOut = last !== undefined && hatch.phases[last.id] === "hatched";
  const linkChannel = lastIsOut && last.action === "openLink" ? last : null;
  const resetAll = () => {
    hatch.resetAll();
    firstEgg.current?.focus();
  };

  return (
    <div className="w-full">
      <NestStage label={copy.nestLabel} paused={!onScreen} stageRef={ref}>
        {channels.map((channel, i) => {
          const phase = hatch.phases[channel.id];
          const template =
            channel.action === "focusForm" ? copy.hatchlingForm : copy.hatchlingLink;
          return (
            <NestEgg
              key={channel.id}
              channel={channel}
              slot={EGG_SLOTS[channel.id]}
              phase={phase}
              hint={hint === channel.id}
              flights={shellFlights(i, shellSizes(channel))}
              label={
                phase === "hatched"
                  ? interpolate(template, { label: channel.label })
                  : channel.ariaLabel
              }
              buttonRef={i === 0 ? firstEgg : undefined}
              onActivate={() => hatch.activate(channel.id)}
              onEnter={() => hatch.enter(channel.id)}
              onLeave={() => hatch.leave(channel.id)}
            />
          );
        })}
      </NestStage>
      <div className="mt-fluid-2 flex flex-col gap-2">
        <HatchActions
          linkChannel={linkChannel}
          showReset={hatch.open}
          hint={copy.eggHint}
          copy={copy}
          onReset={resetAll}
        />
        <ChannelLinks
          channels={channels}
          label={copy.linksLabel}
          newTabLabel={copy.newTab}
        />
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {lastIsOut ? hatchAnnouncement(last, copy) : ""}
      </p>
    </div>
  );
}

/** Ancho de cada trozo de cáscara como porcentaje del ancho del huevo. */
const shellSizes = (channel: ContactChannel) =>
  channel.shells.pieces.map((piece) => (piece.w / channel.egg.width) * 100);
