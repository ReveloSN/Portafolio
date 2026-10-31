import Image from "next/image";
import { SHADOW_WIDTH, type QuantumMode } from "@/lib/fishing/quantum";
import type { CreatureSize } from "@/types/fishing";
import type { LakeAsset } from "@/types/lake";

interface QuantumShadowProps {
  readonly art: LakeAsset;
  readonly size: CreatureSize;
  /** Centro de la sombra y línea de agua, en % de la escena. */
  readonly x: number;
  readonly waterline: number;
  readonly mode: QuantumMode;
}

/** Tres copias: cada una con su trayectoria y su parpadeo (los define el CSS). */
const COPIES = [0, 1, 2] as const;

/**
 * La criatura bajo el agua en superposición: tres copias desplazadas, desenfocadas y
 * teñidas de turquesa, recortadas en la línea de agua. Su tamaño anticipa la criatura.
 */
export function QuantumShadow({ art, size, x, waterline, mode }: QuantumShadowProps) {
  return (
    <div
      className="q-shadow"
      data-mode={mode}
      data-testid="quantum-shadow"
      style={{ top: `${waterline}%` }}
    >
      {COPIES.map((copy) => (
        <Image
          key={copy}
          src={art.src}
          width={art.width}
          height={art.height}
          alt=""
          sizes="20vw"
          className="q-copy"
          data-copy={copy}
          style={{ left: `${x}%`, width: `${SHADOW_WIDTH[size]}%` }}
        />
      ))}
    </div>
  );
}
