import BodyScreens from "../components/BodyScreens";
import Screens from "../components/Screens";
import { getScreens } from "../../sanity/lib/fetch";

// Force static generation at build time
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour in production

export default async function ScreensPage() {
  const screens = await getScreens();

  return (
    <section className="h-screen overflow-hidden flex flex-col">
      <Screens screens={screens} />
    </section>
  );
}
