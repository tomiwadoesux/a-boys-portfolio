import PageConfig from "../components/PageConfig";
import List from "../components/List";

export const metadata = {
  title: "Curated Resources & Developer Recommendations",
  description: "List of things I want ",
  keywords: ["Curated List", "Bucket List", "List 100"],
  openGraph: {
    title: "List | Ayotomcs",
    description: "List of things I want ",
    url: "https://ayotomcs.me/list",
    images: ["/opengraph.png"],
  },
};
// Dynamic rendering for randomization on each visit
export const revalidate = 0;

export default function page() {
  return (
    <section>
      <PageConfig
        activePage="/list"
        description={
          <>
           A list of things I want to do.. {" "}
            <span className="text-[#4447A9]"> List∞</span>
          </>
        }
      />
      <List/>
    </section>

  );
}
