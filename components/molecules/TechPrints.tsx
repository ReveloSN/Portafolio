import { TrackPrint } from "@/components/atoms/TrackPrint";
import { cn } from "@/lib/utils";

export type TechPrintsTone = "surface" | "night";

interface TechPrintsProps {
  readonly technologies: readonly string[];
  /** Nombre accesible de la lista ("Tecnologías"). */
  readonly label: string;
  /** Cuántas mostrar; el resto se resume en "+N" (con su lista para lectores de pantalla). */
  readonly limit?: number;
  /** `surface` sobre los tokens del tema; `night` sobre las escenas oscuras de cada mundo. */
  readonly tone?: TechPrintsTone;
  readonly className?: string;
}

const CHIP =
  "text-fluid-xs inline-flex items-center gap-1.5 rounded-full border py-[5px] pr-3 pl-2 font-mono";
const TONES: Readonly<Record<TechPrintsTone, string>> = {
  surface: "border-line-strong bg-surface",
  night: "border-white/35 bg-white/8",
};

/**
 * Tecnologías de un proyecto como un rastro: cada etiqueta lleva una huellita y las
 * huellas alternan pie izquierdo y derecho a lo largo de la fila (estilos en projects.css).
 */
export function TechPrints({
  technologies,
  label,
  limit,
  tone = "surface",
  className,
}: TechPrintsProps) {
  const shown = limit === undefined ? technologies : technologies.slice(0, limit);
  const rest = technologies.slice(shown.length);
  const chip = cn(CHIP, TONES[tone]);
  return (
    <ul className={cn("stack-prints flex flex-wrap gap-2", className)} aria-label={label}>
      {shown.map((tech) => (
        <li key={tech}>
          <span className={chip}>
            <TrackPrint className="stack-print" />
            {tech}
          </span>
        </li>
      ))}
      {rest.length > 0 && (
        <li aria-label={rest.join(", ")}>
          <span className={cn(chip, "pl-3")}>+{rest.length}</span>
        </li>
      )}
    </ul>
  );
}
