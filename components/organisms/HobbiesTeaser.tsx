import { Button } from "@/components/atoms/Button";
import { HobbyGlyph } from "@/components/atoms/HobbyGlyph";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { HOBBIES_PATH, SECTION_IDS } from "@/data/navigation";
import { seamBackground } from "@/lib/seams";
import type { Hobby } from "@/types/hobby";

interface HobbiesTeaserProps {
  readonly hobbies: readonly Hobby[];
}

/** Va entre Experiencia y Contacto: parte del color de una y termina en el de la otra. */
const BACKGROUND = seamBackground(
  "--seam-experience-end",
  "--seam-contact-start",
  "radial-gradient(ellipse 70% 60% at 50% 40%, var(--contact-glow) 0, var(--seam-contact-start) 75%)",
);

/**
 * Entrada a la página de hobbies. Muestra solo los hobbies reales: los de ejemplo
 * llevan su aviso en `/hobbies`, pero aquí parecerían datos confirmados.
 */
export function HobbiesTeaser({ hobbies }: HobbiesTeaserProps) {
  const { hobbies: copy } = COPY;
  const confirmed = hobbies.filter((hobby) => !hobby.example);
  return (
    <SectionShell id={SECTION_IDS.hobbies} background={BACKGROUND}>
      {/* Móvil: título, fichas y botón al final (la ficha no parece otro botón).
          Escritorio: las fichas a la derecha, abarcando las dos filas. */}
      <div className="gap-x-fluid-4 mx-auto grid max-w-[min(var(--content-max),calc(var(--u)*88.9))] items-center gap-y-6 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="md:col-start-1 md:row-start-1">
          <SectionHeading title={copy.title} intro={copy.intro} />
        </div>
        {confirmed.length > 0 ? (
          <ul className="flex flex-wrap gap-3 md:col-start-2 md:row-span-2 md:row-start-1 md:flex-col md:items-start">
            {confirmed.map((hobby) => (
              <li
                key={hobby.id}
                className="border-line bg-surface flex items-center gap-4 rounded-2xl border px-5 py-4"
              >
                <HobbyGlyph kind={hobby.glyph} className="text-glow size-10" />
                <span className="font-display text-fluid-lg font-bold">{hobby.name}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="md:col-start-1 md:row-start-2">
          <Button href={HOBBIES_PATH}>
            {copy.enter} <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
