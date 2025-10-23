import { getProjects, getFeaturedProjects } from "../../sanity/lib/fetch";
import ProjectGrid from "./ProjectGrid";

export default async function ProjectGridWrapper({ filter = "all" }) {
  // Fetch projects based on filter at the server level
  const projects = filter === "featured"
    ? await getFeaturedProjects()
    : await getProjects();

  return <ProjectGrid projects={projects} filter={filter} />;
}
