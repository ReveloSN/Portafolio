import { FoliageAccent } from "@/components/molecules/FoliageAccent";
import { MistBand } from "@/components/molecules/MistBand";
import { SectionDivider } from "@/components/molecules/SectionDivider";
import { SEAMS } from "@/data/dividers";
import type { SeamHost, SeamId } from "@/types/seam";

interface SeamLayerProps {
  readonly seam: SeamId;
  readonly host: SeamHost;
}

/**
 * Pinta lo que le toca a una sección en una costura. La sección de abajo lleva el
 * divisor, la niebla y lo que cruza hacia arriba; la de arriba, lo que queda recortado.
 */
export function SeamLayer({ seam, host }: SeamLayerProps) {
  const config = SEAMS[seam];
  const accents = config.accents.filter((accent) => accent.host === host);
  const isLower = host === "lower";
  return (
    <>
      {isLower && config.divider ? <SectionDivider id={seam} /> : null}
      {isLower && config.mist ? <MistBand /> : null}
      {accents.map((accent) => (
        <FoliageAccent key={accent.id} accent={accent} />
      ))}
    </>
  );
}
