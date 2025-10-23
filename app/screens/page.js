import Screens from "../components/Screens";
import { getProjects } from "../../sanity/lib/fetch";

// Force static generation at build time with prerendering
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour in production

export const metadata = {
  title: "Screens - Ayotomcs",
  description: "Interactive video projects showcase",
};

export default async function ScreensPage() {
  // Fetch all projects that have videos
  const projects = await getProjects();
  // Filter projects that have at least one video (desktop or mobile)
  const projectsWithVideos = projects.filter(p => p.desktopVideo || p.mobileVideo);

  return (
    <section className="h-screen overflow-hidden flex flex-col">
      <Screens screens={projectsWithVideos} />
    </section>
  );
}
