import Body from "./components/Body";
import Front from "./components/Front";
import ProjectGridWrapper from "./components/ProjectGridWrapper";

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <div>
      <Body
        description={
          <>
            A Design Engineer Now in{" "}
            <span className="text-[#027864]">Abuja, Nigeria</span>
          </>
        }
      />
      <Front />
      <ProjectGridWrapper />
    </div>
  );
}
