"use client";

import { Icon } from "@/components/atoms/Icon";
import { useTheme } from "@/hooks/useTheme";
import { oppositeTheme } from "@/lib/theme";

interface ThemeToggleProps {
  readonly toDarkLabel: string;
  readonly toLightLabel: string;
}

/** Cambia entre tema claro y oscuro; el nombre dice a qué tema lleva. */
export function ThemeToggle({ toDarkLabel, toLightLabel }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const label = dark ? toLightLabel : toDarkLabel;
  return (
    <button
      type="button"
      onClick={() => setTheme(oppositeTheme(theme))}
      aria-label={label}
      title={label}
      data-testid="theme-toggle"
      className="text-fg border-line-strong bg-surface hover:bg-surface-strong inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border transition"
    >
      <Icon name={dark ? "sun" : "moon"} size={20} strokeWidth={2.2} />
    </button>
  );
}
