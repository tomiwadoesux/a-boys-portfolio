import PageConfig from "../components/PageConfig";
import Now from "../components/Now";

// Metadata for SEO
export const metadata = {
  title: "Current Work & Developer Updates",
  description: "What I'm currently working on as a Design Engineer and Frontend Developer. Latest projects, learning updates, and professional activities.",
  keywords: ["Current Projects", "Developer Updates", "Now Page", "Work in Progress", "Learning Updates"],
  openGraph: {
    title: "Now | Wale-Durojaye Ayotomiwa",
    description: "Current work and developer updates",
    url: "https://ayotomcs.me/now",
    images: ["/opengraph.png"],
  },
};

// Revalidate every hour
export const revalidate = 3600;

export default function page() {
  return (
    <section>
      <PageConfig
        activePage="/now"
        description={
          <>
            The Future is Present.. <span className="text-[#4447A9]"> Now</span>
          </>
        }
      />
      <Now/>
    </section>
  );
}
