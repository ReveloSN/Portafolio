import dynamic from "next/dynamic";
import { About } from "@/components/organisms/About";
import { Footer } from "@/components/organisms/Footer";
import { Hero } from "@/components/organisms/Hero";
import { Navbar } from "@/components/organisms/Navbar";
import { Projects } from "@/components/organisms/Projects";
import { CONTACT_EGGS } from "@/data/contact";
import { FOOTER_LINKS, NAV_LINKS } from "@/data/navigation";
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
      <Navbar profile={PROFILE} links={NAV_LINKS} />
      <main className="w-full overflow-x-clip">
        <Hero profile={PROFILE} />
        <About profile={PROFILE} />
        <Projects projects={PROJECTS} />
        <Testimonials testimonials={TESTIMONIALS} />
        <Experience />
        <Contact eggs={CONTACT_EGGS} />
        <Skills skills={SKILLS} />
      </main>
      <Footer profile={PROFILE} links={FOOTER_LINKS} />
    </>
  );
}
