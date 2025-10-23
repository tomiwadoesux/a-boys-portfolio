"use client";

import { useState, useRef, useEffect } from "react";
import VideoSidebar from "./VideoSidebar";
import VideoDisplay from "./VideoDisplay";

export default function Screens({ screens = [] }) {
  const videoList = screens.length > 0 ? screens : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const displayRef = useRef();
  const containerRef = useRef();
  const scrollAccumulator = useRef(0);
  const scrollThreshold = 50; // Pixels to scroll before changing video - lower for smoother feel

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle continuous smooth scroll to navigate through videos (desktop only)
  useEffect(() => {
    if (videoList.length === 0 || isMobile) return;

    const handleWheel = (e) => {
      e.preventDefault();

      // Accumulate scroll delta for smooth continuous scrolling
      scrollAccumulator.current += e.deltaY;

      // Check if we've scrolled enough to change video
      if (scrollAccumulator.current >= scrollThreshold) {
        // Scroll down to next video - use raw increment for infinite scroll
        setActiveIndex((prev) => prev + 1);
        scrollAccumulator.current = 0;
      } else if (scrollAccumulator.current <= -scrollThreshold) {
        // Scroll up to previous video - use raw decrement for infinite scroll
        setActiveIndex((prev) => prev - 1);
        scrollAccumulator.current = 0;
      }
    };

    // Use a ref to the container directly, re-attach each time
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [videoList.length, isMobile, setActiveIndex]);

  if (videoList.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No screens available yet. Add some screens in Sanity Studio.</p>
      </div>
    );
  }

  // Get actual video using modulo for display
  const actualVideoIndex = ((activeIndex % videoList.length) + videoList.length) % videoList.length;

  return (
    <div className="w-full h-full overflow-hidden flex flex-col md:flex-row">
      {/* Desktop: Fixed left sidebar */}
      <div className="hidden md:block fixed top-1/2 left-7 -translate-y-1/2 z-10">
        <VideoSidebar
          videos={videoList}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isMobile={false}
        />
      </div>

      {/* Desktop: Main content area */}
      <div
        ref={containerRef}
        className="hidden md:flex flex-1 overflow-hidden px-10 md:px-20 lg:px-56 items-start md:pt-3"
      >
        <div className="flex-1 overflow-hidden w-full" ref={displayRef}>
          <VideoDisplay video={videoList[actualVideoIndex]} isMobile={isMobile} />
        </div>
      </div>

      {/* Mobile/Tablet: Full screen layout with preview and carousel */}
      <div className="md:hidden w-full h-full flex flex-col overflow-hidden">
        {/* Video Preview - Top section */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden px-4 pt-4"
        >
          <div className="w-full h-full" ref={displayRef}>
            <VideoDisplay video={videoList[actualVideoIndex]} isMobile={isMobile} />
          </div>
        </div>

        {/* Horizontal Carousel - Bottom section */}
        <div className="w-full px-4 py-4 border-t border-gray-200 flex-shrink-0">
          <VideoSidebar
            videos={videoList}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
}
