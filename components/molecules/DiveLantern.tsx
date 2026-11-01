import { AbyssArt } from "@/components/atoms/AbyssArt";

/**
 * Linterna de buceo: una capa de oscuridad (0.12 + depth × 0.78) con un hueco radial en
 * --lx / --ly, un tinte cálido lima y ámbar en el mismo radio (mezcla aditiva) y el dibujo
 * de la linterna en el puntero. La posición la escribe usePointerLight; el radio y la
 * oscuridad salen de data/abyss.ts (variables de la sección).
 */
export function DiveLantern() {
  return (
    <div className="dive-lantern">
      <div className="dive-dark" data-testid="dive-dark" />
      <div className="dive-glow" />
      <div className="dive-lantern-sprite">
        <AbyssArt id="lantern" sizes="64px" className="dive-lantern-art" />
      </div>
    </div>
  );
}
