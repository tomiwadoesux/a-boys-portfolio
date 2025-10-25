import PageConfig from "./components/PageConfig";
import Front from "./components/Front";
import ProjectGridWrapper from "./components/ProjectGridWrapper";
import Socials from "./components/Socials";
import Down from "./components/Down"
import MusicWidgetWrapper from "./components/MusicWidgetWrapper";

export const metadata = {
  title: "Home | Ayotomcs",
  description:
    "A Design Engineer. Explore my creative work and projects.",
};

// Revalidate every hour
export const revalidate = 3600;

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
  
      <ProjectGridWrapper filter="featured" />
      <Down/>
      <MusicWidgetWrapper />
      {/* <Socials /> */}
    </div>
  );
}
