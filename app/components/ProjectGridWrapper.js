import { getProjects } from "../../sanity/lib/fetch";
import ProjectGrid from "./ProjectGrid";

export default async function ProjectGridWrapper({ filter = "all" }) {
  const projects = await getProjects();

  return <ProjectGrid projects={projects} filter={filter} />;
}
