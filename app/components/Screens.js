"use client";

import { useState, useRef, useEffect } from "react";
import VideoSidebar from "./VideoSidebar";
import VideoDisplay from "./VideoDisplay";

export default function Screens({ screens = [] }) {
  const videoList = screens.length > 0 ? screens : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const displayRef = useRef();
  const containerRef = useRef();
  const scrollAccumulator = useRef(0);
  const scrollThreshold = 50; // Pixels to scroll before changing video - lower for smoother feel

  // Handle continuous smooth scroll to navigate through videos (infinite loop)
  useEffect(() => {
    if (videoList.length === 0) return;

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

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [videoList.length]);

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
    <div>
      <div className="fixed top-1/2 left-7 -translate-y-1/2 z-10">
        <VideoSidebar
          videos={videoList}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div
        ref={containerRef}
        className="flex flex-1 overflow-hidden px-10 md:px-20 lg:px-56 items-start"
      >
        <div className="flex-1 pt-16 overflow-hidden" ref={displayRef}>
          <VideoDisplay video={videoList[actualVideoIndex]} />
        </div>
      </div>
    </div>
  );
}
