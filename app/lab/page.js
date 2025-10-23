import PageConfig from "../components/PageConfig";
import LabCards from "../components/LabCards";
import { getLabCards } from "../../sanity/lib/fetch";

export const metadata = {
  title: "Lab | Design Engineer Portfolio",
  description: "Experimental projects and creative explorations.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function page() {
  const cards = await getLabCards();

  // Only render if there are cards, otherwise return empty
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div>
      <PageConfig
        activePage="/lab"
        description={
          <>
            Everything you can imagine is real..{" "}
            <span className="text-[#4447A9]"> Lab :0</span>
          </>
        }
      />
      <LabCards cards={cards} />
    </div>
  );
}
