import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorldLayout } from "@/components/templates/WorldLayout";
import { getCollections, getContent, getLocale } from "@/lib/locale.server";
import { languageAlternates } from "@/lib/seo";
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
  const { projectsBySlug } = await getCollections();
  const project = isWorldSlug(slug) ? projectsBySlug.get(slug) : undefined;
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    alternates: languageAlternates(await getLocale(), `/mundos/${slug}`),
  };
}

export default async function WorldPage({ params }: WorldPageProps) {
  const { slug } = await params;
  if (!isWorldSlug(slug)) notFound();
  const { projectsBySlug, worldsBySlug } = await getCollections();
  const { worlds, profile } = await getContent();
  const world = worldsBySlug.get(slug);
  const project = projectsBySlug.get(slug);
  if (!world || !project) notFound();

  return (
    <WorldLayout world={world} worlds={worlds} project={project} profile={profile} />
  );
}
