import Image from "next/image";

export function AuroraScene() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[#061a28]" aria-hidden="true">
      <Image src="/art/worlds/aurora.webp" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" className="object-cover" />
      <div className="aurora-drift" />
      <div className="absolute inset-0 bg-linear-to-t from-[#061a28] via-transparent to-[#061a28]/30" />
    </div>
  );
}
