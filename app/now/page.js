import PageConfig from "../components/PageConfig";
import Now from "../components/Now";

// Metadata for SEO
export const metadata = {
  title: "Now | Ayotomcs",
  description: "What I'm up to. The future is present.",
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
