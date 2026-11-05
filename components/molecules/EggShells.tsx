import type { CSSProperties } from "react";
import type { ShellFlight } from "@/lib/contact/shells";
import type { ShellSprite } from "@/types/contact";

interface EggShellsProps {
  readonly sprite: ShellSprite;
  readonly flights: readonly ShellFlight[];
}

const pct = (value: number) => `${value * 100}%`;

/** Los seis trozos de cáscara que salen al eclosionar (cada uno, un recorte del sprite). */
export function EggShells({ sprite, flights }: EggShellsProps) {
  return (
    <>
      {flights.map((flight) => {
        const piece = sprite.pieces[flight.piece];
        if (!piece) return null;
        const free = sprite.width - piece.w;
        const style = {
          "--size": flight.size,
          "--sx": flight.startX,
          "--sy": flight.startY,
          "--dx": flight.dx,
          "--rise": flight.rise,
          "--fall": flight.fall,
          "--spin": flight.spin,
          "--delay": `${flight.delay}ms`,
        } as CSSProperties;
        const pieceStyle = {
          "--ar": `${piece.w} / ${piece.h}`,
          "--sprite": `url(${sprite.src})`,
          "--bg-size": `${pct(sprite.width / piece.w)} ${pct(sprite.height / piece.h)}`,
          "--bg-pos": `${free > 0 ? pct(piece.x / free) : "0%"} 0%`,
        } as CSSProperties;
        return (
          <span
            key={flight.piece}
            className="nest-shell"
            style={style}
            aria-hidden="true"
          >
            <span className="nest-shell-piece" style={pieceStyle} />
          </span>
        );
      })}
    </>
  );
}
