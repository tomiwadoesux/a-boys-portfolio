"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects: allProjects = [], filter = "all" }) {
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Filter projects based on the filter prop
  const projects =
    filter === "featured"
      ? allProjects.filter((project) => project.featured)
      : allProjects;

  return (
    <section className="pt-16">
      <div className=""></div>
      <div className="mb-6  px-16 lg:px-56 flex justify-end">
        <button
          onClick={() => setShowLivePreview(!showLivePreview)}
          className={`px-4 py-2 text-xs border border-black/15 rounded-lg transition-colors ${
            showLivePreview
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {showLivePreview ? "Hide Live Preview" : "Show Live Preview"}
        </button>
      </div>
      <div className="  px-16 lg:px-56 flex flex-row justify-between ">
        <h4 className="text-[11px] text-[#4447A9] "> Selected Projects.. </h4>
        <h4 className="text-[11px] "> [ See All Projects ] </h4>
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden px-16 overflow-x-auto   scrollbar-hide">
        <div className="flex gap-4 pb-4">
          {projects.map((project) => (
            <div key={project.id} className="min-w-[280px] flex-shrink-0">
              <ProjectCard
                title={project.title}
                subtitle={project.subtitle}
                tech={project.tech}
                desktopImage={project.desktopImage}
                mobileImage={project.mobileImage}
                desktopVideo={project.desktopVideo}
                mobileVideo={project.mobileVideo}
                alt={project.alt}
                link={project.link}
                showLivePreview={showLivePreview}
                isMobile={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: 2-Column Grid */}
      <div className="hidden md:grid lg:grid-cols-2 gap-8  md:gap-12 px-16 lg:px-56">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            subtitle={project.subtitle}
            tech={project.tech}
            desktopImage={project.desktopImage}
            mobileImage={project.mobileImage}
            desktopVideo={project.desktopVideo}
            mobileVideo={project.mobileVideo}
            alt={project.alt}
            link={project.link}
            showLivePreview={showLivePreview}
            isMobile={false}
          />
        ))}
      </div>
    </section>
  );
}
