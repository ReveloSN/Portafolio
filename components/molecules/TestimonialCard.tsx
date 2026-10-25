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
      className="absolute top-0 left-1/2 w-[min(580px,88%)] transition duration-700 ease-out"
    >
      <div className="relative rounded-[10px] bg-[#f1e8d0] p-10 pb-8 text-left text-[#1b2a1f] shadow-[0_40px_70px_-26px_rgba(0,0,0,.8)]">
        <div
          aria-hidden="true"
          className="absolute -top-3.5 left-1/2 -ml-[55px] h-[30px] w-[110px]"
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
          {Array.from({ length: rating }, (_, i) => (
            <Icon key={i} name="star" size={22} />
          ))}
        </div>
        <p className="font-display mt-4 text-[clamp(19px,2vw,24px)] leading-normal font-medium">
          {quote}
        </p>
        <div className="mt-6 flex items-center gap-3.5">
          <Avatar
            background={avatarBackground}
            figure={avatarFigure}
            className="h-[54px] w-[54px]"
            figureWidth="70%"
          />
          <div>
            <p className="text-[17px] font-bold">{author}</p>
            <p className="text-sm text-[#4d5b3f]">{relation}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
