"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { COPY } from "@/data/copy";
import { EXPERIENCE_HOTSPOTS } from "@/data/experienceArt";
import { interpolate } from "@/lib/utils";
import type { ExperienceEntry } from "@/types/experience";

export function ExperienceFossil({
  entries,
}: {
  readonly entries: readonly ExperienceEntry[];
}) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const { experience: copy } = COPY;
  const current = entries[selected];
  if (!current) return null;
  return (
    <div className="experience-discovery mt-fluid-5">
      <div className="experience-fossil-art">
        <Image
          src="/art/experience/dinosaur-fossil.webp"
          alt={copy.fossilAlt}
          fill
          sizes="(min-width:1100px) 850px, 100vw"
          className="object-cover"
        />
        <div
          className="experience-fossil-hotspots"
          role="group"
          aria-label={copy.fossilLabel}
        >
          {entries.map((entry, index) => {
            const point = EXPERIENCE_HOTSPOTS[index];
            if (!point) return null;
            return (
              <button
                key={entry.id}
                type="button"
                className="experience-hotspot"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                aria-pressed={selected === index}
                aria-controls={id}
                aria-label={interpolate(copy.discoveryLabel, {
                  n: index + 1,
                  title: entry.title,
                })}
                onClick={() => setSelected(index)}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            );
          })}
        </div>
        <p className="experience-fossil-hint">{copy.fossilHint}</p>
      </div>
      <div
        id={id}
        className="experience-discovery-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-fluid-xs text-glow font-mono tracking-[.2em]">
          {copy.fossilDetail} · {String(selected + 1).padStart(2, "0")}
        </p>
        <p className="text-fluid-sm mt-5 opacity-75">{current.periodLabel}</p>
        <h3 className="font-display text-fluid-xl mt-2 font-extrabold">
          {current.title}
        </h3>
        <p className="text-fluid-sm mt-3 opacity-80">{current.organization}</p>
        <p className="text-fluid-base mt-5 leading-relaxed">{current.achievements[0]}</p>
      </div>
    </div>
  );
}
