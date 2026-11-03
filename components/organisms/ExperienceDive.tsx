"use client";

import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { DepthMeter } from "@/components/molecules/DepthMeter";
import { DiveControls } from "@/components/molecules/DiveControls";
import { DiveList } from "@/components/molecules/DiveList";
import type { TimelineFilterOption } from "@/components/molecules/TimelineFilter";
import { COPY } from "@/data/copy";
import { useDiveMotion } from "@/hooks/useDiveMotion";
import { placeEntries } from "@/lib/abyss/depth";
import { DIVE_STYLE } from "@/lib/abyss/style";
import {
  countLabel,
  filterExperience,
  KIND_COLOR,
  type ExperienceFilter,
} from "@/lib/experience";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";

interface ExperienceDiveProps {
  /** Ya ordenadas de la más reciente a la más antigua. */
  readonly entries: readonly ExperienceEntry[];
  readonly heading: ReactNode;
  /** Escenario decorativo (fondos, lago, criaturas, linterna), renderizado en el servidor. */
  readonly scenery: ReactNode;
}

const { experience: copy } = COPY;

const KIND_LABEL: Readonly<Record<ExperienceKind, string>> = {
  academic: copy.academic,
  work: copy.work,
};

const OPTIONS: readonly TimelineFilterOption[] = [
  { value: "all", label: copy.all },
  { value: "academic", label: copy.academic, icon: "cap", color: KIND_COLOR.academic },
  { value: "work", label: copy.work, icon: "briefcase", color: KIND_COLOR.work },
];

/**
 * Inmersión al abismo: un escenario fijo (sticky) y, encima, en flujo normal, el título,
 * los controles y una placa por experiencia que pasa con el scroll natural. Filtrar
 * recalcula las profundidades y anuncia el número de resultados.
 */
export function ExperienceDive({ entries, heading, scenery }: ExperienceDiveProps) {
  const [filter, setFilter] = useState<ExperienceFilter>("all");
  const [lightsOn, setLightsOn] = useState(false);
  const placed = placeEntries(filterExperience(entries, filter));
  const dive = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const top = useRef<HTMLDivElement>(null);
  useDiveMotion({ dive, stage, list }, placed.length);

  const backToSurface = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dive.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    top.current?.focus({ preventScroll: true });
  };

  return (
    <div
      ref={dive}
      className="dive"
      data-lights={lightsOn ? "on" : "off"}
      data-testid="experience-dive"
      style={DIVE_STYLE}
    >
      <div ref={stage} className="dive-stage" aria-hidden="true">
        {scenery}
        <DepthMeter placed={placed} surfaceLabel={copy.surface} />
      </div>
      <div className="dive-content">
        <div className="dive-controls-dock">
          <DiveControls
            filterLabel={copy.filterLabel}
            options={OPTIONS}
            filter={filter}
            onFilter={setFilter}
            lightsLabel={copy.lights}
            lightsOn={lightsOn}
            onToggleLights={() => setLightsOn((on) => !on)}
          />
        </div>
        <div ref={top} className="dive-surface" tabIndex={-1}>
          {heading}
        </div>
        <p className="sr-only" aria-live="polite">
          {countLabel(copy.showing, placed.length, entries.length)}
        </p>
        <DiveList
          ref={list}
          placed={placed}
          kindLabels={KIND_LABEL}
          kindColors={KIND_COLOR}
          achievementsLabel={copy.achievements}
        />
        <div className="dive-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={backToSurface}
            data-testid="back-to-surface"
          >
            <Icon name="arrowUp" />
            {copy.backToSurface}
          </Button>
        </div>
      </div>
    </div>
  );
}
