/** Id del filtro; los logos lo usan con `filter: url(#tech-engrave)`. */
export const ENGRAVE_FILTER_ID = "tech-engrave";

/**
 * Filtro SVG de grabado hundido, definido una sola vez por página. Con la luz desde
 * arriba, el borde superior del interior queda en sombra (sombra interior fina) y el
 * labio inferior recibe un filo de luz discreto. Las medidas son relativas a la caja
 * de cada logo, así el relieve es igual en todos los tamaños.
 */
export function EngraveFilter() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <filter
        id={ENGRAVE_FILTER_ID}
        x="-10%"
        y="-10%"
        width="120%"
        height="120%"
        primitiveUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        {/* Sombra interior: el negativo de la forma, bajado y difuminado, solo dentro */}
        <feComponentTransfer in="SourceAlpha" result="outside">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feOffset in="outside" dx="0.008" dy="0.035" result="fallen" />
        <feGaussianBlur in="fallen" stdDeviation="0.012" result="soft" />
        <feComposite in="soft" in2="SourceAlpha" operator="in" result="innerMask" />
        <feFlood floodColor="#1c0b06" floodOpacity="0.82" />
        <feComposite in2="innerMask" operator="in" result="innerShadow" />
        {/* Filo de luz: la forma bajada, solo por fuera, en el labio inferior */}
        <feOffset in="SourceAlpha" dy="0.028" result="lowered" />
        <feComposite in="lowered" in2="SourceAlpha" operator="out" result="lipMask" />
        <feFlood floodColor="#fff4dc" floodOpacity="0.32" />
        <feComposite in2="lipMask" operator="in" result="lip" />
        <feMerge>
          <feMergeNode in="lip" />
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="innerShadow" />
        </feMerge>
      </filter>
    </svg>
  );
}
