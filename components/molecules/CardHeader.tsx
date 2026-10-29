interface CardHeaderProps {
  readonly left: string;
  readonly right: string;
}

/**
 * Cabecera de la credencial: un bloque a cada lado, cada uno en una sola línea.
 * Si no caben, baja la fuente (cqw), nunca hace salto de línea.
 */
export function CardHeader({ left, right }: CardHeaderProps) {
  return (
    <div
      data-testid="card-header"
      className="mb-[3cqw] flex items-baseline justify-between gap-[3cqw] font-mono text-[clamp(.4rem,3.1cqw,1rem)] leading-[1.3] tracking-[.02em] whitespace-nowrap text-[#4d5b3f]"
    >
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}
