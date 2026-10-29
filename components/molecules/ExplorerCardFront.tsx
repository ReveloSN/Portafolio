import { Barcode } from "@/components/atoms/Barcode";
import { CardPaper } from "@/components/atoms/CardPaper";
import { CardHeader } from "@/components/molecules/CardHeader";
import { COPY } from "@/data/copy";
import type { Profile } from "@/types/profile";

interface ExplorerCardFrontProps {
  readonly profile: Profile;
}

/** Frente de la credencial de explorador: foto (provisional), nombre y rol. */
export function ExplorerCardFront({ profile }: ExplorerCardFrontProps) {
  const { about } = COPY;
  return (
    <CardPaper className="aspect-[2/3]">
      <CardHeader left={about.idLeft} right={`${about.idRight} ${profile.year}`} />
      <div className="min-h-0 flex-1">
        <div className="relative mx-auto flex aspect-[4/5] h-full max-w-full flex-col items-center justify-end overflow-hidden rounded-[4cqw] border-[.6cqw] border-dashed border-[#7d8a62] bg-[linear-gradient(160deg,#cfe3b2,#8fb77a)]">
          <svg viewBox="0 0 46 52" aria-hidden="true" className="block w-[62%]">
            <circle cx="23" cy="19" r="10" fill="#4f7a5a" />
            <path d="M3 52c0-13 8-21 20-21s20 8 20 21z" fill="#4f7a5a" />
          </svg>
          <p className="absolute inset-x-0 top-[4cqw] text-center text-[clamp(.5rem,3.6cqw,.95rem)] font-semibold tracking-[.14em] text-[#2c4a30]">
            {about.photoPlaceholder}
          </p>
        </div>
      </div>
      <div className="mt-[4cqw] flex items-end justify-between gap-[3cqw]">
        <div className="min-w-0">
          <p className="font-display text-[clamp(.95rem,7cqw,2.25rem)] leading-[1.05] font-extrabold">
            {profile.firstName}
          </p>
          <p className="mt-[.5cqw] text-[clamp(.65rem,4.4cqw,1.2rem)] text-[#41523a]">
            {profile.role}
          </p>
        </div>
        <Barcode className="w-[21cqw] shrink-0" />
      </div>
    </CardPaper>
  );
}
