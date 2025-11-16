import { getProjects, getFeaturedProjects } from "../../sanity/lib/fetch";
import ProjectGrid from "./ProjectGrid";

export default async function ProjectGridWrapper({ filter = "all" }) {
  // Always fetch all projects to get correct indices
  const allProjects = await getProjects();

  // Fetch filtered projects based on filter
  const displayProjects = filter === "featured"
    ? await getFeaturedProjects()
    : allProjects;

  // For featured projects, calculate their index in the complete projects array
  const projectsWithCorrectIndex = displayProjects.map((project) => {
    const actualIndex = allProjects.findIndex((p) => p._id === project._id);
    return {
      ...project,
      _actualIndex: actualIndex,
    };
  });

  return <ProjectGrid projects={projectsWithCorrectIndex} filter={filter} />;
}
