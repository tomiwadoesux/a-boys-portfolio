import Screens from "../components/Screens";
import { getScreens } from "../../sanity/lib/fetch";

// Force static generation at build time with prerendering
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour in production

export const metadata = {
  title: "Screens - Ayotomcs",
  description: "Interactive video projects showcase",
};

export default async function ScreensPage() {
  // Fetch all screens that have videos
  const screens = await getScreens();
  // Filter screens that have at least one video (desktop or mobile)
  const screensWithVideos = screens.filter(s => s.desktopVideo || s.mobileVideo);

  return (
    <section className="h-screen overflow-hidden flex flex-col">
      <Screens screens={screensWithVideos} />
    </section>
  );
}
