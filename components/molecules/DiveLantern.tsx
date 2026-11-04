import { AbyssArt } from "@/components/atoms/AbyssArt";

/**
 * Linterna de buceo: una capa de oscuridad (0.12 + depth × 0.78) con un hueco radial en
 * --lx / --ly, un tinte cálido lima y ámbar en el mismo radio (mezcla aditiva) y el dibujo
 * de la linterna en el puntero. La posición la escribe usePointerLight; el radio y la
 * oscuridad salen de data/abyss.ts (variables de la sección). "Encender luces" apaga el
 * haz completo, así la oscuridad puede seguir el scroll por su cuenta.
 */
export function DiveLantern() {
  return (
    <div className="dive-lantern">
      <div className="dive-beam" data-testid="dive-beam">
        <div className="dive-dark" data-testid="dive-dark" />
        <div className="dive-glow" />
      </div>
      <div className="dive-lantern-sprite">
        <AbyssArt id="lantern" sizes="64px" className="dive-lantern-art" />
      </div>
    </div>
  );
}
