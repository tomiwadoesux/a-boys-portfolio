import { getProjects, getFeaturedProjects } from "../../sanity/lib/fetch";
import ProjectGrid from "./ProjectGrid";

export default async function ProjectGridWrapper({ filter = "all" }) {
  // Always fetch all projects to get correct indices
  const allProjects = await getProjects();
  console.log(
    "[ProjectGridWrapper] allProjects fetched:",
    allProjects.map((p) => ({
      _id: p._id,
      title: p.title,
      order: p.order,
      showDetailPage: p.showDetailPage,
    }))
  );

  // Fetch filtered projects based on filter
  let displayProjects =
    filter === "featured" ? await getFeaturedProjects() : allProjects;

  // Double check filtering (sanity check)
  if (filter === "featured") {
    displayProjects = displayProjects.filter((p) => p.featured === true);
  }

  console.log(
    "[ProjectGridWrapper] displayProjects fetched (filtered by):",
    filter,
    displayProjects.map((p) => ({
      _id: p._id,
      title: p.title,
      order: p.order,
      showDetailPage: p.showDetailPage,
      featured: p.featured,
    }))
  );

  // For featured projects, calculate their index in the complete projects array
  const projectsWithCorrectIndex = displayProjects.map((project) => {
    const actualIndex = allProjects.findIndex((p) => p._id === project._id);
    if (actualIndex === -1) {
      console.error(
        `[ProjectGridWrapper] Project with _id ${project._id} (${project.title}) not found in allProjects!`
      );
    }
    return {
      ...project,
      _actualIndex: actualIndex,
    };
  });
  console.log(
    "[ProjectGridWrapper] projectsWithCorrectIndex (with _actualIndex):",
    projectsWithCorrectIndex.map((p) => ({
      _id: p._id,
      title: p.title,
      _actualIndex: p._actualIndex,
    }))
  );

  return <ProjectGrid projects={projectsWithCorrectIndex} filter={filter} />;
}
