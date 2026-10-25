/** Duración (s) de cada capa: velocidades distintas para que la niebla no se vea repetida. */
const LAYERS = [
  { duration: 70, delay: 0, opacity: 0.9 },
  { duration: 52, delay: -18, opacity: 0.7 },
  { duration: 40, delay: -9, opacity: 0.5 },
] as const;

/** Banda de niebla CSS sobre una costura, centrada en el borde superior de la sección. */
export function MistBand() {
  return (
    <div aria-hidden="true" className="mist-band" style={{ zIndex: 1 }}>
      {LAYERS.map((layer, i) => (
        <div
          key={layer.duration}
          className="mist-layer"
          style={{
            animationDuration: `${layer.duration}s`,
            animationDelay: `${layer.delay}s`,
            animationDirection: i % 2 ? "reverse" : "normal",
            opacity: layer.opacity,
          }}
        />
      ))}
    </div>
  );
}
