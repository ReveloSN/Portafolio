interface MenuSwitchProps {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
  readonly testId: string;
}

/** Interruptor de una fila del menú de ajustes (role="switch", etiqueta visible). */
export function MenuSwitch({ label, checked, onChange, testId }: MenuSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-testid={testId}
      className="lake-menu-row"
      onClick={() => onChange(!checked)}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="lake-switch" data-on={checked || undefined} />
    </button>
  );
}
