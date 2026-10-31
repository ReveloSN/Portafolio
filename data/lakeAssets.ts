import type { LakeAssets } from "@/types/lake";

/**
 * Arte de la escena del lago. Para pasar al arte pintado basta con cambiar una entrada
 * por `{ kind: "image", src: "/images/lago/….webp", width, height }`.
 */
export const LAKE_ASSETS: LakeAssets = {
  backdrop: { kind: "svg", art: "backdrop" },
  foreground: { kind: "svg", art: "reeds" },
  canoe: { kind: "image", src: "/images/canoa.webp?v=2", width: 1254, height: 1254 },
  creatures: {
    lepidotes: { kind: "svg", art: "fish", tint: "#9fe6d0" },
    ammonite: { kind: "svg", art: "fish", tint: "#ffc46e" },
    coelacanth: { kind: "svg", art: "fish", tint: "#7fb6ff" },
    ichthyosaur: { kind: "svg", art: "fish", tint: "#d6ff9f" },
    mosasaur: { kind: "svg", art: "mosasaur" },
    megalodon: { kind: "svg", art: "megalodon" },
  },
  buckets: {
    worm: { kind: "svg", art: "bucket-worm" },
    minnow: { kind: "svg", art: "bucket-minnow" },
    firefly: { kind: "svg", art: "bucket-firefly" },
  },
};
