import { useId } from "react";
import { BaitButton } from "@/components/atoms/BaitButton";
import { BaitArt } from "@/components/worlds/art/BaitArt";
import type { Bait, BaitId } from "@/types/fishing";

interface BaitPickerProps {
  readonly title: string;
  readonly baits: readonly Bait[];
  readonly selected: BaitId;
  readonly locked: boolean;
  readonly onSelect: (bait: BaitId) => void;
}

/** Selector de carnada: cada una atrae criaturas distintas. */
export function BaitPicker({
  title,
  baits,
  selected,
  locked,
  onSelect,
}: BaitPickerProps) {
  const titleId = useId();
  return (
    <div role="group" aria-labelledby={titleId} className="min-w-0">
      <p
        id={titleId}
        className="text-fluid-xs mb-2 font-mono tracking-[.22em] uppercase opacity-70"
      >
        {title}
      </p>
      <div className="flex gap-2">
        {baits.map((bait) => (
          <BaitButton
            key={bait.id}
            label={bait.label}
            hint={bait.hint}
            icon={<BaitArt bait={bait.id} />}
            selected={bait.id === selected}
            locked={locked}
            onSelect={() => onSelect(bait.id)}
          />
        ))}
      </div>
    </div>
  );
}
