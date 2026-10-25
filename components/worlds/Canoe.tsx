import Image from "next/image";
import { HERO_LAYERS } from "@/lib/constants";
import { layerShift } from "@/lib/parallax";

interface CanoeProps {
  readonly alt: string;
  /** Sombra, ondas y reflejo bajo la canoa (Hero principal). */
  readonly withReflection?: boolean;
}

const RIPPLE =
  "ripple absolute -left-[30%] top-[88%] h-[18%] w-[160%] rounded-full border-2 border-[rgba(214,255,159,.5)]";
const CANOE_SIZE = "clamp(190px, 16.5vw, 250px)";
const FADE = "linear-gradient(to top, #000 0, transparent 55%)";

export function Canoe({ alt, withReflection = false }: CanoeProps) {
  const { canoe } = HERO_LAYERS;
  return (
    <div
      className="px"
      style={{ width: CANOE_SIZE, transform: layerShift(canoe.x, canoe.y) }}
    >
      <div className="relative translate-x-[13%]">
        {withReflection ? (
          <div
            aria-hidden="true"
            className="absolute top-[90%] -left-[18%] h-[16%] w-[136%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,18,10,.65), rgba(0,18,10,0) 70%)",
            }}
          />
        ) : null}
        <div aria-hidden="true" className={RIPPLE} />
        {withReflection ? (
          <div
            aria-hidden="true"
            className={RIPPLE}
            style={{ animationDelay: "-2.5s" }}
          />
        ) : null}
        <div className="bob2 relative">
          {withReflection ? (
            <Image
              src="/images/canoa.webp"
              alt=""
              width={1254}
              height={1254}
              aria-hidden="true"
              className="absolute top-[99%] left-0 w-full -scale-y-100 opacity-30 blur-[1.5px]"
              style={{ maskImage: FADE, WebkitMaskImage: FADE }}
            />
          ) : null}
          <Image
            src="/images/canoa.webp"
            alt={alt}
            width={1254}
            height={1254}
            sizes="250px"
            className="relative block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
