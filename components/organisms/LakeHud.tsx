import type { ReactNode, Ref } from "react";
import { CatchMarks } from "@/components/molecules/CatchMarks";
import { HudStatus } from "@/components/molecules/HudStatus";
import {
  SettingsMenu,
  type MenuToggle,
  type SettingsMenuLabels,
} from "@/components/molecules/SettingsMenu";

interface LakeHudProps {
  readonly status: string;
  readonly actionLabel: string;
  readonly idle: boolean;
  readonly urgent: boolean;
  readonly onPress: () => void;
  readonly onRelease: () => void;
  readonly meter?: ReactNode;
  readonly actionRef?: Ref<HTMLButtonElement>;
  readonly count: number;
  readonly total: number;
  readonly labels: SettingsMenuLabels & { readonly captures: string };
  readonly toggles: readonly MenuToggle[];
  readonly onRevealAll: () => void;
  readonly onReset: () => void;
}

/**
 * Interfaz casi invisible sobre la escena: estado y ficha abajo al centro, muescas de
 * capturas abajo a la derecha y el engranaje de ajustes arriba a la derecha.
 */
export function LakeHud(props: LakeHudProps) {
  const { labels, toggles, onRevealAll, onReset, count, total } = props;
  return (
    <div className="lake-hud">
      <SettingsMenu
        labels={labels}
        toggles={toggles}
        onRevealAll={onRevealAll}
        onReset={onReset}
      />
      <HudStatus
        status={props.status}
        actionLabel={props.actionLabel}
        idle={props.idle}
        urgent={props.urgent}
        onPress={props.onPress}
        onRelease={props.onRelease}
        meter={props.meter}
        actionRef={props.actionRef}
      />
      <CatchMarks label={labels.captures} count={count} total={total} />
    </div>
  );
}
