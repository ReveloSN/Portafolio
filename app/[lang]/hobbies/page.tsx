import { SkipLink } from "@/components/atoms/SkipLink";
import { Footer } from "@/components/organisms/Footer";
import { Hobbies } from "@/components/organisms/Hobbies";
import { Navbar } from "@/components/organisms/Navbar";
import { COPY } from "@/data/copy";
import { HOBBIES, HOBBIES_INTRO, HOBBIES_VALUES } from "@/data/hobbies";
import { FOOTER_LINKS, MAIN_CONTENT_ID, NAV_LINKS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: COPY.hobbies.title,
  description: COPY.hobbies.intro,
};

export default function HobbiesPage() {
  return (
    <>
      <SkipLink href={`#${MAIN_CONTENT_ID}`}>{COPY.nav.skipToContent}</SkipLink>
      <Navbar profile={PROFILE} links={NAV_LINKS} />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="pt-nav w-full overflow-x-clip focus:outline-none"
      >
        <Hobbies hobbies={HOBBIES} intro={HOBBIES_INTRO} values={HOBBIES_VALUES} />
      </main>
      <Footer profile={PROFILE} links={FOOTER_LINKS} />
    </>
  );
}
