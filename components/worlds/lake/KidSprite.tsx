import { LAKE_ART } from "@/data/lakeAssets";
import { KID_POSES, type KidPose } from "@/lib/fishing/pose";
import { heightUnits, kidPoseBox, widthUnits } from "@/lib/fishing/scene";
import { cn } from "@/lib/utils";

interface KidSpriteProps {
  readonly pose: KidPose;
}

/**
 * El niño sentado en el muelle. Las tres poses se pintan siempre (quedan precargadas) y
 * solo se ve la activa; cada una va en su sitio del lienzo común, así no salta.
 */
export function KidSprite({ pose }: KidSpriteProps) {
  return (
    <g data-testid="lake-kid" data-pose={pose}>
      {KID_POSES.map((id) => {
        const art = LAKE_ART[id];
        if (!art?.crop) return null;
        const box = kidPoseBox(art.crop);
        return (
          <image
            key={id}
            href={art.src}
            x={widthUnits(box.left)}
            y={heightUnits(box.top)}
            width={widthUnits(box.width)}
            height={heightUnits(box.height)}
            className={cn("lake-kid-pose", id === pose && "is-active")}
          />
        );
      })}
    </g>
  );
}
