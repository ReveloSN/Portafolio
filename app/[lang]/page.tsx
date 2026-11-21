import dynamic from "next/dynamic";
import { OffscreenPause } from "@/components/atoms/OffscreenPause";
import { SkipLink } from "@/components/atoms/SkipLink";
import { About } from "@/components/organisms/About";
import { Footer } from "@/components/organisms/Footer";
import { HobbiesTeaser } from "@/components/organisms/HobbiesTeaser";
import { Hero } from "@/components/organisms/Hero";
import { Navbar } from "@/components/organisms/Navbar";
import { Projects } from "@/components/organisms/Projects";
import { MAIN_CONTENT_ID } from "@/data/navigation";
import { getContent } from "@/lib/locale.server";
import { personJsonLd, serializeJsonLd } from "@/lib/structuredData";

const Testimonials = dynamic(() =>
  import("@/components/organisms/Testimonials").then((m) => m.Testimonials),
);
const Experience = dynamic(() =>
  import("@/components/organisms/Experience").then((m) => m.Experience),
);
const Contact = dynamic(() =>
  import("@/components/organisms/Contact").then((m) => m.Contact),
);

export default async function Home() {
  const { copy, profile, navLinks, projects, testimonials, hobbies, channels } =
    await getContent();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(personJsonLd(profile, channels)),
        }}
      />
      <SkipLink href={`#${MAIN_CONTENT_ID}`}>{copy.nav.skipToContent}</SkipLink>
      <Navbar profile={profile} links={navLinks} />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="w-full overflow-x-clip focus:outline-none"
      >
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Experience />
        <HobbiesTeaser hobbies={hobbies} />
        <Contact channels={channels} />
      </main>
      <OffscreenPause selector="main > section" />
      <Footer profile={profile} links={navLinks} />
    </>
  );
}
