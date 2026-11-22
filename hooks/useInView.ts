"use client";

import { useEffect, useRef, useState } from "react";

/** Devuelve `true` (y se desconecta) la primera vez que el elemento entra en pantalla. */
export function useInView<T extends HTMLElement>(threshold = 0.15, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
