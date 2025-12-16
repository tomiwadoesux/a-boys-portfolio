import { notFound } from "next/navigation";
import Link from "next/link";
import InfoSection from "../../components/InfoSection";
import ProjectNavigation from "../../components/ProjectNavigation";
import { getProjects } from "@/sanity/lib/fetch";

// Revalidate every hour
export const revalidate = 0;

// Generate static params only for projects with detail pages enabled
export async function generateStaticParams() {
  const projects = await getProjects();
  // Only generate routes for projects that have showDetailPage enabled
  return projects
    .map((project, index) => ({
      project,
      index: index + 1, // 1-based index
    }))
    .filter(({ project }) => project.showDetailPage)
    .map(({ index }) => ({
      id: String(index),
    }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const allProjects = await getProjects();
  const currentIndex = parseInt(resolvedParams.id, 10) - 1;
  const project = allProjects[currentIndex];

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.description} | Project`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const allProjects = await getProjects();
  const currentIndex = parseInt(resolvedParams.id, 10) - 1;

  console.log(
    `[ProjectPage] ID: ${resolvedParams.id}, Index: ${currentIndex}, Total Projects: ${allProjects.length}`
  );

  if (currentIndex < 0 || currentIndex >= allProjects.length) {
    console.log("[ProjectPage] Index out of bounds");
    // notFound()
    return (
      <div className="p-10 text-red-500">
        <h1>Error: Index out of bounds</h1>
        <p>ID: {resolvedParams.id}</p>
        <p>Current Index: {currentIndex}</p>
        <p>Total Projects: {allProjects.length}</p>
      </div>
    );
  }

  const currentProject = allProjects[currentIndex];

  if (!currentProject) {
    console.log("[ProjectPage] Project is undefined");
    // notFound()
    return (
      <div className="p-10 text-red-500">
        <h1>Error: Project is undefined</h1>
        <p>Index: {currentIndex}</p>
      </div>
    );
  }

  console.log(
    `[ProjectPage] Found Project: ${currentProject.title}, ShowDetail: ${currentProject.showDetailPage}`
  );

  if (!currentProject.showDetailPage) {
    console.log("[ProjectPage] showDetailPage is false");
    // notFound()
    return (
      <div className="p-10 text-red-500">
        <h1>Error: showDetailPage is false</h1>
        <p>Project: {currentProject.title}</p>
        <p>ID: {resolvedParams.id}</p>
        <p>This project is hidden from detail view.</p>
      </div>
    );
  }

  // Find previous project with showDetailPage enabled
  let prevIndex = null;
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (allProjects[i].showDetailPage) {
      prevIndex = i + 1; // Convert to 1-based
      break;
    }
  }

  // Find next project with showDetailPage enabled
  let nextIndex = null;
  for (let i = currentIndex + 1; i < allProjects.length; i++) {
    if (allProjects[i].showDetailPage) {
      nextIndex = i + 1; // Convert to 1-based
      break;
    }
  }

  return (
    <>
      {/* Preload next and previous project pages */}
      {prevIndex !== null && (
        <Link href={`/project/${prevIndex}`} rel="prefetch" as="fetch" />
      )}
      {nextIndex !== null && (
        <Link href={`/project/${nextIndex}`} rel="prefetch" as="fetch" />
      )}

      <section className="px-7 pt-8 md:pt-11 md:px-20 lg:px-56">
        {/* <Logo /> */}
        <h1 className="pt-2 text-lg md:text-2xl">
          {currentProject.description}
        </h1>

        {/* Role section */}
        <div className="flex pt-7 flex-row">
          <div className="flex flex-row flex-1 gap-2">
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.27215 3.23033C5.40615 3.23033 4.70412 2.50719 4.70412 1.61516C4.70412 0.723133 5.40615 0 6.27215 0C7.13816 0 7.84019 0.723133 7.84019 1.61516C7.84019 2.50719 7.13816 3.23033 6.27215 3.23033Z"
                fill="black"
              />
              <path
                d="M0.784019 3.77441H11.7603C12.1933 3.77441 12.5443 4.13598 12.5443 4.582C12.5443 5.02802 12.1933 5.38958 11.7603 5.38958H8.54413C8.36188 5.42323 8.11302 5.51869 7.98173 5.86915C7.82979 6.27482 7.90431 6.99996 7.99934 7.60972L8.12266 8.32965L8.12455 8.34011L8.12468 8.34078L9.11696 14.1375C9.19219 14.5767 8.90743 14.9955 8.48102 15.073C8.05455 15.1504 7.65346 14.8571 7.57829 14.4178L6.89283 10.3814V10.387C6.89283 10.387 6.68866 9.29289 6.29005 9.29289H6.25424C5.84747 9.29289 5.65146 10.387 5.65146 10.387V10.3842L4.966 14.4192C4.89084 14.8585 4.487 15.151 4.06053 15.0736C3.63412 14.9961 3.35073 14.5769 3.42596 14.1377L4.41892 8.34072C4.41899 8.34045 4.41935 8.34004 4.41941 8.33981C4.42003 8.33631 4.42085 8.33251 4.42147 8.32897L4.54486 7.60841C4.63989 6.99865 4.71443 6.27486 4.56253 5.86915C4.43121 5.51872 4.18241 5.42323 4.00016 5.38958H0.784019C0.351012 5.38958 4.76837e-07 5.02802 4.76837e-07 4.582C4.76837e-07 4.13598 0.351012 3.77441 0.784019 3.77441Z"
                fill="black"
              />
            </svg>

            <h2 className="text-xs pb-3">
              <span className="text-[#000]">Role</span>
            </h2>
          </div>

          <div className="flex flex-1 flex-row">
            <p className="text-xs">{currentProject.role}</p>
          </div>
        </div>

        <svg
          className="w-full h-px"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        {/* Tools section */}
        <div className="flex pt-4 flex-row">
          <div className="flex flex-row flex-1 gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.42 1.47C12.88 1.01 13.63 1.01 14.09 1.47L14.53 1.91C14.99 2.37 14.99 3.12 14.53 3.58L10.12 7.99L8.01 5.88L12.42 1.47ZM9.41 8.7L7.3 6.59L2.06 11.83C1.53 12.36 1.47 13.17 1.88 13.78L2.21 13.79C2.82 14.2 3.64 14.13 4.17 13.6L9.41 8.7Z"
                fill="black"
              />
            </svg>

            <h2 className="text-xs pb-3">
              <span className="text-[#000]">Tools</span>
            </h2>
          </div>

          <div className="flex flex-1 flex-row">
            <p className="text-xs">{currentProject.tech}</p>
          </div>
        </div>

        <svg
          className="w-full h-px"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        {/* Visit Site section */}
        <div className="flex pt-4 flex-row">
          <div className="flex flex-row flex-1 gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 9V13H3V3H7V1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V9H13ZM15 1H11V3H13.5858L8.29289 8.29289L9.70711 9.70711L15 4.41421V7H17V1H15Z"
                fill="black"
              />
            </svg>

            <h2 className="text-xs pb-3">
              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-bold underline text-[#000]">
                  Visit Site
                </span>
              </a>
            </h2>
          </div>

          <div className="flex font-bold underline flex-1 flex-row">
            <a
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
            >
              {currentProject.link}
            </a>
          </div>
        </div>

        <svg
          className="w-full h-px"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <div className="w-full pt-9">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-medium">Live Preview</h3>
            <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Interactive: Scroll & Click
            </span>
          </div>
          <div
            className="w-full max-w-[1080px] mx-auto overflow-hidden rounded-lg border border-gray-200"
            style={{ height: "800px" }}
          >
            <iframe
              src={currentProject.link}
              className="border-none w-full"
              title={currentProject.title}
              loading="lazy"
              style={{
                transform: "scale(0.75)",
                transformOrigin: "top left",
                width: "133.33%",
                height: "133.33%",
              }}
            />
          </div>
        </div>

        {/* Info Sections */}
        {currentProject.infoSections &&
        currentProject.infoSections.length > 0 ? (
          currentProject.infoSections.map((section, index) => (
            <InfoSection key={index} section={section} index={index} />
          ))
        ) : (
          <div className="pt-4 text-gray-500">No info sections available</div>
        )}

        {/* Bottom Navigation */}
        <div className="pt-3">
          <svg
            className="w-full h-px"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        <ProjectNavigation prevIndex={prevIndex} nextIndex={nextIndex} />
      </section>
    </>
  );
}
