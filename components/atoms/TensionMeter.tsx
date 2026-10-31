import { TENSION } from "@/lib/fishing/config";
import { cn } from "@/lib/utils";

interface TensionMeterProps {
  /** De 0 a 1. */
  readonly value: number;
  readonly label: string;
  readonly valueText: string;
}

const PERCENT = 100;
const pct = (value: number) => `${value * PERCENT}%`;

/** Barra de tensión con la zona verde y la zona de rotura marcadas. */
export function TensionMeter({ value, label, valueText }: TensionMeterProps) {
  const percent = Math.round(Math.min(1, Math.max(0, value)) * PERCENT);
  const danger = value > TENSION.breakAt;
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={PERCENT}
      aria-valuenow={percent}
      aria-valuetext={valueText}
      data-testid="tension-meter"
      className="[container-type:inline-size] relative h-4 overflow-hidden rounded-full bg-black/45 ring-1 ring-white/10"
    >
      <span
        aria-hidden="true"
        className="bg-glow/35 ring-glow/70 absolute inset-y-0 ring-1"
        style={{
          left: pct(TENSION.greenMin),
          width: pct(TENSION.greenMax - TENSION.greenMin),
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 bg-[#ff5a5a]/45"
        style={{ width: pct(1 - TENSION.breakAt) }}
      />
      <span
        aria-hidden="true"
        className={cn(
          "bg-leaf absolute inset-y-[-2px] left-0 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(255,255,255,.7)]",
          danger && "bg-[#ff5a5a]",
        )}
        style={{ transform: `translateX(calc(${percent} * 1cqw))` }}
      />
    </div>
  );
}
