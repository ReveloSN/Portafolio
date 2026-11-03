interface SkipLinkProps {
  readonly href: string;
  readonly children: string;
}

/** Primer elemento enfocable de la página: visible solo con el foco del teclado. */
export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="bg-glow sr-only z-[100] rounded-full px-5 py-3 font-sans font-semibold text-(--ink) no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {children}
    </a>
  );
}
