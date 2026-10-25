"use client";

import Image from "next/image";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { KindLegend } from "@/components/molecules/KindLegend";
import { RareCard } from "@/components/molecules/RareCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionShell } from "@/components/templates/SectionShell";
import { FishIcon } from "@/components/worlds/art/FishIcon";
import { Megalodon } from "@/components/worlds/art/Megalodon";
import { Mosasaur } from "@/components/worlds/art/Mosasaur";
import { FishingLake } from "@/components/worlds/FishingLake";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { useFishing } from "@/hooks/useFishing";
import { catchSequence, sortedExperience } from "@/lib/collections";
import { KIND_COLOR, KIND_LABEL } from "@/lib/fishingView";

const BACKGROUND = "linear-gradient(#06120d, #0a1c26 40%, #08171e)";
const SEQUENCE_INDEX = new Map(
  catchSequence.map((item, index) => [
    item.type === "entry" ? item.entry.id : item.creature,
    index,
  ]),
);

export function Experience() {
  const { experience: copy } = COPY;
  const fishing = useFishing(catchSequence.length);
  const caught = (id: string) =>
    fishing.state.caughtIndexes.includes(SEQUENCE_INDEX.get(id) ?? -1);

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
        <KindLegend />
        <FishingLake fishing={fishing} />

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
