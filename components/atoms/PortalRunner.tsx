/** Trazos del corredor en su lienzo de 64x54. */
const VIEW_BOX = "0 0 64 54";
const BACK_LEG = "M29 32h7v8l-5 6v5h-8v-4h4v-6l2-3Z";
const BODY =
  "M38 6h15v3h6v12H46v4h7v5H43v5H33v5h-9v-5l-7-2-6-4-5-5-3-7 8 5 9 3h7l5-6v-7h3V9h3Z";
const FRONT_LEG = "M26 32h8v9l5 5v5h-9v-4l-4-5Z";

/**
 * Dinosaurio que corre en «Cargando…». Cada pata es su propio `<svg>`: girar un trazo
 * dentro de un SVG obliga a recalcular layout en cada cuadro justo mientras la página se
 * hidrata; girar el SVG entero lo hace el compositor.
 */
export function PortalRunner() {
  return (
    <div className="portal-runner" aria-hidden="true">
      <svg
        className="portal-runner-leg portal-runner-leg-back"
        viewBox={VIEW_BOX}
        fill="currentColor"
      >
        <path d={BACK_LEG} />
      </svg>
      <svg viewBox={VIEW_BOX} fill="currentColor">
        <path d={BODY} />
        <rect x="43" y="11" width="3" height="3" fill="#000" />
      </svg>
      <svg className="portal-runner-leg" viewBox={VIEW_BOX} fill="currentColor">
        <path d={FRONT_LEG} />
      </svg>
    </div>
  );
}
