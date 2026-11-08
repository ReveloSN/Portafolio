import { Button } from "@/components/atoms/Button";
import { SkipLink } from "@/components/atoms/SkipLink";
import { Footer } from "@/components/organisms/Footer";
import { Hobbies } from "@/components/organisms/Hobbies";
import { Navbar } from "@/components/organisms/Navbar";
import { COPY } from "@/data/copy";
import { HOBBIES } from "@/data/hobbies";
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
        <Hobbies hobbies={HOBBIES} />
        <div className="px-gutter pb-section mx-auto max-w-[min(var(--content-max),calc(var(--u)*88.9))]">
          <Button variant="ghost" href="/">
            {COPY.hobbies.back} <span aria-hidden="true">←</span>
          </Button>
        </div>
      </main>
      <Footer profile={PROFILE} links={FOOTER_LINKS} />
    </>
  );
}
