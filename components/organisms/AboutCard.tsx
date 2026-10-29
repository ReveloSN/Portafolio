import { FlipCard } from "@/components/atoms/FlipCard";
import { ExplorerCardBack } from "@/components/molecules/ExplorerCardBack";
import { ExplorerCardFront } from "@/components/molecules/ExplorerCardFront";
import { COPY } from "@/data/copy";
import type { Profile } from "@/types/profile";

interface AboutCardProps {
  readonly profile: Profile;
}

/**
 * Credencial de explorador que gira para mostrar un dato curioso. El contenedor fija
 * el ancho (--card-w) y es la referencia de las medidas cqw de ambas caras.
 */
export function AboutCard({ profile }: AboutCardProps) {
  return (
    <div className="@container mx-auto w-[var(--card-w,min(22rem,78vw))] shrink-0">
      <FlipCard
        testId="flip-card"
        label={COPY.about.flipLabel}
        className="rounded-[6cqw] [--flip-rest:-3deg]"
        front={<ExplorerCardFront profile={profile} />}
        back={<ExplorerCardBack profile={profile} />}
      />
    </div>
  );
}
