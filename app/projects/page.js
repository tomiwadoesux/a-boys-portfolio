import Body from "../components/Body";
import ProjectGridWrapper from "../components/ProjectGridWrapper";

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default function ProjectsPage() {
  return (
    <div>
      <Body />
      <ProjectGridWrapper />
    </div>
  );
}
