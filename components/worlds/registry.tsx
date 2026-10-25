import type { ComponentType, SVGProps } from "react";
import type { FossilKind } from "@/types/skill";
import type { WorldSlug } from "@/types/world";
import { AmmoniteFossil } from "./art/AmmoniteFossil";
import { BoneFossil } from "./art/BoneFossil";
import { CuevaThumbnail } from "./art/CuevaThumbnail";
import { FernFossil } from "./art/FernFossil";
import { NautilusFossil } from "./art/NautilusFossil";
import { OceanoThumbnail } from "./art/OceanoThumbnail";
import { SelvaThumbnail } from "./art/SelvaThumbnail";
import { ShellFossil } from "./art/ShellFossil";
import { CuevaScene } from "./scenes/CuevaScene";
import { OceanoScene } from "./scenes/OceanoScene";
import { SelvaScene } from "./scenes/SelvaScene";
import { TrilobiteFossil } from "./art/TrilobiteFossil";

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Registro: miniatura de cada proyecto según el slug de su mundo. */
export const THUMBNAILS: Readonly<Record<WorldSlug, SvgComponent>> = {
  selva: SelvaThumbnail,
  oceano: OceanoThumbnail,
  cueva: CuevaThumbnail,
};

/** Registro: ilustración de cada tipo de fósil. */
export const FOSSILS: Readonly<Record<FossilKind, SvgComponent>> = {
  ammonite: AmmoniteFossil,
  bone: BoneFossil,
  fern: FernFossil,
  trilobite: TrilobiteFossil,
  shell: ShellFossil,
  nautilus: NautilusFossil,
};

/** Strategy: la escena de cada mundo se elige por su slug. */
export const SCENES: Readonly<Record<WorldSlug, ComponentType>> = {
  selva: SelvaScene,
  oceano: OceanoScene,
  cueva: CuevaScene,
};
