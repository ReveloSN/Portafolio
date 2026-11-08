interface FeatureCardProps {
  readonly index: number;
  readonly title: string;
  readonly description: string;
}

export function FeatureCard({ index, title, description }: FeatureCardProps) {
  return (
    <article className="world-feature">
      <div className="font-display bg-glow flex h-11 w-11 items-center justify-center rounded-full font-extrabold text-(--ink)">
        {index}
      </div>
      <h3 className="font-display text-fluid-lg mt-4 mb-1.5 font-extrabold">{title}</h3>
      <p className="leading-normal opacity-80">{description}</p>
    </article>
  );
}
