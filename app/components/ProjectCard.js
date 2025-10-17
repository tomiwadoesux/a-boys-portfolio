"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function ProjectCard({
  title,
  subtitle,
  tech,
  desktopImage,
  mobileImage,
  desktopVideo,
  mobileVideo,
  alt,
  link,
  showLivePreview = false,
  isMobile = false,
}) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Use mobile or desktop image/video based on isMobile prop
  const currentImage = isMobile ? mobileImage : desktopImage;
  const currentVideo = isMobile ? mobileVideo : desktopVideo;

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
            isMobile ? (showLivePreview ? "h-[500px]" : "aspect-[9/16]") : (showLivePreview ? "h-[500px]" : "aspect-[16/9]")
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
                style={
                  isMobile
                    ? {
                        transform: "scale(0.33)",
                        transformOrigin: "top left",
                        width: "300%",
                        height: "300%",
                        overflow: "hidden"
                      }
                    : {
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                        width: "200%",
                        height: "200%",
                        overflow: "hidden"
                      }
                }
              />
            </div>
          )}

          {/* Video layer - shows if video exists and no live preview */}
          {currentVideo && !showLivePreview ? (
            <video
              src={currentVideo}
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                showLivePreview ? "opacity-0" : "opacity-100"
              }`}
            />
          ) : currentImage ? (
            <Image
              src={currentImage}
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
