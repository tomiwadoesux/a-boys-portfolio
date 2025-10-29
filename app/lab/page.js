import PageConfig from "../components/PageConfig";
import LabCards from "../components/LabCards";
import { getLabCards } from "../../sanity/lib/fetch";

export const metadata = {
  title: "Experimental Web Design & Animation Demos",
  description: "Explore my playground for testing new technologies and design concepts.",
  keywords: ["Web Experiments", "GSAP Animations", "Design Prototypes", "Frontend Experiments", "Creative Coding", "Web Animation Lab"],
  openGraph: {
    title: "Lab | Ayotomcs",
    description: "Experimental web design and animation demos",
    url: "https://ayotomcs.me/lab",
    images: ["/opengraph.png"],
  },
};


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
