import PageConfig from "../components/PageConfig";
import ProjectGridWrapper from "../components/ProjectGridWrapper";
import SvgHover from "../components/SvgHover";

// Metadata for SEO
export const metadata = {
  title: "Projects | Ayotomcs",
  description: "Explore my collection of design and engineering projects.",
};

// Pre-render this page at build time and revalidate every hour
export const revalidate = 3600;
export const dynamic = 'force-static';

export default function ProjectsPage() {
  return (
    <div>
      <PageConfig activePage="/projects"  description={
          <>
            My.. <span className="text-[#4447A9]">Projects</span>
          </>
        } />
     
      <ProjectGridWrapper filter="all" />
    </div>
  );
}
