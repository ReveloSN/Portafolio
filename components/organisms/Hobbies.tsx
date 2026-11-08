import { Button } from "@/components/atoms/Button";
import { HobbyCard } from "@/components/molecules/HobbyCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { SECTION_IDS } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { Hobby } from "@/types/hobby";

interface HobbiesProps {
  readonly hobbies: readonly Hobby[];
  /** Presentación personal bajo el título. */
  readonly intro: string;
  /** Cierre de la página: lo que la persona valora. */
  readonly values: string;
}

/** Página propia (`/hobbies`): el mismo tono de fondo que Sobre mí en cada tema. */
const BACKGROUND = "var(--seam-about-end)";

export function Hobbies({ hobbies, intro, values }: HobbiesProps) {
  const { hobbies: copy } = COPY;
  return (
    <SectionShell id={SECTION_IDS.hobbies} background={BACKGROUND}>
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*88.9))]">
        <SectionHeading level="h1" title={copy.title} intro={intro} />
        <ul className="mt-fluid-6 gap-fluid-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby) => (
            <li
              key={hobby.id}
              className={cn(
                hobby.featured && "md:col-span-2 lg:row-span-2",
                hobby.wide && "md:col-span-2 lg:col-span-3",
              )}
            >
              <HobbyCard hobby={hobby} exampleLabel={copy.example} />
            </li>
          ))}
        </ul>
        <p className="mt-fluid-6 font-display text-fluid-xl max-w-[38ch] leading-snug font-medium">
          {values}
        </p>
        <div className="mt-fluid-5">
          <Button variant="ghost" href="/">
            {copy.back} <span aria-hidden="true">←</span>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
