import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro?: string;
  readonly align?: "left" | "center";
  readonly accent?: string;
  readonly titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  accent = "var(--glow)",
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <header className={cn(centered && "text-center")}>
      <p
        className="font-display text-fluid-sm font-medium tracking-[.5em]"
        style={{ color: accent }}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-display mt-3.5 mb-4 leading-none font-extrabold tracking-[-.02em]",
          titleClassName,
        )}
      >
        {title}
      </h2>
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
