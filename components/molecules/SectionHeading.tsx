import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly intro?: string;
  readonly align?: "left" | "center";
  readonly accent?: string;
  readonly titleClassName?: string;
  /** "h1" cuando la sección es el contenido principal de su propia página. */
  readonly level?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  accent = "var(--glow)",
  titleClassName,
  level = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  const Heading = level;
  return (
    <header className={cn(centered && "text-center")}>
      {eyebrow ? (
        <p
          className="font-display text-fluid-sm font-medium tracking-[.5em]"
          style={{ color: accent }}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "font-display text-display mt-3.5 mb-4 leading-none font-extrabold tracking-[-.02em]",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <p
          className={cn(
            "text-fluid-md max-w-[calc(var(--u)*38.9)] leading-relaxed opacity-80",
            centered && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}
