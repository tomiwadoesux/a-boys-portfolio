import PageConfig from "./components/PageConfig";
import Front from "./components/Front";
import ProjectGridWrapper from "./components/ProjectGridWrapper";
import MusicWidget from "./components/MusicWidget";
import Socials from "./components/Socials";
import Down from "./components/Down"
export const metadata = {
  title: "Home | Design Engineer Portfolio",
  description:
    "A Design Engineer based in Abuja, Nigeria. Explore my creative work and projects.",
};

export default function Home() {
  return (
    <div>
      <PageConfig
        description={
          <>
            A Design Engineer Now in{" "}
            <span className="text-[#4447A9]">Abuja, Nigeria</span>
          </>
        }
        activePage="/"
      />
      <Front />
      <MusicWidget />
      <ProjectGridWrapper filter="featured" />
      <Down/>
      <Socials />
    </div>
  );
}
