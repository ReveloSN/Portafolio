import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorldLayout } from "@/components/templates/WorldLayout";
import { SCENES } from "@/components/worlds/registry";
import { PROFILE } from "@/data/profile";
import { WORLDS } from "@/data/worlds";
import { projectsBySlug, worldsBySlug } from "@/lib/collections";
import { WORLD_SLUGS, type WorldSlug } from "@/types/world";

interface WorldPageProps {
  readonly params: Promise<{ slug: string }>;
}

const isWorldSlug = (value: string): value is WorldSlug =>
  (WORLD_SLUGS as readonly string[]).includes(value);

export function generateStaticParams() {
  return WORLD_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorldPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = isWorldSlug(slug) ? projectsBySlug.get(slug) : undefined;
  return project
    ? { title: `${project.name} | ${PROFILE.firstName}`, description: project.tagline }
    : {};
}

export default async function WorldPage({ params }: WorldPageProps) {
  const { slug } = await params;
  if (!isWorldSlug(slug)) notFound();
  const world = worldsBySlug.get(slug);
  const project = projectsBySlug.get(slug);
  if (!world || !project) notFound();

  return (
    <WorldLayout
      world={world}
      worlds={WORLDS}
      project={project}
      profile={PROFILE}
      Scene={SCENES[slug]}
    />
  );
}
