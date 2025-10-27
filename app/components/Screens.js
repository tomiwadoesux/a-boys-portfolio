"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import VideoSidebar from "./VideoSidebar";
import VideoDisplay from "./VideoDisplay";
import { getCachedVideoUrl } from "../utils/videoCache";

export default function Screens({ screens = [] }) {
  const [videoList, setVideoList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [isPhoneOnly, setIsPhoneOnly] = useState(false);
  const displayRef = useRef();
  const containerRef = useRef();
  const scrollAccumulator = useRef(0);
  const scrollThreshold = 50; // Pixels to scroll before changing video - lower for smoother feel
  const videoTimestamps = useRef({}); // Store playback timestamps for each video

  // Memoize original video list
  const originalVideoList = useMemo(() => screens.length > 0 ? screens : [], [screens]);

  // Shuffle videos on mount
  useEffect(() => {
    if (originalVideoList.length === 0) {
      setVideoList([]);
      return;
    }

    // Fisher-Yates shuffle algorithm
    const shuffled = [...originalVideoList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setVideoList(shuffled);
  }, [originalVideoList]);

  // Check device size on mount and on resize
  // lg breakpoint is 1024px (tablet and up gets desktop videos)
  // sm breakpoint is 640px (phone only)
  useEffect(() => {
    const checkSize = () => {
      setIsTabletOrMobile(window.innerWidth < 1024);
      setIsPhoneOnly(window.innerWidth < 640);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Preload all videos on mount
  useEffect(() => {
    if (videoList.length === 0) return;

    videoList.forEach((video) => {
      // Preload desktop video
      if (video.desktopVideo) {
        const videoUrl = getCachedVideoUrl(video.desktopVideo, video._id, 'desktop') || video.desktopVideo;
        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.preload = 'auto';
      }

      // Preload mobile video
      if (video.mobileVideo) {
        const videoUrl = getCachedVideoUrl(video.mobileVideo, video._id, 'mobile') || video.mobileVideo;
        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.preload = 'auto';
      }
    });
  }, [videoList]);

  // Handle continuous smooth scroll to navigate through videos (desktop only)
  useEffect(() => {
    if (videoList.length === 0 || isTabletOrMobile) return;

    const handleWheel = (e) => {
      // Prevent default scroll behavior on the entire page
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

    // Attach to the scroll container to capture all scroll events on this page
    const scrollContainer = document.getElementById('main-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
      };
    }
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
      {/* Desktop (lg and up): Fixed left sidebar */}
      <div className="hidden lg:block fixed top-1/2 left-7 -translate-y-1/2 z-10">
        <VideoSidebar
          videos={videoList}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isMobile={false}
        />
      </div>

      {/* Desktop (lg and up): Main content area */}
      <div
        ref={containerRef}
        className="hidden lg:flex overflow-hidden px-7 md:px-20 lg:px-56 items-start lg:pt-3 w-full"
      >
        <div className="flex-1 overflow-hidden w-full h-full" ref={displayRef}>
          <VideoDisplay
            video={videoList[actualVideoIndex]}
            isMobile={false}
            savedTimestamp={savedTimestamp}
            onTimeUpdate={handleVideoTimeUpdate}
          />
        </div>
      </div>

      {/* Mobile/Tablet: Full screen layout with preview and carousel */}
      <div className="lg:hidden w-full h-full flex flex-col overflow-hidden">
        {/* Video Preview - Top section (60vh height) */}
        <div
          ref={containerRef}
          className="flex-shrink-0 w-full overflow-hidden px-7 md:px-20 lg:px-56 pt-4"
          style={{ height: 'auto' }}
        >
          <div className="w-full" ref={displayRef}>
            <VideoDisplay
              video={videoList[actualVideoIndex]}
              isMobile={isPhoneOnly}
              savedTimestamp={savedTimestamp}
              onTimeUpdate={handleVideoTimeUpdate}
            />
          </div>
        </div>

        {/* Horizontal Carousel - Bottom section */}
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
