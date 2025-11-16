import { notFound } from 'next/navigation'
import Link from 'next/link'
import InfoSection from '../../components/InfoSection'
import ProjectNavigation from '../../components/ProjectNavigation'
import { getProjects } from '@/sanity/lib/fetch'

// Revalidate every hour
export const revalidate = 3600

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((_, index) => ({
    id: String(index + 1),
  }))
}

export async function generateMetadata({ params }) {
  const allProjects = await getProjects()
  const currentIndex = parseInt(params.id, 10) - 1
  const project = allProjects[currentIndex]

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.description} | Project`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }) {
  const allProjects = await getProjects()
  const currentIndex = parseInt(params.id, 10) - 1

  if (currentIndex < 0 || currentIndex >= allProjects.length) {
    notFound()
  }

  const currentProject = allProjects[currentIndex]

  if (!currentProject || !currentProject.showDetailPage) {
    notFound()
  }

  // Find previous project with showDetailPage enabled
  let prevIndex = null
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (allProjects[i].showDetailPage) {
      prevIndex = i + 1 // Convert to 1-based
      break
    }
  }

  // Find next project with showDetailPage enabled
  let nextIndex = null
  for (let i = currentIndex + 1; i < allProjects.length; i++) {
    if (allProjects[i].showDetailPage) {
      nextIndex = i + 1 // Convert to 1-based
      break
    }
  }

  return (
    <>
      {/* Preload next and previous project pages */}
      {prevIndex !== null && <Link href={`/project/${prevIndex}`} rel="prefetch" as="fetch" />}
      {nextIndex !== null && <Link href={`/project/${nextIndex}`} rel="prefetch" as="fetch" />}

      <section className="px-7 pt-8 md:pt-11 md:px-20 lg:px-56">
        {/* <Logo /> */}
        <h1 className="pt-2 text-2xl">{currentProject.description}</h1>

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
            <g clipPath="url(#clip0_314_57)">
              <path
                d="M2.50846 5.51213C3.25486 4.93213 3.87406 5.33213 4.70046 6.28893C4.79326 6.39693 4.91806 6.27053 4.98926 6.20893C5.05966 6.14653 6.15006 5.16493 6.20366 5.12013C6.25646 5.07293 6.32046 4.98493 6.23646 4.88653C6.03412 4.63625 5.83596 4.38261 5.64206 4.12573C4.19566 2.23373 9.59887 0.950531 8.76927 0.930531C8.34687 0.919331 6.65246 0.899331 6.39886 0.927331C5.37246 1.03533 4.08366 1.99453 3.43486 2.44173C2.58606 3.02253 2.26926 3.36333 2.21726 3.41053C1.97726 3.62013 2.17886 4.10413 1.74366 4.48573C1.28366 4.88813 0.996465 4.58333 0.730065 4.81693C0.598065 4.93373 0.228465 5.21053 0.122865 5.30253C0.0164648 5.39613 -0.00273523 5.55373 0.106065 5.67933C0.106065 5.67933 1.11726 6.79613 1.20206 6.89533C1.28606 6.99293 1.51486 7.07773 1.65566 6.95213C1.79726 6.82733 2.16126 6.50973 2.22206 6.45373C2.28446 6.40093 2.18206 5.76493 2.50846 5.51213ZM7.07487 5.92573C6.97887 5.81453 6.85966 5.81133 6.75726 5.90253L5.61006 6.90413C5.56578 6.94432 5.53878 7.00011 5.53476 7.05978C5.53073 7.11945 5.54998 7.17835 5.58846 7.22413L12.2237 14.7753C12.3789 14.9537 12.6477 14.9721 12.8245 14.8177L13.6005 14.1673C13.6859 14.0921 13.7382 13.9862 13.746 13.8727C13.7537 13.7591 13.7164 13.6471 13.6421 13.5609L7.07487 5.92573ZM15.9221 2.71213C15.8629 2.31693 15.6581 2.39933 15.5517 2.56653C15.4453 2.73533 14.9749 3.44813 14.7813 3.77133C14.5893 4.09133 14.1157 4.72413 13.2341 4.09933C12.3157 3.45053 12.6349 2.99773 12.7949 2.69293C12.9557 2.38653 13.4493 1.52733 13.5205 1.42093C13.5917 1.31293 13.5085 0.999331 13.2237 1.13053C12.9381 1.26173 11.2053 1.95053 10.9653 2.93853C10.7197 3.94333 11.1709 4.84173 10.2853 5.73373L9.21086 6.85373L10.2901 8.10653L11.6133 6.85053C11.9285 6.53373 12.6021 6.22573 13.2117 6.36493C14.5181 6.66013 15.2309 6.16973 15.6605 5.35853C16.0461 4.63373 15.9821 3.10733 15.9221 2.71213ZM2.19166 13.6425C2.11164 13.7232 2.06674 13.8321 2.06674 13.9457C2.06674 14.0593 2.11164 14.1683 2.19166 14.2489L2.95246 14.9929C3.11886 15.1601 3.38286 15.0897 3.54926 14.9225L7.47487 11.0633L6.27246 9.69213L2.19166 13.6425Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_314_57">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
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
              d="M8.0729 10.2604L5.48623 12.8471C5.17306 13.1493 4.7548 13.3182 4.31957 13.3182C3.88433 13.3182 3.46607 13.1493 3.1529 12.8471C2.9993 12.6941 2.87743 12.5123 2.79427 12.312C2.71111 12.1118 2.6683 11.8972 2.6683 11.6804C2.6683 11.4636 2.71111 11.2489 2.79427 11.0487C2.87743 10.8485 2.9993 10.6667 3.1529 10.5137L5.73957 7.92706C5.8651 7.80152 5.93563 7.63126 5.93563 7.45372C5.93563 7.27619 5.8651 7.10592 5.73957 6.98039C5.61403 6.85485 5.44377 6.78433 5.26623 6.78433C5.0887 6.78433 4.91843 6.85485 4.7929 6.98039L2.20623 9.57372C1.68514 10.1409 1.40331 10.8875 1.41962 11.6576C1.43592 12.4276 1.74909 13.1616 2.29372 13.7062C2.83835 14.2509 3.57234 14.564 4.3424 14.5803C5.11245 14.5966 5.85904 14.3148 6.42623 13.7937L9.01957 11.2071C9.1451 11.0815 9.21563 10.9113 9.21563 10.7337C9.21563 10.5562 9.1451 10.3859 9.01957 10.2604C8.89403 10.1349 8.72377 10.0643 8.54623 10.0643C8.3687 10.0643 8.19843 10.1349 8.0729 10.2604ZM13.7929 2.20706C13.2321 1.64973 12.4735 1.33691 11.6829 1.33691C10.8922 1.33691 10.1337 1.64973 9.5729 2.20706L6.97957 4.79372C6.91741 4.85588 6.8681 4.92967 6.83446 5.01089C6.80082 5.0921 6.7835 5.17915 6.7835 5.26706C6.7835 5.35496 6.80082 5.44201 6.83446 5.52322C6.8681 5.60444 6.91741 5.67823 6.97957 5.74039C7.04173 5.80255 7.11552 5.85185 7.19673 5.8855C7.27795 5.91914 7.36499 5.93645 7.4529 5.93645C7.54081 5.93645 7.62785 5.91914 7.70907 5.8855C7.79028 5.85185 7.86407 5.80255 7.92623 5.74039L10.5129 3.15372C10.8261 2.85147 11.2443 2.68256 11.6796 2.68256C12.1148 2.68256 12.5331 2.85147 12.8462 3.15372C12.9998 3.30671 13.1217 3.48853 13.2049 3.68873C13.288 3.88894 13.3308 4.1036 13.3308 4.32039C13.3308 4.53718 13.288 4.75184 13.2049 4.95204C13.1217 5.15225 12.9998 5.33406 12.8462 5.48705L10.2596 8.07372C10.1971 8.1357 10.1475 8.20943 10.1136 8.29067C10.0798 8.37191 10.0624 8.45905 10.0624 8.54706C10.0624 8.63506 10.0798 8.7222 10.1136 8.80344C10.1475 8.88468 10.1971 8.95841 10.2596 9.02039C10.3215 9.08287 10.3953 9.13247 10.4765 9.16632C10.5578 9.20016 10.6449 9.21759 10.7329 9.21759C10.8209 9.21759 10.908 9.20016 10.9893 9.16632C11.0705 9.13247 11.1443 9.08287 11.2062 9.02039L13.7929 6.42706C14.3502 5.86624 14.663 5.1077 14.663 4.31706C14.663 3.52641 14.3502 2.76787 13.7929 2.20706ZM5.88623 10.1137C5.94853 10.1755 6.0224 10.2244 6.10363 10.2576C6.18485 10.2907 6.27183 10.3076 6.35957 10.3071C6.4473 10.3076 6.53428 10.2907 6.6155 10.2576C6.69673 10.2244 6.77061 10.1755 6.8329 10.1137L10.1129 6.83372C10.2384 6.70819 10.309 6.53792 10.309 6.36039C10.309 6.18285 10.2384 6.01259 10.1129 5.88706C9.98736 5.76152 9.8171 5.69099 9.63957 5.69099C9.46203 5.69099 9.29177 5.76152 9.16623 5.88706L5.88623 9.16706C5.82375 9.22903 5.77415 9.30276 5.7403 9.384C5.70646 9.46524 5.68903 9.55238 5.68903 9.64039C5.68903 9.7284 5.70646 9.81553 5.7403 9.89677C5.77415 9.97801 5.82375 10.0517 5.88623 10.1137Z"
              fill="black"
            />
          </svg>

          <h2 className="text-xs pb-3">
            <span className="text-[#000]">Visit Site</span>
          </h2>
        </div>

        <div className="flex flex-1 flex-row">
          <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline">
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
        <div className="w-full overflow-hidden rounded-lg border border-gray-200" style={{ height: '600px' }}>
          <iframe
            src={currentProject.link}
            className="border-none w-full"
            title={currentProject.title}
            loading="lazy"
            style={{
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              width: '200%',
              height: '200%',
            }}
          />
        </div>
      </div>

      {/* Info Sections */}
      {currentProject.infoSections && currentProject.infoSections.length > 0 ? (
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
  )
}
