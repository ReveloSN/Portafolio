import { CumbreArt } from "@/components/worlds/art/CumbreArt";

/** Capas de niebla que cruzan despacio; viven en HTML para no repintar el SVG. */
const CLOUD_LAYERS = ["cloud-drift", "cloud-drift cloud-drift-slow"] as const;

export function CumbreScene() {
  return (
    <>
      <CumbreArt />
      {CLOUD_LAYERS.map((className) => (
        <div key={className} aria-hidden="true" className={className} />
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[55%]"
        style={{
          background: "linear-gradient(to top, rgba(10,18,40,.9) 0, transparent 100%)",
        }}
      />
    </>
  );
}
