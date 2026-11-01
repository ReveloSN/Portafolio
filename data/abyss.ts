import type {
  AbyssZone,
  DiveLayout,
  DriftingCreatureSpec,
  ParticleLayerSpec,
} from "@/types/abyss";

/**
 * Configuración de la inmersión de la sección Experiencia. --depth va de 0 (superficie) a
 * 1 (final de la sección) con el scroll; las zonas, las criaturas y la oscuridad se leen
 * en ese mismo eje. Las entradas salen de data/experience.ts: aquí solo su profundidad.
 */

/** Alto (svh) de la pantalla inicial, del tramo de cada tarjeta y del final. */
export const DIVE_LAYOUT: DiveLayout = { surface: 100, slot: 85, end: 70 };

/** Metros de cada tarjeta según su posición (la más reciente arriba). */
export const CARD_DEPTHS_M = [60, 140, 230, 340, 460, 600] as const;
/** Si hubiera más entradas que metros, cada una baja esto más que la anterior. */
export const EXTRA_DEPTH_STEP_M = 150;

/** Fundido (en --depth) entre una zona y la siguiente. */
export const ZONE_FADE = 0.08;

export const ABYSS_ZONES: readonly AbyssZone[] = [
  {
    id: "surface",
    from: 0,
    to: 0.3,
    water: ["#0e4d55", "#08303b"],
    fog: "#1f6d72",
    darkness: 0.25,
  },
  {
    id: "middle",
    from: 0.3,
    to: 0.65,
    water: ["#0a2c3d", "#06192a"],
    fog: "#123a52",
    darkness: 0.5,
  },
  {
    id: "deep",
    from: 0.65,
    to: 1,
    water: ["#050f1b", "#08171e"],
    fog: "#0b1f33",
    darkness: 0.8,
  },
];

const creature = (spec: DriftingCreatureSpec) => spec;

/** Quién ronda cada zona. Como mucho 4 animadas a la vez (la zona actual); 3 en móvil. */
export const ABYSS_CREATURES: readonly DriftingCreatureSpec[] = [
  creature({
    id: "surface-1",
    art: "fish-1",
    zone: "surface",
    seconds: 38,
    delay: -6,
    top: 62,
    size: 7,
    z: 0.3,
    direction: "ltr",
    path: "glide",
    mobile: true,
  }),
  creature({
    id: "surface-2",
    art: "fish-2",
    zone: "surface",
    seconds: 46,
    delay: -20,
    top: 76,
    size: 8,
    z: 0.5,
    direction: "rtl",
    path: "glide",
    mobile: true,
  }),
  creature({
    id: "surface-3",
    art: "fish-1",
    zone: "surface",
    seconds: 56,
    delay: -33,
    top: 69,
    size: 5,
    z: 0.75,
    direction: "ltr",
    path: "glide",
    mobile: true,
  }),
  creature({
    id: "middle-1",
    art: "mosasaur",
    zone: "middle",
    seconds: 62,
    delay: -14,
    top: 40,
    size: 26,
    z: 0.5,
    direction: "ltr",
    path: "glide",
    mobile: true,
  }),
  creature({
    id: "middle-2",
    art: "fish-3",
    zone: "middle",
    seconds: 40,
    delay: -8,
    top: 66,
    size: 10,
    z: 0.25,
    direction: "rtl",
    path: "glide",
    mobile: true,
  }),
  creature({
    id: "middle-3",
    art: "fish-4",
    zone: "middle",
    seconds: 54,
    delay: -30,
    top: 22,
    size: 12,
    z: 0.65,
    direction: "ltr",
    path: "glide",
    mobile: true,
  }),
  creature({
    id: "deep-megalodon",
    art: "megalodon",
    zone: "deep",
    seconds: 45,
    delay: -6,
    top: 30,
    size: 62,
    z: 0.75,
    direction: "ltr",
    path: "pass",
    mobile: true,
  }),
  creature({
    id: "deep-1",
    art: "abyssal-fish",
    zone: "deep",
    seconds: 48,
    delay: -12,
    top: 62,
    size: 9,
    z: 0.3,
    direction: "rtl",
    path: "glide",
    mobile: true,
  }),
  creature({
    id: "deep-2",
    art: "jelly-1",
    zone: "deep",
    seconds: 70,
    delay: -25,
    top: 20,
    size: 6,
    z: 0.45,
    direction: "ltr",
    path: "pulse",
    mobile: true,
  }),
  creature({
    id: "deep-3",
    art: "jelly-2",
    zone: "deep",
    seconds: 64,
    delay: -40,
    top: 74,
    size: 5,
    z: 0.6,
    direction: "rtl",
    path: "pulse",
    mobile: false,
  }),
];

/** Nieve marina en dos capas: la lejana más fina y lenta, la cercana más grande. */
export const PARTICLE_LAYERS: readonly ParticleLayerSpec[] = [
  { id: "far", count: 18, size: [0.25, 0.6], rise: 48, parallax: 30, opacity: 0.35 },
  { id: "near", count: 10, size: [0.7, 1.5], rise: 30, parallax: 70, opacity: 0.55 },
];

/** Linterna de buceo: radio del haz, inercia y oscuridad (0.12 + depth × 0.78). */
export const LANTERN = {
  radiusU: 16,
  lerp: 0.18,
  baseDark: 0.12,
  depthDark: 0.78,
} as const;

/**
 * El niño y la caña sobre el arte del lago (2400 × 1116), en % de la escena. Medidas
 * tomadas del juego archivado (etiqueta archive/lake-game).
 */
export const LAKE_RIG = {
  aspect: 2400 / 1116,
  /** Lienzo común de las poses del niño: esquina y escala sobre el arte. */
  kidCanvas: { left: 28.9, top: 27.8, scale: 0.352 },
  /** Manos del niño: de aquí sale la caña. */
  grip: { x: 41.6, y: 45.6 },
  /** Largo de la caña en % del ancho y ángulo en reposo (negativo = hacia arriba). */
  rodLength: 23,
  rodAngle: -35,
  /** Empuñadura y punta medidas en px de rod.webp (900 × 263). */
  rodArt: { width: 900, height: 263, grip: { x: 2, y: 241.5 }, tip: { x: 897, y: 9.5 } },
} as const;
