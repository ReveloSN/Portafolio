"use client";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { useCarousel } from "@/hooks/useCarousel";
import {
  CAROUSEL_DEPTH_PX,
  CAROUSEL_OFFSET_PERCENT,
  CAROUSEL_ROTATION_DEG,
  CAROUSEL_SIDE_OPACITY,
  CAROUSEL_SIDE_SCALE,
} from "@/lib/constants";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialsProps {
  readonly testimonials: readonly Testimonial[];
}

const BACKGROUND = "radial-gradient(ellipse 70% 60% at 50% 40%, #123a27 0, #06120d 75%)";
const TAPE_TILTS = [-3, 2, -1] as const;

function cardStyle(offset: -1 | 0 | 1) {
  const side = offset !== 0;
  return {
    transform: `translateX(-50%) translateX(${offset * CAROUSEL_OFFSET_PERCENT}%) translateZ(${side ? -CAROUSEL_DEPTH_PX : 0}px) rotateY(${-offset * CAROUSEL_ROTATION_DEG}deg) scale(${side ? CAROUSEL_SIDE_SCALE : 1})`,
    opacity: side ? CAROUSEL_SIDE_OPACITY : 1,
    zIndex: side ? 1 : 3,
  };
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const { testimonials: copy } = COPY;
  const carousel = useCarousel(testimonials.length);

  return (
    <SectionShell id={SECTION_IDS.testimonials} background={BACKGROUND}>
      <div className="mx-auto max-w-[1100px] text-center">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
        />
        <div
          className="relative mt-[54px] h-[430px] [perspective:1500px]"
          aria-roledescription="carrusel"
        >
          {testimonials.map((testimonial, i) => {
            const offset = carousel.offsetOf(i);
            return (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                ratingLabel={copy.ratingLabel}
                tapeTilt={TAPE_TILTS[i % TAPE_TILTS.length] ?? 0}
                hidden={offset !== 0}
                style={cardStyle(offset)}
              />
            );
          })}
        </div>
        <div className="mt-[34px] flex items-center justify-center gap-[22px]">
          <Button
            variant="ghost"
            size="icon"
            aria-label={copy.previous}
            onClick={carousel.prev}
          >
            <Icon name="chevronLeft" size={22} strokeWidth={2.6} />
          </Button>
          <div className="flex items-center gap-2.5">
            {testimonials.map((testimonial, i) => {
              const active = i === carousel.index;
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  aria-label={`${copy.goTo} ${i + 1}`}
                  aria-current={active}
                  onClick={() => carousel.goTo(i)}
                  className="h-2.5 cursor-pointer rounded-full border-0 p-0 transition-all duration-300"
                  style={{
                    width: active ? 34 : 10,
                    background: active ? "var(--glow)" : "rgba(238,246,224,.35)",
                  }}
                />
              );
            })}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={copy.next}
            onClick={carousel.next}
          >
            <Icon name="chevronRight" size={22} strokeWidth={2.6} />
          </Button>
        </div>
        <p
          className="mt-4 font-mono text-[13px] tracking-[.2em] opacity-70"
          aria-live="polite"
        >
          {carousel.index + 1} / {carousel.count}
        </p>
      </div>
    </SectionShell>
  );
}
