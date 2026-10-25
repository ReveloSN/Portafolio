import { Hero } from "@/components/organisms/Hero";
import { Navbar } from "@/components/organisms/Navbar";
import { NAV_LINKS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Navbar profile={PROFILE} links={NAV_LINKS} />
      <main className="w-full overflow-x-clip">
        <Hero profile={PROFILE} />
      </main>
    </>
  );
}
