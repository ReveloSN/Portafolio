"use client";

import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { LakeHud } from "@/components/molecules/LakeHud";
import { RareCard } from "@/components/molecules/RareCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionShell } from "@/components/templates/SectionShell";
import { FishIcon } from "@/components/worlds/art/FishIcon";
import { Megalodon } from "@/components/worlds/art/Megalodon";
import { Mosasaur } from "@/components/worlds/art/Mosasaur";
import { LakeScene, type Leaping } from "@/components/worlds/LakeScene";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { useFishing } from "@/hooks/useFishing";
import { catchSequence, sortedExperience } from "@/lib/collections";
import {
  describeCatch,
  fishingStatus,
  KIND_COLOR,
  KIND_LABEL,
  toCssPhase,
} from "@/lib/fishingView";

const BACKGROUND = "linear-gradient(#06120d, #0a1c26 40%, #08171e)";
const SEQUENCE_INDEX = new Map(
  catchSequence.map((item, index) => [
    item.type === "entry" ? item.entry.id : item.creature,
    index,
  ]),
);

function KindLegend({ glow }: { readonly glow: string }) {
  const { experience: copy } = COPY;
  return (
    <ul className="mt-7 mb-10 flex flex-wrap justify-center gap-3.5">
      <li className="border-glow/60 bg-glow/10 inline-flex items-center gap-2.5 rounded-full border px-5 py-[9px] font-semibold">
        <Icon name="cap" style={{ color: glow }} />
        {copy.academic}
      </li>
      <li className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(255,196,110,.6)] bg-[rgba(255,196,110,.1)] px-5 py-[9px] font-semibold">
        <Icon name="briefcase" style={{ color: "#ffc46e" }} />
        {copy.work}
      </li>
    </ul>
  );
}

export function Experience() {
  const { experience: copy } = COPY;
  const total = catchSequence.length;
  const fishing = useFishing(total);
  const { state } = fishing;
  const current =
    state.currentIndex === null ? null : (catchSequence[state.currentIndex] ?? null);
  const caught = (id: string) =>
    state.caughtIndexes.includes(SEQUENCE_INDEX.get(id) ?? -1);

  const leaping: Leaping | null = !current
    ? null
    : current.type === "rare"
      ? { kind: current.creature }
      : { kind: "fish", color: KIND_COLOR[current.entry.kind] };
  const info = current ? describeCatch(current) : null;

  return (
    <SectionShell
      id={SECTION_IDS.experience}
      background={BACKGROUND}
      decoration={
        <Image
          src="/images/tronco-izq.webp"
          alt=""
          width={1024}
          height={1536}
          sizes="520px"
          className="pointer-events-none absolute -top-20 -left-[260px] w-[520px] opacity-35"
        />
      }
    >
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
        />
        <KindLegend glow="var(--glow)" />

        <div className="lake">
          <LakeScene
            phase={toCssPhase(state.phase)}
            leaping={leaping}
            label={copy.lakeLabel}
          />
          {state.phase === "caught" && info ? (
            <div className="reveal" aria-hidden="true">
              <p className="text-glow font-mono text-xs tracking-[.28em] uppercase">
                {info.kicker}
              </p>
              <p className="font-display mt-1.5 text-[clamp(20px,2.6vw,30px)] leading-[1.1] font-extrabold">
                {info.title}
              </p>
              <p className="mx-auto mt-1 max-w-[520px] text-[15px] opacity-85">
                {info.subtitle}
              </p>
            </div>
          ) : null}
          <LakeHud
            phase={state.phase}
            count={state.caughtIndexes.length}
            total={total}
            status={fishingStatus(state, total, current)}
            labels={copy}
            onCast={fishing.cast}
            onPull={fishing.pull}
            onReset={fishing.reset}
          />
        </div>

        <h3 className="font-display mt-14 mb-2 text-center text-[clamp(24px,3vw,36px)] font-extrabold">
          {copy.diaryTitle}
        </h3>
        <p className="mx-auto mb-[30px] max-w-[520px] text-center opacity-75">
          {copy.diaryIntro}
        </p>
        <ul className="grid gap-[22px] md:grid-cols-2">
          {sortedExperience.map((entry) => (
            <li key={entry.id} className="flex">
              <ExperienceCard
                entry={entry}
                kindLabel={KIND_LABEL[entry.kind]}
                statusLabel={caught(entry.id) ? copy.caught : copy.pending}
                color={KIND_COLOR[entry.kind]}
                caught={caught(entry.id)}
                fishIcon={<FishIcon width={46} height={25} aria-hidden="true" />}
              />
            </li>
          ))}
        </ul>

        <div className="rares mt-7 grid gap-[22px] md:grid-cols-2">
          <RareCard
            kicker={copy.rare.mosasaur.kicker}
            name={copy.rare.mosasaur.name}
            caught={caught("mosasaur")}
            art={<Mosasaur />}
          />
          <RareCard
            kicker={copy.rare.megalodon.kicker}
            name={copy.rare.megalodon.name}
            caught={caught("megalodon")}
            art={<Megalodon />}
          />
        </div>
      </div>
    </SectionShell>
  );
}
