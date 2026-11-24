import { Button } from "@/components/atoms/Button";
import { HobbyCard } from "@/components/molecules/HobbyCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SectionShell } from "@/components/templates/SectionShell";
import { HOBBY_PHOTOS } from "@/data/hobbyPhotos";
import { getCopy } from "@/lib/locale.server";
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

export async function Hobbies({ hobbies, intro, values }: HobbiesProps) {
  const COPY = await getCopy();
  const { hobbies: copy } = COPY;
  const photoCredits = hobbies.flatMap(({ id, name }) => {
    const photo = HOBBY_PHOTOS[id];
    return photo ? [{ id, name, photo }] : [];
  });
  return (
    <SectionShell
      id={SECTION_IDS.hobbies}
      background={BACKGROUND}
      className="pt-[clamp(2.75rem,7svh,5.5rem)]"
    >
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*88.9))]">
        <SectionHeading level="h1" title={copy.title} intro={intro} />
        <ul className="mt-fluid-6 gap-fluid-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby) => (
            <li
              key={hobby.id}
              className={cn(
                hobby.featured && "col-span-full",
                hobby.wide && "md:max-lg:col-span-2",
              )}
            >
              <HobbyCard hobby={hobby} exampleLabel={copy.example} />
            </li>
          ))}
        </ul>
        {photoCredits.length > 0 ? (
          <details className="text-fluid-xs text-muted mt-5">
            <summary className="w-fit cursor-pointer underline underline-offset-4">
              {copy.photoCredits}
            </summary>
            <ul className="mt-3 space-y-1.5">
              {photoCredits.map(({ id, name, photo }) => (
                <li key={id}>
                  {name} ·{" "}
                  <a className="underline" href={photo.source}>
                    {photo.author}
                  </a>
                  {" · "}
                  <a className="underline" href={photo.license.href}>
                    {photo.license.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2">{copy.photoEdits}</p>
          </details>
        ) : null}
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
