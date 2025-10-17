"use client";

import { useState, useRef, useEffect } from "react";
import VideoSidebar from "./VideoSidebar";
import VideoDisplay from "./VideoDisplay";

const videoList = [
  { id: 1, title: "Video 1", src: "vid1.mp4" },
  { id: 2, title: "Video 2", src: "vid2.mp4" },
  { id: 3, title: "Video 3", src: "vid3.mp4" },
  { id: 4, title: "Video 4", src: "vid4.mp4" },
  { id: 5, title: "Video 5", src: "vid5.mp4" },
  { id: 6, title: "Video 6", src: "vid6.mp4" },
  { id: 7, title: "Video 7", src: "vid7.mp4" },
];

export default function Screens() {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayRef = useRef();
  const containerRef = useRef();
  const scrollAccumulator = useRef(0);
  const scrollThreshold = 50; // Pixels to scroll before changing video - lower for smoother feel

  // Handle continuous smooth scroll to navigate through videos (infinite loop)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      // Accumulate scroll delta for smooth continuous scrolling
      scrollAccumulator.current += e.deltaY;

      // Check if we've scrolled enough to change video
      if (scrollAccumulator.current >= scrollThreshold) {
        // Scroll down to next video (loop back to start if at end)
        setActiveIndex((prev) => (prev + 1) % videoList.length);
        scrollAccumulator.current = 0;
      } else if (scrollAccumulator.current <= -scrollThreshold) {
        // Scroll up to previous video (loop to end if at start)
        setActiveIndex((prev) => (prev - 1 + videoList.length) % videoList.length);
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
  }, [activeIndex]);

  return (
    <div>
      <div className="absolute top-0 left-7 h-full">
        <VideoSidebar
          videos={videoList}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div
        ref={containerRef}
        className="flex flex-1 overflow-hidden px-16 lg:px-56 items-start"
      >
        <div className="flex-1 pt-16 overflow-hidden" ref={displayRef}>
          <VideoDisplay video={videoList[activeIndex]} />
        </div>
      </div>
    </div>
  );
}
