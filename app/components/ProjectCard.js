"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function ProjectCard({
  title,
  subtitle,
  tech,
  image,
  alt,
  link,
  showLivePreview = false,
}) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);

  const handleClick = () => {
    if (link && !showLivePreview) {
      window.open(link, "_blank");
    }
  };

  // Preload iframe after initial render
  useEffect(() => {
    if (link && !iframeLoaded) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setIframeLoaded(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [link, iframeLoaded]);

  return (
    <figure className="flex flex-col">
      <div
        className="cursor-pointer group"
        onClick={handleClick}
        onMouseEnter={() => setIsScrollable(true)}
        onMouseLeave={() => setIsScrollable(false)}
      >
        <div
          className={`bg-[#E5E5E5] border-1 border-t-0 border-black/15 rounded-t-xl overflow-hidden relative ${
            showLivePreview ? "h-[500px]" : "aspect-[16/9]"
          }`}
        >
          {/* Preloaded iframe - always in DOM but hidden when not in preview mode */}
          {link && iframeLoaded && (
            <div
              className={`w-full h-full absolute inset-0 transition-opacity duration-300 ${
                showLivePreview
                  ? "opacity-100 z-10"
                  : "opacity-0 -z-10 pointer-events-none"
              }`}
            >
              <iframe
                ref={iframeRef}
                src={link}
                className={`border-none w-full h-full ${
                  isScrollable && showLivePreview ? "pointer-events-auto" : "pointer-events-none"
                }`}
                title={title}
                scrolling="no"
                style={{
                  transform: "scale(0.5)",
                  transformOrigin: "top left",
                  width: "200%",
                  height: "200%",
                  overflow: "hidden"
                }}
              />
            </div>
          )}

          {/* Image layer */}
          {image ? (
            <Image
              src={image}
              alt={alt || title}
              fill
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                showLivePreview ? "opacity-0" : "opacity-100"
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-sm">Project Image</span>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="flex border-1 border-black/15 border-t-0 py-2 bg-[#F7F7F7] px-3 justify-between items-center">
          <div className="flex items-center gap-2">
            <h4 className="text-xs underline underline-offset-2">{title}</h4>
            <h4 className="text-[11px] opacity-50">| {subtitle}</h4>
          </div>
          <h4 className="text-[11px]">
            {tech}
          </h4>
        </div>
      </div>
    </figure>
  );
}
