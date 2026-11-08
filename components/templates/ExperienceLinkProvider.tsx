"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ExperienceLinkContext, type ExperienceRequest } from "@/hooks/useExperienceLink";

/** Conecta el fósil con los diarios de la sección Experiencia. */
export function ExperienceLinkProvider({ children }: { readonly children: ReactNode }) {
  const [request, setRequest] = useState<ExperienceRequest | null>(null);
  const reveal = useCallback(
    (id: string) => setRequest((current) => ({ id, seq: (current?.seq ?? 0) + 1 })),
    [],
  );
  const value = useMemo(() => ({ request, reveal }), [request, reveal]);
  return (
    <ExperienceLinkContext.Provider value={value}>
      {children}
    </ExperienceLinkContext.Provider>
  );
}
