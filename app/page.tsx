import dynamic from "next/dynamic";
import { SkipLink } from "@/components/atoms/SkipLink";
import { About } from "@/components/organisms/About";
import { Footer } from "@/components/organisms/Footer";
import { Hero } from "@/components/organisms/Hero";
import { Navbar } from "@/components/organisms/Navbar";
import { Projects } from "@/components/organisms/Projects";
import { CONTACT_EGGS } from "@/data/contact";
import { COPY } from "@/data/copy";
import { FOOTER_LINKS, MAIN_CONTENT_ID, NAV_LINKS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { TESTIMONIALS } from "@/data/testimonials";

const Testimonials = dynamic(() =>
  import("@/components/organisms/Testimonials").then((m) => m.Testimonials),
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
        <Skills skills={SKILLS} />
        <Contact eggs={CONTACT_EGGS} />
      </main>
      <Footer profile={PROFILE} links={FOOTER_LINKS} />
    </>
  );
}
