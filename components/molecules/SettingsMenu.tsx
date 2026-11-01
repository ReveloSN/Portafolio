"use client";

import { useId, useRef } from "react";
import { MenuSwitch } from "@/components/atoms/MenuSwitch";
import { useMenuDialog } from "@/hooks/useMenuDialog";

/** Un interruptor del menú (modo relajado, sonido, efectos…). */
export interface MenuToggle {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
  readonly testId: string;
}

export interface SettingsMenuLabels {
  readonly settings: string;
  readonly revealAll: string;
  readonly reset: string;
}

interface SettingsMenuProps {
  readonly labels: SettingsMenuLabels;
  readonly toggles: readonly MenuToggle[];
  readonly onRevealAll: () => void;
  readonly onReset: () => void;
}

/** Engranaje que abre un menú pequeño de ajustes y atajos (foco atrapado, Escape cierra). */
export function SettingsMenu({
  labels,
  toggles,
  onRevealAll,
  onReset,
}: SettingsMenuProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menu = useMenuDialog(buttonRef, panelRef);
  const panelId = useId();
  const run = (action: () => void) => () => {
    action();
    menu.close();
  };
  return (
    <div className="lake-settings">
      <button
        ref={buttonRef}
        type="button"
        className="lake-gear"
        aria-label={labels.settings}
        aria-haspopup="dialog"
        aria-expanded={menu.open}
        aria-controls={panelId}
        data-testid="settings-button"
        onClick={menu.toggle}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {menu.open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label={labels.settings}
          className="lake-menu"
          data-testid="settings-menu"
        >
          {toggles.map((toggle) => (
            <MenuSwitch key={toggle.testId} {...toggle} />
          ))}
          <hr />
          <button
            type="button"
            className="lake-menu-row"
            onClick={run(onRevealAll)}
            data-testid="reveal-all"
          >
            {labels.revealAll}
          </button>
          <button
            type="button"
            className="lake-menu-row"
            onClick={run(onReset)}
            data-testid="reset-game"
          >
            {labels.reset}
          </button>
        </div>
      ) : null}
    </div>
  );
}
