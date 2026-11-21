import { CHANNEL_ORDER, CONTACT_CHANNELS } from "@/data/contactChannels";
import { COPY, type Copy } from "@/data/copy";
import { CONTACT_CHANNELS_EN } from "@/data/en/contactChannels";
import { COPY_EN } from "@/data/en/copy";
import { EXPERIENCE_EN } from "@/data/en/experience";
import { BONE_SHAPES_EN } from "@/data/en/fossilPuzzle";
import { HOBBIES_EN, HOBBIES_INTRO_EN, HOBBIES_VALUES_EN } from "@/data/en/hobbies";
import { NAV_LINKS_EN } from "@/data/en/navigation";
import { PROFILE_EN } from "@/data/en/profile";
import { PROJECT_JOURNEYS_EN } from "@/data/en/projectJourneys";
import { PROJECTS_EN } from "@/data/en/projects";
import { TESTIMONIALS_EN } from "@/data/en/testimonials";
import { WORLDS_EN } from "@/data/en/worlds";
import { EXPERIENCE } from "@/data/experience";
import { BONE_SHAPES } from "@/data/fossilPuzzle";
import { HOBBIES, HOBBIES_INTRO, HOBBIES_VALUES } from "@/data/hobbies";
import { NAV_LINKS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import { PROJECT_JOURNEYS, type JourneyStep } from "@/data/projectJourneys";
import { PROJECTS } from "@/data/projects";
import { TESTIMONIALS } from "@/data/testimonials";
import { WORLDS } from "@/data/worlds";
import type { Locale } from "@/lib/i18n";
import type { ChannelId, ContactChannel } from "@/types/contact";
import type { ExperienceEntry } from "@/types/experience";
import type { Hobby } from "@/types/hobby";
import type { NavLink } from "@/types/navigation";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { BoneShape } from "@/types/puzzle";
import type { Testimonial } from "@/types/testimonial";
import type { World, WorldSlug } from "@/types/world";

/** Todo lo que cambia con el idioma. Los datos neutros (arte, geometría, ids) no están aquí. */
export interface SiteContent {
  readonly copy: Copy;
  readonly profile: Profile;
  readonly navLinks: readonly NavLink[];
  readonly projects: readonly Project[];
  readonly worlds: readonly World[];
  readonly journeys: Readonly<Record<WorldSlug, readonly JourneyStep[]>>;
  readonly testimonials: readonly Testimonial[];
  readonly experience: readonly ExperienceEntry[];
  readonly boneShapes: readonly BoneShape[];
  readonly hobbies: readonly Hobby[];
  readonly hobbiesIntro: string;
  readonly hobbiesValues: string;
  /** Canales en el orden del nido. */
  readonly channels: readonly ContactChannel[];
}

const inOrder = (channels: Readonly<Record<ChannelId, ContactChannel>>) =>
  CHANNEL_ORDER.map((id) => channels[id]);

/**
 * Contenido de cada idioma. Agregar un idioma es agregar su carpeta en `data/` y una
 * entrada aquí; los componentes no cambian.
 */
export const CONTENT: Readonly<Record<Locale, SiteContent>> = {
  es: {
    copy: COPY,
    profile: PROFILE,
    navLinks: NAV_LINKS,
    projects: PROJECTS,
    worlds: WORLDS,
    journeys: PROJECT_JOURNEYS,
    testimonials: TESTIMONIALS,
    experience: EXPERIENCE,
    boneShapes: BONE_SHAPES,
    hobbies: HOBBIES,
    hobbiesIntro: HOBBIES_INTRO,
    hobbiesValues: HOBBIES_VALUES,
    channels: inOrder(CONTACT_CHANNELS),
  },
  en: {
    copy: COPY_EN,
    profile: PROFILE_EN,
    navLinks: NAV_LINKS_EN,
    projects: PROJECTS_EN,
    worlds: WORLDS_EN,
    journeys: PROJECT_JOURNEYS_EN,
    testimonials: TESTIMONIALS_EN,
    experience: EXPERIENCE_EN,
    boneShapes: BONE_SHAPES_EN,
    hobbies: HOBBIES_EN,
    hobbiesIntro: HOBBIES_INTRO_EN,
    hobbiesValues: HOBBIES_VALUES_EN,
    channels: inOrder(CONTACT_CHANNELS_EN),
  },
};
