"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function VideoSidebar({ videos, activeIndex, setActiveIndex }) {
  const sidebarRef = useRef();
  const itemRefs = useRef([]);
  const isScrollingRef = useRef(false);

  // Create extended array for infinite scroll effect (reduced for performance)
  const repetitions = 5; // Enough repetitions for smooth infinite effect with lazy loading
  const extendedVideos = Array(repetitions)
    .fill(videos)
    .flat();

  // Calculate the actual index in the extended array
  const middleStart = Math.floor(repetitions / 2) * videos.length;
  const actualIndex = ((activeIndex % videos.length) + videos.length) % videos.length;
  const displayIndex = middleStart + actualIndex;

  // Auto-scroll to active video in sidebar with infinite loop effect
  useEffect(() => {
    if (itemRefs.current[displayIndex] && sidebarRef.current && !isScrollingRef.current) {
      const activeItem = itemRefs.current[displayIndex];
      const sidebar = sidebarRef.current;

      const itemTop = activeItem.offsetTop;
      const itemHeight = activeItem.offsetHeight;
      const sidebarHeight = sidebar.offsetHeight;
      const scrollPosition = itemTop - sidebarHeight / 2 + itemHeight / 2;

      isScrollingRef.current = true;
      gsap.to(sidebar, {
        scrollTop: scrollPosition,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          isScrollingRef.current = false;
        }
      });
    }
  }, [displayIndex]);

  return (
    <>
      <div
        ref={sidebarRef}
        className="flex flex-col gap-4 max-h-[450px] overflow-y-auto w-auto pr-4 scrollbar-hide"
      >
        {extendedVideos.map((vid, idx) => {
          // Determine which video to show based on available content
          const videoSrc = vid.desktopVideo || vid.mobileVideo;
          const originalIndex = idx % videos.length;
          const isActive = displayIndex === idx;

          // Only load videos near the active index for performance
          const distanceFromActive = Math.abs(idx - displayIndex);
          const shouldLoadVideo = distanceFromActive <= 5; // Load 5 videos before and after

          return (
            <div
              key={`${vid._id}-${idx}`}
              ref={(el) => (itemRefs.current[idx] = el)}
              className={`aspect-video w-40 bg-gray-300 rounded transition-all border-2 cursor-pointer flex-shrink-0 overflow-hidden relative
                ${
                  isActive
                    ? " border-4 border-[#ededed] scale-95"
                    : "border-transparent opacity-60"
                }`}
              onClick={() => setActiveIndex(originalIndex)}
            >
              {shouldLoadVideo && videoSrc ? (
                <video
                  src={videoSrc}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="none"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                  {vid.name || "No preview"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </>
  );
}
