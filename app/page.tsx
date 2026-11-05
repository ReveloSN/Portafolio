import dynamic from "next/dynamic";
import { SkipLink } from "@/components/atoms/SkipLink";
import { About } from "@/components/organisms/About";
import { Footer } from "@/components/organisms/Footer";
import { Hero } from "@/components/organisms/Hero";
import { Navbar } from "@/components/organisms/Navbar";
import { Projects } from "@/components/organisms/Projects";
import { CHANNEL_ORDER, CONTACT_CHANNELS } from "@/data/contactChannels";
import { COPY } from "@/data/copy";
import { FOOTER_LINKS, MAIN_CONTENT_ID, NAV_LINKS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { TESTIMONIALS } from "@/data/testimonials";

const Testimonials = dynamic(() =>
  import("@/components/organisms/Testimonials").then((m) => m.Testimonials),
);
const Experience = dynamic(() =>
  import("@/components/organisms/Experience").then((m) => m.Experience),
);
const Contact = dynamic(() =>
  import("@/components/organisms/Contact").then((m) => m.Contact),
);
const Skills = dynamic(() =>
  import("@/components/organisms/Skills").then((m) => m.Skills),
);

export default function Home() {
  return (
    <>
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
        <Skills skills={SKILLS} />
        <Contact channels={CHANNEL_ORDER.map((id) => CONTACT_CHANNELS[id])} />
      </main>
      <Footer profile={PROFILE} links={FOOTER_LINKS} />
    </>
  );
}
