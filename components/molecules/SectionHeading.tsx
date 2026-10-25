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
        className="font-display text-sm font-medium tracking-[.5em]"
        style={{ color: accent }}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display mt-3.5 mb-4 text-[clamp(34px,5vw,72px)] leading-none font-extrabold tracking-[-.02em]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "max-w-[560px] text-lg leading-relaxed opacity-80",
            centered && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}
