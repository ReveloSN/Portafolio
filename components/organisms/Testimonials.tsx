"use client";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { CarouselDots } from "@/components/molecules/CarouselDots";
import { SeamLayer } from "@/components/molecules/SeamLayer";
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
import { carouselDotLabel } from "@/lib/carousel";
import type { Testimonial } from "@/types/testimonial";
import { seamBackground } from "@/lib/seams";

interface TestimonialsProps {
  readonly testimonials: readonly Testimonial[];
}

const BACKGROUND = seamBackground(
  "--seam-testimonials-start",
  "--seam-testimonials-end",
  "radial-gradient(ellipse 70% 60% at 50% 40%, var(--testimonials-glow) 0, var(--seam-testimonials-end) 75%)",
);
const TAPE_TILTS = [-3, 2, -1] as const;

function cardStyle(offset: -1 | 0 | 1) {
  const side = offset !== 0;
  return {
    transform: `translateX(${offset * CAROUSEL_OFFSET_PERCENT}%) translateZ(${side ? -CAROUSEL_DEPTH_PX : 0}px) rotateY(${-offset * CAROUSEL_ROTATION_DEG}deg) scale(${side ? CAROUSEL_SIDE_SCALE : 1})`,
    opacity: side ? CAROUSEL_SIDE_OPACITY : 1,
    zIndex: side ? 1 : 3,
  };
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const { testimonials: copy } = COPY;
  const carousel = useCarousel(testimonials.length);

  return (
    <SectionShell
      id={SECTION_IDS.testimonials}
      background={BACKGROUND}
      decoration={<SeamLayer seam="projects-testimonials" host="lower" />}
    >
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*76.4))] text-center">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
        />
        <div
          data-testid="carousel-stage"
          className="mt-fluid-6 relative grid items-start [perspective:1500px]"
          role="group"
          aria-roledescription="carrusel"
          aria-label={copy.carouselLabel}
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
        <div className="mt-fluid-4 gap-fluid-3 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label={copy.previous}
            onClick={carousel.prev}
          >
            <Icon name="chevronLeft" size={22} strokeWidth={2.6} />
          </Button>
          <CarouselDots
            count={carousel.count}
            active={carousel.index}
            labelFor={(i) => carouselDotLabel(copy.dotLabel, i, carousel.count)}
            onSelect={carousel.goTo}
          />
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
          className="text-fluid-xs mt-4 font-mono tracking-[.2em] opacity-70"
          aria-live="polite"
        >
          {carousel.index + 1} / {carousel.count}
        </p>
      </div>
    </SectionShell>
  );
}
