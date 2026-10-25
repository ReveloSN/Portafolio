import { COPY } from "@/data/copy";
import type { Profile } from "@/types/profile";

interface ExplorerCardProps {
  readonly profile: Profile;
}

const BARCODE_BARS = [
  [0, 3],
  [6, 1.5],
  [11, 4],
  [19, 2],
  [25, 1.5],
  [30, 4],
  [38, 2],
  [44, 3],
  [51, 1.5],
  [56, 4],
  [64, 2],
  [70, 3],
] as const;

/** Credencial de explorador con la foto (provisional) y los datos básicos. */
export function ExplorerCard({ profile }: ExplorerCardProps) {
  const { about } = COPY;
  return (
    <div className="min-w-[260px] flex-[0_1_360px]">
      <div className="-rotate-3 rounded-[22px] bg-[#efe6cf] p-[18px] pb-[22px] text-[#17281d] shadow-[0_30px_60px_-24px_rgba(0,0,0,.7)] transition duration-500 ease-out hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_40px_80px_-30px_rgba(166,255,92,.5)]">
        <div className="mb-3 flex justify-between font-mono text-[11px] tracking-[.12em] text-[#4d5b3f]">
          <span>{about.idLeft}</span>
          <span>
            {about.idRight} {profile.year}
          </span>
        </div>
        <div className="relative flex aspect-[4/5] flex-col items-center justify-end overflow-hidden rounded-[14px] border-2 border-dashed border-[#7d8a62] bg-[linear-gradient(160deg,#cfe3b2,#8fb77a)]">
          <svg width="62%" viewBox="0 0 46 52" aria-hidden="true" className="block">
            <circle cx="23" cy="19" r="10" fill="#4f7a5a" />
            <path d="M3 52c0-13 8-21 20-21s20 8 20 21z" fill="#4f7a5a" />
          </svg>
          <p className="absolute inset-x-0 top-3.5 text-center text-[13px] font-semibold tracking-[.14em] text-[#2c4a30]">
            {about.photoPlaceholder}
          </p>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-2xl leading-[1.05] font-extrabold">
              {profile.firstName}
            </p>
            <p className="mt-0.5 text-sm text-[#41523a]">{profile.role}</p>
          </div>
          <svg width="76" height="34" viewBox="0 0 76 34" aria-hidden="true">
            <g fill="#17281d">
              {BARCODE_BARS.map(([x, w]) => (
                <rect key={x} x={x} width={w} height="34" />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
