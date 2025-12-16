"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import VideoSidebar from "./VideoSidebar";
import VideoDisplay from "./VideoDisplay";

export default function Screens({ screens = [] }) {
  const [videoList, setVideoList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [isPhoneOnly, setIsPhoneOnly] = useState(false);
  const containerRef = useRef();
  const videoTimestamps = useRef({});
  const wheelTimeout = useRef(null);
  const isTransitioning = useRef(false);

  // Memoize original video list
  const originalVideoList = useMemo(() => screens.length > 0 ? screens : [], [screens]);

  // Shuffle videos on mount
  useEffect(() => {
    if (originalVideoList.length === 0) {
      setVideoList([]);
      return;
    }

    const shuffled = [...originalVideoList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setVideoList(shuffled);
  }, [originalVideoList]);

  // Check device size
  useEffect(() => {
    const checkSize = () => {
      setIsTabletOrMobile(window.innerWidth < 1024);
      setIsPhoneOnly(window.innerWidth < 640);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Simple, smooth wheel handling with debouncing
  useEffect(() => {
    if (videoList.length === 0 || isTabletOrMobile) return;

    const handleWheel = (e) => {
      e.preventDefault();
      
      // Prevent rapid scrolling during transitions
      if (isTransitioning.current) return;

      // Threshold for triggering a change (small enough to be responsive)
      if (Math.abs(e.deltaY) > 15) {
        isTransitioning.current = true;
        
        if (e.deltaY > 0) {
          setActiveIndex((prev) => prev + 1);
        } else {
          setActiveIndex((prev) => prev - 1);
        }

        // Lock transitions for 800ms to prevent skipping multiple videos during one scroll
        // This handles trackpad inertia gracefully
        setTimeout(() => {
          isTransitioning.current = false;
        }, 800);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }
    };
  }, [videoList.length, isTabletOrMobile]);

  // Handle saving video playback time
  const handleVideoTimeUpdate = (videoId, currentTime) => {
    videoTimestamps.current[videoId] = currentTime;
  };

  // Get saved timestamp for current video
  const getSavedTimestamp = (videoId) => {
    return videoTimestamps.current[videoId] || 0;
  };

  if (videoList.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No screens available yet. Add some screens in Sanity Studio.</p>
      </div>
    );
  }

  // Get actual video using modulo for display
  const actualVideoIndex = ((activeIndex % videoList.length) + videoList.length) % videoList.length;
  const currentVideo = videoList[actualVideoIndex];
  const savedTimestamp = currentVideo ? getSavedTimestamp(currentVideo._id) : 0;

  return (
    <div className="w-full h-full overflow-hidden flex flex-col lg:flex-row">
      {/* Desktop: Fixed left sidebar */}
      <div className="hidden lg:block fixed top-1/2 left-7 -translate-y-1/2 z-10">
        <VideoSidebar
          videos={videoList}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isMobile={false}
        />
      </div>

      {/* Desktop: Main content area with simple fade transition */}
      <div
        ref={containerRef}
        className="hidden lg:flex overflow-hidden px-7 md:px-20 lg:px-56 items-start lg:pt-3 w-full"
      >
        <div className="flex-1 overflow-hidden w-full h-full">
          <VideoDisplay
            key={actualVideoIndex}
            video={videoList[actualVideoIndex]}
            isMobile={false}
            savedTimestamp={savedTimestamp}
            onTimeUpdate={handleVideoTimeUpdate}
          />
        </div>
      </div>

      {/* Mobile/Tablet: Full screen layout */}
      <div className="lg:hidden w-full h-full flex flex-col overflow-hidden">
        <div
          ref={containerRef}
          className="flex-shrink-0 w-full overflow-hidden px-7 md:px-20 lg:px-56 pt-4"
          style={{ height: 'auto' }}
        >
          <div className="w-full">
            <VideoDisplay
              video={videoList[actualVideoIndex]}
              isMobile={isPhoneOnly}
              savedTimestamp={savedTimestamp}
              onTimeUpdate={handleVideoTimeUpdate}
            />
          </div>
        </div>

        <div className="w-full flex-1 px-4 py-4 border-t border-gray-200 overflow-hidden flex">
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