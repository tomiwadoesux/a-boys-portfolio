"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  projects = [],
  filter = "all",
}) {
  const [showLivePreview, setShowLivePreview] = useState(false);

  return (
    <section className="pt-14">
      <div className="  px-10 md:px-20 lg:px-56 flex flex-row justify-between ">
        <h4 className="text-[11px] text-[#4447A9] ">
          {filter === "featured" ? "Selected Projects.." : "All Projects.."}
        </h4>
        <div className="mb-6  flex justify-end items-center gap-2">
          <span className="text-[11px] text-gray-600">Live Preview</span>
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${
              showLivePreview ? "bg-[#4447A9]" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={showLivePreview}
            aria-label="Toggle live preview"
          >
            <span
              className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                showLivePreview ? "translate-x-[18px]" : "translate-x-[5px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Featured (Landing Page): Horizontal Scroll */}
      {filter === "featured" ? (
        <>
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scroll-smooth scrollbar-hide">
            <div className="flex gap-4 pb-4 px-10">
              {projects.map((project) => (
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
                    showLivePreview={showLivePreview}
                    isMobile={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet: Horizontal Scroll with Desktop Images */}
          <div className="hidden md:block lg:hidden overflow-x-auto scroll-smooth scrollbar-hide">
            <div className="flex gap-6 pb-4 px-20">
              {projects.map((project) => (
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
                    showLivePreview={showLivePreview}
                    isMobile={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 2-Column Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 md:gap-12 px-10 md:px-20 lg:px-56">
            {projects.map((project) => (
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
                showLivePreview={showLivePreview}
                isMobile={false}
              />
            ))}
          </div>
        </>
      ) : (
        /* Projects Page: Normal Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 px-10 md:px-20 lg:px-56">
          {projects.map((project) => (
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
              showLivePreview={showLivePreview}
              isMobile={false}
            />
          ))}
        </div>
      )}
      {filter === "featured" && (
        <Link href="/projects/">
          <h4 className="text-[11px] text-right px-10 md:px-20 lg:px-56 underline underline-offset-2 pt-3 text-[#4447A9] hover:opacity-70 transition-opacity cursor-pointer">See All Projects </h4>
        </Link>
      )}
    </section>
  );
}
