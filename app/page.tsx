import dynamic from "next/dynamic";
import { OffscreenPause } from "@/components/atoms/OffscreenPause";
import { SkipLink } from "@/components/atoms/SkipLink";
import { About } from "@/components/organisms/About";
import { Footer } from "@/components/organisms/Footer";
import { HobbiesTeaser } from "@/components/organisms/HobbiesTeaser";
import { Hero } from "@/components/organisms/Hero";
import { Navbar } from "@/components/organisms/Navbar";
import { Projects } from "@/components/organisms/Projects";
import { CHANNEL_ORDER, CONTACT_CHANNELS } from "@/data/contactChannels";
import { COPY } from "@/data/copy";
import { HOBBIES } from "@/data/hobbies";
import { FOOTER_LINKS, MAIN_CONTENT_ID, NAV_LINKS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { TESTIMONIALS } from "@/data/testimonials";
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            personJsonLd(
              PROFILE,
              CHANNEL_ORDER.map((id) => CONTACT_CHANNELS[id]),
            ),
          ),
        }}
      />
      <SkipLink href={`#${MAIN_CONTENT_ID}`}>{COPY.nav.skipToContent}</SkipLink>
      <Navbar profile={PROFILE} links={NAV_LINKS} />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="w-full overflow-x-clip focus:outline-none"
      >
        <Hero profile={PROFILE} />
        <About profile={PROFILE} />
        <Projects projects={PROJECTS} />
        <Testimonials testimonials={TESTIMONIALS} />
        <Experience />
        <HobbiesTeaser hobbies={HOBBIES} />
        <Contact channels={CHANNEL_ORDER.map((id) => CONTACT_CHANNELS[id])} />
      </main>
      <OffscreenPause selector="main > section" />
      <Footer profile={PROFILE} links={FOOTER_LINKS} />
    </>
  );
}
