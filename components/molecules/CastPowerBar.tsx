import { ProgressBar } from "@/components/atoms/ProgressBar";
import { DEPTH_THRESHOLDS } from "@/lib/fishing/config";
import { depthFromPower } from "@/lib/fishing/creatures";
import { cn } from "@/lib/utils";
import type { Depth } from "@/types/fishing";

interface CastPowerBarProps {
  readonly power: number;
  readonly label: string;
  readonly depthLabels: Readonly<Record<Depth, string>>;
}

const DEPTHS: readonly Depth[] = ["shore", "mid", "deep"];
const PERCENT = 100;
const MARKS = [DEPTH_THRESHOLDS.mid, DEPTH_THRESHOLDS.deep];

/** Fuerza del lanzamiento y la zona del lago a la que llega. */
export function CastPowerBar({ power, label, depthLabels }: CastPowerBarProps) {
  const depth = depthFromPower(power);
  return (
    <div data-testid="cast-power">
      <ProgressBar value={power} label={label} valueText={depthLabels[depth]}>
        {MARKS.map((mark) => (
          <span
            key={mark}
            aria-hidden="true"
            className="bg-leaf/60 absolute inset-y-0 w-0.5"
            style={{ left: `${mark * PERCENT}%` }}
          />
        ))}
      </ProgressBar>
      <ul aria-hidden="true" className="text-fluid-xs mt-1.5 grid grid-cols-3 font-mono">
        {DEPTHS.map((zone, index) => (
          <li
            key={zone}
            className={cn(
              "transition-opacity",
              index === 1 && "text-center",
              index === 2 && "text-right",
              zone === depth ? "text-glow opacity-100" : "opacity-55",
            )}
          >
            {depthLabels[zone]}
          </li>
        ))}
      </ul>
    </div>
  );
}
