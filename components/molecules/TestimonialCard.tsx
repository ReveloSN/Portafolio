import type { CSSProperties } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Avatar } from "@/components/molecules/Avatar";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  readonly testimonial: Testimonial;
  readonly ratingLabel: string;
  readonly tapeTilt: number;
  readonly style?: CSSProperties;
  readonly hidden?: boolean;
}

/** Nota del cuaderno de campo. Posición y profundidad llegan por `style`. */
export function TestimonialCard({
  testimonial,
  ratingLabel,
  tapeTilt,
  style,
  hidden,
}: TestimonialCardProps) {
  const { quote, author, relation, rating, tapeColor, avatarBackground, avatarFigure } =
    testimonial;
  return (
    <article
      aria-hidden={hidden}
      style={style}
      className="relative mx-auto w-[min(580px,88%)] transition duration-700 ease-out [grid-area:1/1]"
    >
      <div className="relative rounded-[10px] bg-[#f1e8d0] p-5 pb-8 text-left text-[#1b2a1f] shadow-[0_40px_70px_-26px_var(--card-shadow)] sm:p-10 sm:pb-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3.5 mx-auto h-[30px] w-[110px]"
          style={{ background: tapeColor, transform: `rotate(${tapeTilt}deg)` }}
        />
        <Icon
          name="quote"
          size={64}
          className="absolute top-[26px] right-[30px] h-[52px] w-16 opacity-15"
        />
        <div
          className="flex gap-1 text-[#f2a900]"
          role="img"
          aria-label={`${rating} ${ratingLabel}`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              name="star"
              size={22}
              className={i >= rating ? "opacity-20" : undefined}
            />
          ))}
          <span aria-hidden="true" className="ml-2 text-sm font-bold text-[#4d5b3f]">
            {rating}/5
          </span>
        </div>
        <p className="font-display text-fluid-lg mt-4 leading-normal font-medium">
          {quote}
        </p>
        <div className="mt-6 flex items-center gap-3.5">
          <Avatar
            background={avatarBackground}
            figure={avatarFigure}
            className={`h-[54px] w-[54px] shrink-0 ${testimonial.photo ? "[&_img]:origin-[35%_25%] [&_img]:scale-[1.8]" : ""}`}
            figureWidth="70%"
            photo={testimonial.photo}
            photoSizes="108px"
          />
          <div>
            <p className="text-fluid-base font-bold">{author}</p>
            <p className="text-fluid-sm text-[#4d5b3f]">{relation}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
