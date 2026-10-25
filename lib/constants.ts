export const PARALLAX_MAX_FPS = 60;
export const PARALLAX_FRAME_MS = 1000 / PARALLAX_MAX_FPS;

/** Multiplicadores (px) de cada capa del paralaje del Hero. */
export const HERO_LAYERS = {
  background: { x: 6, y: 4 },
  dino: { x: 12, y: 7 },
  trunks: { x: 24, y: 12 },
  canoe: { x: 6, y: 3 },
  foliage: { x: 40, y: 18 },
} as const;

export const EYE_TRAVEL = { x: 13, y: 18 } as const;
export const DINO_TILT = { x: 3, y: 4 } as const;

export const FIREFLY_COUNT = 14;
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
