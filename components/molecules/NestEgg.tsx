import type { CSSProperties, PointerEvent, Ref } from "react";
import { EggCracks } from "@/components/atoms/EggCracks";
import { Illustration } from "@/components/atoms/Illustration";
import { EggShells } from "@/components/molecules/EggShells";
import { isOpen, type HatchPhase } from "@/lib/contact/hatch";
import {
  NEST_STAGE,
  hatchlingHeightCqw,
  hatchlingLiftCqw,
  hatchlingWidth,
  slotBottom,
  type EggSlot,
} from "@/lib/contact/nestLayout";
import type { ShellFlight } from "@/lib/contact/shells";
import type { ContactChannel } from "@/types/contact";

interface NestEggProps {
  readonly channel: ContactChannel;
  readonly slot: EggSlot;
  readonly phase: HatchPhase;
  readonly hint: boolean;
  /** Última cría que salió: solo ella muestra su globito, así no se cruzan. */
  readonly current: boolean;
  readonly flights: readonly ShellFlight[];
  /** Nombre accesible: el del huevo cerrado o el de la cría ya fuera. */
  readonly label: string;
  readonly buttonRef?: Ref<HTMLButtonElement>;
  readonly onActivate: () => void;
  readonly onEnter: () => void;
  readonly onLeave: () => void;
}

/** Huevo y cría salen a ~2x de su tamaño en pantalla. */
const EGG_SIZES = "(min-width: 1024px) 90px, 18vw";
const HATCHLING_SIZES = "(min-width: 1024px) 160px, 32vw";

const isMouse = (event: PointerEvent) => event.pointerType === "mouse";

/** Un huevo del nido: botón que tiembla, se agrieta y deja salir la cría del canal. */
export function NestEgg(props: NestEggProps) {
  const { channel, slot, phase, hint, current, flights, label, buttonRef } = props;
  const style = {
    "--x": `${slot.x}%`,
    "--nest-base": `${slotBottom(slot)}%`,
    "--egg-w": `${NEST_STAGE.eggWidth}%`,
    "--sway": `${slot.sway}s`,
    "--sway-delay": `${slot.swayDelay}s`,
    "--hatch-lift": hatchlingLiftCqw,
    "--c": channel.color,
    "--glow-c": channel.glow,
    "--flash-c": channel.color,
    "--hatch-w": `${hatchlingWidth(channel.hatchling)}%`,
    "--hatch-h": hatchlingHeightCqw,
  } as CSSProperties;
  return (
    <li
      className="nest-slot"
      style={style}
      data-phase={phase}
      data-hint={hint || undefined}
      data-current={current || undefined}
    >
      <button
        ref={buttonRef}
        type="button"
        className="nest-egg"
        aria-label={label}
        aria-pressed={isOpen(phase)}
        data-testid={`egg-${channel.id}`}
        onClick={props.onActivate}
        onPointerEnter={(event) => isMouse(event) && props.onEnter()}
        onPointerLeave={(event) => isMouse(event) && props.onLeave()}
      >
        <span className="nest-glow" aria-hidden="true" />
        <span className="nest-sway" aria-hidden="true">
          <span className="nest-lift">
            <Illustration decorative {...channel.egg} sizes={EGG_SIZES} />
            <EggCracks />
          </span>
          <span className="nest-flash" />
        </span>
        <span className="nest-hatchling" aria-hidden="true">
          <span className="nest-tilt">
            <span className="nest-breath">
              <Illustration decorative {...channel.hatchling} sizes={HATCHLING_SIZES} />
            </span>
          </span>
        </span>
        {/* Después de la cría: las cáscaras vuelan por delante mientras sube */}
        <EggShells sprite={channel.shells} flights={flights} />
        <span className="nest-bubble" aria-hidden="true">
          {channel.handle}
        </span>
      </button>
    </li>
  );
}
