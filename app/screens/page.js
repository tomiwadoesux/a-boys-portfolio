import BodyScreens from "../components/BodyScreens";
import Screens from "../components/Screens";

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default function ScreensPage() {
  return (
    <section className="h-screen overflow-hidden flex flex-col">
      <BodyScreens
        description={
          <>
            Everything you can imagine is real..{" "}
            <span className="text-[#027864]"> Playground :0</span>
          </>
        }
      />
      <Screens />
    </section>
  );
}
