import PageConfig from "../components/PageConfig";
import ProjectGridWrapper from "../components/ProjectGridWrapper";
import SvgHover from "../components/SvgHover";
// Metadata for SEO
export const metadata = {
  title: "Projects | Design Engineer Portfolio",
  description: "Explore my collection of design and engineering projects.",
};

export default function ProjectsPage() {
  return (
    <div>
      <PageConfig activePage="/projects" />
     
      <ProjectGridWrapper filter="all" />
    </div>
  );
}
