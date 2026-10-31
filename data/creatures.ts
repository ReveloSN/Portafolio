import { bursts, wave } from "@/lib/fishing/creatures";
import type { Bait, Creature } from "@/types/fishing";

/** Carnadas del selector, en orden de aparición. */
export const BAITS: readonly Bait[] = [
  { id: "worm", label: "Lombriz", hint: "Atrae a los peces de siempre." },
  { id: "minnow", label: "Pececillo", hint: "Tienta a los cazadores." },
  { id: "firefly", label: "Luciérnaga", hint: "Su brillo despierta a lo raro." },
];

/**
 * Habitantes del lago. Del más dócil al más feroz; cada uno revela una entrada de
 * `experience.ts` (el más grande guarda la más reciente).
 */
export const CREATURES: readonly Creature[] = [
  {
    id: "lepidotes",
    name: "Lepidotes",
    depth: "shore",
    baits: ["worm", "minnow"],
    difficulty: 0.15,
    size: "small",
    phases: [wave(0.25, 0.15, 1600)],
    unlockAfter: 0,
    experienceId: "e4",
    art: "catch-fish-1",
    breach: "small",
  },
  {
    id: "ammonite",
    name: "Amonita",
    depth: "shore",
    baits: ["firefly"],
    difficulty: 0.25,
    size: "small",
    phases: [wave(0.3, 0.2, 1200)],
    unlockAfter: 0,
    experienceId: "e5",
    art: "catch-fish-2",
    breach: "small",
  },
  {
    id: "coelacanth",
    name: "Celacanto",
    depth: "mid",
    baits: ["minnow", "worm"],
    difficulty: 0.4,
    size: "medium",
    phases: [bursts(0.3, 0.7, 2200, 500)],
    unlockAfter: 0,
    experienceId: "e3",
    art: "catch-fish-3",
    breach: "mid",
  },
  {
    id: "ichthyosaur",
    name: "Ictiosaurio",
    depth: "mid",
    baits: ["firefly"],
    difficulty: 0.5,
    size: "large",
    phases: [wave(0.45, 0.3, 900)],
    unlockAfter: 0,
    experienceId: "e2",
    art: "catch-fish-4",
    breach: "mid",
  },
  {
    id: "mosasaur",
    name: "Mosasaurio",
    depth: "deep",
    baits: ["minnow", "worm"],
    difficulty: 0.65,
    size: "large",
    phases: [bursts(0.4, 0.85, 1800, 600)],
    unlockAfter: 0,
    experienceId: "e1",
    art: "catch-mosasaur",
    breach: "giant",
  },
  {
    id: "megalodon",
    name: "Megalodón",
    depth: "deep",
    baits: ["firefly"],
    difficulty: 0.8,
    size: "huge",
    phases: [wave(0.45, 0.25, 1400), bursts(0.5, 1, 1300, 650)],
    unlockAfter: 4,
    experienceId: "e0",
    art: "catch-megalodon",
    breach: "giant",
  },
];
