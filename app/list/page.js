import PageConfig from "../components/PageConfig";
import List from "../components/List";

export const metadata = {
  title: "List | Ayotomcs",
  description: "A list of things I want to do.",
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
