import { Barcode } from "@/components/atoms/Barcode";
import { CardPaper } from "@/components/atoms/CardPaper";
import { Illustration } from "@/components/atoms/Illustration";
import { CardHeader } from "@/components/molecules/CardHeader";
import { ART } from "@/data/art";
import { COPY } from "@/data/copy";
import type { Profile } from "@/types/profile";

interface ExplorerCardBackProps {
  readonly profile: Profile;
}

/** Reverso de la credencial: el dato curioso sobre una huella de dinosaurio. */
export function ExplorerCardBack({ profile }: ExplorerCardBackProps) {
  const { about } = COPY;
  const { funFact, backMeta } = profile;
  const footprint = ART.footprint1;
  return (
    <CardPaper>
      <CardHeader
        left={about.idLeft}
        right={`${about.idRight} ${backMeta?.year ?? profile.year}`}
      />
      <div className="relative flex min-h-0 flex-1 flex-col justify-center rounded-[4cqw] border-[.6cqw] border-dashed border-[#7d8a62] bg-[#e7dcbf] p-[7cqw]">
        <Illustration
          decorative
          src={footprint.src}
          width={footprint.width}
          height={footprint.height}
          sizes="320px"
          className="absolute top-1/2 left-1/2 w-[78cqw] -translate-1/2 -rotate-12 opacity-[.13]"
        />
        <p className="font-display relative text-[clamp(1.1rem,9cqw,2.75rem)] leading-none font-extrabold">
          {funFact.title}
        </p>
        <p className="relative mt-[4cqw] min-h-0 [scrollbar-width:none] overflow-y-auto text-[clamp(.85rem,5.4cqw,1.4rem)] leading-[1.45] text-[#2c3b27] [&::-webkit-scrollbar]:hidden">
          {funFact.text}
        </p>
        {backMeta?.motto ? (
          <p className="relative mt-[4cqw] text-[clamp(.65rem,4.2cqw,1.1rem)] text-[#4d5b3f] italic">
            {backMeta.motto}
          </p>
        ) : null}
      </div>
      <div className="mt-[4cqw] flex items-end justify-between gap-[3cqw]">
        <div className="min-w-0">
          <p className="text-[clamp(.65rem,4.4cqw,1.2rem)] font-semibold text-[#41523a]">
            {backMeta?.role ?? profile.role}
          </p>
          <p className="mt-[1cqw] font-mono text-[clamp(.45rem,3.4cqw,.9rem)] tracking-[.12em] text-[#4d5b3f] uppercase">
            {about.flipHint}
          </p>
        </div>
        <Barcode className="w-[21cqw] shrink-0" />
      </div>
    </CardPaper>
  );
}
