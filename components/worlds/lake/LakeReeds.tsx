import { LAKE_ART } from "@/data/lakeAssets";
import { heightUnits, REEDS, widthUnits } from "@/lib/fishing/scene";

/** Juncos pintados en el agua junto a la punta del muelle (decorativos). */
export function LakeReeds() {
  const art = LAKE_ART.reeds;
  if (!art) return null;
  return (
    <g aria-hidden="true">
      {REEDS.map((clump) => {
        const height = heightUnits(clump.height);
        const width = (height * art.width) / art.height;
        return (
          <image
            key={clump.x}
            href={art.src}
            x={widthUnits(clump.x) - width / 2}
            y={heightUnits(clump.y) - height}
            width={width}
            height={height}
          />
        );
      })}
    </g>
  );
}
