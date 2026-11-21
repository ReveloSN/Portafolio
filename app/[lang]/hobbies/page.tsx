import type { Metadata } from "next";
import { SkipLink } from "@/components/atoms/SkipLink";
import { Footer } from "@/components/organisms/Footer";
import { Hobbies } from "@/components/organisms/Hobbies";
import { Navbar } from "@/components/organisms/Navbar";
import { HOBBIES_PATH, MAIN_CONTENT_ID } from "@/data/navigation";
import { getContent, getLocale } from "@/lib/locale.server";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getContent();
  return {
    title: copy.hobbies.title,
    description: copy.hobbies.intro,
    alternates: languageAlternates(await getLocale(), HOBBIES_PATH),
  };
}

export default async function HobbiesPage() {
  const { copy, profile, navLinks, hobbies, hobbiesIntro, hobbiesValues } =
    await getContent();
  return (
    <>
      <SkipLink href={`#${MAIN_CONTENT_ID}`}>{copy.nav.skipToContent}</SkipLink>
      <Navbar profile={profile} links={navLinks} />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="pt-nav w-full overflow-x-clip focus:outline-none"
      >
        <Hobbies hobbies={hobbies} intro={hobbiesIntro} values={hobbiesValues} />
      </main>
      <Footer profile={profile} links={navLinks} />
    </>
  );
}
