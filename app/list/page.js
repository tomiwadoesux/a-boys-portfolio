import PageConfig from "../components/PageConfig";
import List from "../components/List";

export const metadata = {
  title: "Curated Resources & Developer Recommendations",
  description: "My curated list of web development tools, design resources, and inspiration. Discover my favorite libraries, frameworks, and creative recommendations.",
  keywords: ["Developer Tools", "Design Resources", "Web Development Resources", "Curated List", "Design Inspiration", "Frontend Tools"],
  openGraph: {
    title: "List | Wale-Durojaye Ayotomiwa",
    description: "Curated resources and developer recommendations",
    url: "https://ayotomcs.me/list",
    images: ["/opengraph.png"],
  },
};
export const revalidate = 3600;

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
