import type { Metadata } from "next";
import { Button } from "@/components/atoms/Button";
import { SkipLink } from "@/components/atoms/SkipLink";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { SectionShell } from "@/components/templates/SectionShell";
import { COPY } from "@/data/copy";
import { FOOTER_LINKS, MAIN_CONTENT_ID, NAV_LINKS, SECTION_IDS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";

export const metadata: Metadata = {
  title: COPY.notFound.title,
};

/** Página 404 en español, con la navegación del sitio y dos caminos de vuelta. */
export default function NotFound() {
  const copy = COPY.notFound;
  return (
    <>
      <SkipLink href={`#${MAIN_CONTENT_ID}`}>{COPY.nav.skipToContent}</SkipLink>
      <Navbar profile={PROFILE} links={NAV_LINKS} />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="pt-nav w-full overflow-x-clip focus:outline-none"
      >
        <SectionShell id="no-encontrada" background="var(--seam-about-end)">
          <div className="mx-auto flex min-h-[50svh] max-w-[min(var(--content-max),calc(var(--u)*88.9))] flex-col justify-center">
            <SectionHeading level="h1" title={copy.title} intro={copy.text} />
            <div className="mt-fluid-4 flex flex-wrap gap-3">
              <Button href="/">{copy.home}</Button>
              <Button variant="ghost" href={`/#${SECTION_IDS.projects}`}>
                {copy.projects}
              </Button>
            </div>
          </div>
        </SectionShell>
      </main>
      <Footer profile={PROFILE} links={FOOTER_LINKS} />
    </>
  );
}
