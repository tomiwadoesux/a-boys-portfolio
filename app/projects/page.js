import PageConfig from "../components/PageConfig";
import ProjectGridWrapper from "../components/ProjectGridWrapper";
import SvgHover from "../components/SvgHover";

// Metadata for SEO
export const metadata = {
  title: "Web Development Projects & Case Studies",
  description: "Explore my portfolio of web development projects featuring Next.js, React, and modern frontend technologies. Detailed case studies showcasing design engineering and UI/UX work.",
  keywords: ["Web Development Projects", "Next.js Projects", "React Portfolio", "Frontend Development", "Design Engineering Case Studies", "UI/UX Projects"],
  openGraph: {
    title: "Projects | Ayotomcs",
    description: "Portfolio of web development projects and case studies",
    url: "https://ayotomcs.me/projects",
    images: ["/opengraph.png"],
  },
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
