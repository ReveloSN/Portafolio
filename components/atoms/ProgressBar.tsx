interface ProgressBarProps {
  readonly percent: number;
  readonly label: string;
}

export function ProgressBar({ percent, label }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-2.5 overflow-hidden rounded-full bg-black/35"
    >
      <i
        className="bar-fill block h-full rounded-full bg-[linear-gradient(90deg,#ffc46e,#ff8a4c)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
