"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { useLivePreviewScroll } from "../hooks/useLivePreviewScroll";

export default function ProjectGrid({
  projects = [],
  filter = "all",
}) {
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Use hook to manage scroll behavior
  useLivePreviewScroll(showLivePreview);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLivePreview(prev => !prev);
  };

  return (
    <section className="pt-16">
      <div className="px-7 pb-3 md:px-20 lg:px-56 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
        <h4 className="text-[11px] text-[#4447A9] ">
          {filter === "featured" ? "Selected Projects.." : "All Projects.."}
        </h4>
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${
            showLivePreview ? "bg-[#4447A9]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
              showLivePreview ? "translate-x-[22px]" : "translate-x-[6px]"
            }`}
          />
        </button>
      </div>

      {/* Featured (Landing Page): Horizontal Scroll */}
      {filter === "featured" ? (
        <>
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scroll-smooth scrollbar-hide">
            <div className="flex gap-4 pb-4 px-7">
              {projects.map((project, index) => (
                <div key={project._id} className="min-w-[250px] flex-shrink-0">
                  <ProjectCard
                    title={project.title}
                    tech={project.tech}
                    desktopImage={project.desktopImage}
                    mobileImage={project.mobileImage}
                    desktopVideo={project.desktopVideo}
                    mobileVideo={project.mobileVideo}
                    alt={project.alt}
                    link={project.link}
                    projectId={project._id}
                    projectIndex={project._actualIndex !== undefined ? project._actualIndex : index}
                    showLivePreview={showLivePreview}
                    isMobile={true}
                    showDetailPage={project.showDetailPage}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet: Horizontal Scroll with Desktop Images */}
          <div className="hidden md:block lg:hidden overflow-x-auto scroll-smooth scrollbar-hide">
            <div className="flex gap-6 pb-4 px-20">
              {projects.map((project, index) => (
                <div key={project._id} className="min-w-[470px] flex-shrink-0">
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
                    projectId={project._id}
                    projectIndex={project._actualIndex !== undefined ? project._actualIndex : index}
                    showLivePreview={showLivePreview}
                    isMobile={false}
                    showDetailPage={project.showDetailPage}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 2-Column Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 md:gap-12 px-7 md:px-20 lg:px-56">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                subtitle={project.subtitle}
                tech={project.tech}
                desktopImage={project.desktopImage}
                mobileImage={project.mobileImage}
                desktopVideo={project.desktopVideo}
                mobileVideo={project.mobileVideo}
                alt={project.alt}
                link={project.link}
                projectId={project._id}
                projectIndex={project._actualIndex !== undefined ? project._actualIndex : index}
                showLivePreview={showLivePreview}
                isMobile={false}
                showDetailPage={project.showDetailPage}
              />
            ))}
          </div>
        </>
      ) : (
        /* Projects Page: Normal Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 px-7 md:px-20 lg:px-56">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              subtitle={project.subtitle}
              tech={project.tech}
              desktopImage={project.desktopImage}
              mobileImage={project.mobileImage}
              desktopVideo={project.desktopVideo}
              mobileVideo={project.mobileVideo}
              alt={project.alt}
              link={project.link}
              projectId={project._id}
              projectIndex={project._actualIndex !== undefined ? project._actualIndex : index}
              showLivePreview={showLivePreview}
              isMobile={false}
              showDetailPage={project.showDetailPage}
            />
          ))}
        </div>
      )}
      {filter === "featured" && (
        <Link href="/projects/">
          <h4 className="text-[11px] text-right px-7 md:px-20 lg:px-56 underline underline-offset-2 pt-3 text-[#4447A9] hover:opacity-70 transition-opacity cursor-pointer">See All Projects </h4>
        </Link>
      )}
    </section>
  );
}
