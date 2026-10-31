import type { CSSProperties } from "react";
import { DOCK_POSTS, DOCK_SHADOW, MOON_REFLECTION } from "@/lib/fishing/scene";

/** Desfase entre las ondas de cada pata del muelle (s). */
const RIPPLE_STAGGER_S = 0.8;
/** La onda es más ancha que la pata. */
const RIPPLE_SPREAD = 2.4;

const box = (
  left: number,
  top: number,
  width: number,
  height: number,
): CSSProperties => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
});

/** Ambiente sobre el agua: reflejo de la luna, sombra del muelle y ondas en sus patas. */
export function LakeAmbience() {
  const moon = MOON_REFLECTION;
  const shadow = DOCK_SHADOW;
  return (
    <div className="lake-ambience" aria-hidden="true">
      <span
        className="lake-moonglow"
        style={box(moon.x - moon.width / 2, moon.top, moon.width, moon.bottom - moon.top)}
      />
      <span
        className="lake-dockshadow"
        style={box(
          shadow.left,
          shadow.top,
          shadow.right - shadow.left,
          shadow.bottom - shadow.top,
        )}
      />
      {DOCK_POSTS.map((post, index) => (
        <span
          key={post.x}
          className="lake-post-ripple"
          style={{
            left: `${post.x}%`,
            top: `${post.y}%`,
            width: `${post.width * RIPPLE_SPREAD}%`,
            animationDelay: `${index * RIPPLE_STAGGER_S}s`,
          }}
        />
      ))}
    </div>
  );
}
