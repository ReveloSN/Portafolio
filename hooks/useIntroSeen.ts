"use client";

import { useEffect } from "react";
import { markIntroSeen, sessionStoreOrNull } from "@/lib/intro";

/** Recuerda en la sesión de la pestaña que la intro ya se reprodujo (no se repite al volver). */
export function useIntroSeen(playing: boolean) {
  useEffect(() => {
    if (playing) markIntroSeen(sessionStoreOrNull());
  }, [playing]);
}
