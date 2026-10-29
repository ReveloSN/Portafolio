export const PARALLAX_MAX_FPS = 60;
export const PARALLAX_FRAME_MS = 1000 / PARALLAX_MAX_FPS;

/** Multiplicadores (px) de cada capa del paralaje del Hero. */
export const HERO_LAYERS = {
  background: { x: 6, y: 4 },
  dino: { x: 4, y: 2 },
  trunks: { x: 8, y: 4 },
  canoe: { x: 6, y: 3 },
} as const;

/** Recorrido del iris (porcentaje de su propio tamaño): no sale de la cuenca. */
export const EYE_TRAVEL = { x: 45, y: 55 } as const;

/** Luciérnagas ilustradas por sección (en móvil el CSS deja 4). */
export const FIREFLY_COUNT = { hero: 10, about: 8, contact: 8 } as const;
export const WORLD_PARTICLE_COUNT = 16;

export const BITE_DELAY_MIN_MS = 1800;
export const BITE_DELAY_SPREAD_MS = 1800;
export const BITE_WINDOW_MS = 3800;
export const REEL_DURATION_MS = 900;
export const CAUGHT_DISPLAY_MS = 3600;

export const DIG_LAYERS_PER_CELL = 3;

export const MIN_MESSAGE_LENGTH = 10;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const CAROUSEL_OFFSET_PERCENT = 64;
export const CAROUSEL_DEPTH_PX = 170;
export const CAROUSEL_ROTATION_DEG = 24;
export const CAROUSEL_SIDE_SCALE = 0.84;
export const CAROUSEL_SIDE_OPACITY = 0.5;
export const CAROUSEL_AUTOPLAY_MS = 7000;

/** Tarjeta que gira: demora del hover (evita parpadeo al cruzar el borde) y duración del giro. */
export const FLIP_HOVER_DELAY_MS = 80;
export const FLIP_DURATION_MS = 800;
/** Desplazamiento máximo (px) para que un toque cuente como clic y no como arrastre o scroll. */
export const FLIP_DRAG_TOLERANCE_PX = 10;
