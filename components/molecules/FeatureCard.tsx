interface FeatureCardProps {
  readonly index: number;
  readonly title: string;
  readonly description: string;
}

export function FeatureCard({ index, title, description }: FeatureCardProps) {
  return (
    <article className="hover:border-glow p-fluid-4 h-full rounded-3xl border border-white/18 bg-white/7 transition duration-400 hover:-translate-y-2 hover:shadow-[0_30px_70px_-24px_var(--glow)]">
      <div className="font-display bg-glow flex h-11 w-11 items-center justify-center rounded-full font-extrabold text-(--ink)">
        {index}
      </div>
      <h4 className="font-display text-fluid-lg mt-4 mb-1.5 font-extrabold">{title}</h4>
      <p className="leading-normal opacity-80">{description}</p>
    </article>
  );
}
