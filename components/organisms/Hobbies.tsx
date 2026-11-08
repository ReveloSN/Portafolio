import { HobbyCard } from "@/components/molecules/HobbyCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import type { Hobby } from "@/types/hobby";

interface HobbiesProps {
  readonly hobbies: readonly Hobby[];
}

/** Página propia (`/hobbies`): el mismo tono de fondo que Sobre mí en cada tema. */
const BACKGROUND = "var(--seam-about-end)";

export function Hobbies({ hobbies }: HobbiesProps) {
  const { hobbies: copy } = COPY;
  return (
    <SectionShell id={SECTION_IDS.hobbies} background={BACKGROUND}>
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*88.9))]">
        <SectionHeading level="h1" title={copy.title} intro={copy.intro} />
        <ul className="mt-fluid-6 gap-fluid-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby) => (
            <li
              key={hobby.id}
              className={hobby.featured ? "md:col-span-2 lg:row-span-2" : undefined}
            >
              <HobbyCard hobby={hobby} exampleLabel={copy.example} />
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
