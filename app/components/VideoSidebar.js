"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getCachedVideoUrl } from "../utils/videoCache";

export default function VideoSidebar({ videos, activeIndex, setActiveIndex, isMobile = false }) {
  const sidebarRef = useRef();
  const itemRefs = useRef([]);
  const isScrollingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Use carousel picker for mobile/tablet, vertical scroll for desktop
  const useCarouselPicker = isMobile;

  // Create extended array for infinite scroll effect
  const repetitions = 20;
  const extendedVideos = Array(repetitions)
    .fill(videos)
    .flat();

  const displayIndex = activeIndex;

  // iOS Picker Carousel: Smooth snapping with drag detection
  useEffect(() => {
    if (!useCarouselPicker || !sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      isDraggingRef.current = true;
      isScrollingRef.current = true;
      startX = e.clientX || e.touches?.[0]?.clientX || 0;
      startScrollLeft = sidebar.scrollLeft;
      startXRef.current = startX;
      lastXRef.current = startX;
      lastTimeRef.current = Date.now();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
      const diff = startX - currentX;

      // Update scroll position while dragging
      sidebar.scrollLeft = startScrollLeft + diff;

      // Update display index in real-time while scrolling
      updateDisplayFromScroll();
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      isDraggingRef.current = false;

      // Snap to nearest item
      snapToNearestItem();
    };

    const updateDisplayFromScroll = () => {
      const scrollLeft = sidebar.scrollLeft;
      const sidebarWidth = sidebar.offsetWidth;
      const centerX = scrollLeft + sidebarWidth / 2;

      // Find which item is closest to center
      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, idx) => {
        if (!item) return;
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - centerX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      // Update active index immediately
      const actualIndex = closestIndex % videos.length;
      setActiveIndex(actualIndex);
    };

    const snapToNearestItem = () => {
      const scrollLeft = sidebar.scrollLeft;
      const sidebarWidth = sidebar.offsetWidth;

      // Find center position of sidebar
      const centerX = scrollLeft + sidebarWidth / 2;

      // Find which item is closest to center
      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, idx) => {
        if (!item) return;
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - centerX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      // Snap to center of that item
      const targetItem = itemRefs.current[closestIndex];
      if (targetItem) {
        const targetLeft = targetItem.offsetLeft + targetItem.offsetWidth / 2 - sidebarWidth / 2;

        gsap.to(sidebar, {
          scrollLeft: targetLeft,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            isScrollingRef.current = false;
            // Update active index to the snapped item
            const actualIndex = closestIndex % videos.length;
            setActiveIndex(actualIndex);
          }
        });
      }
    };

    sidebar.addEventListener('mousedown', handleMouseDown, { passive: true });
    sidebar.addEventListener('mousemove', handleMouseMove, { passive: true });
    sidebar.addEventListener('mouseup', handleMouseUp, { passive: true });
    sidebar.addEventListener('mouseleave', handleMouseUp, { passive: true });

    // Touch events for mobile
    sidebar.addEventListener('touchstart', handleMouseDown, { passive: true });
    sidebar.addEventListener('touchmove', handleMouseMove, { passive: true });
    sidebar.addEventListener('touchend', handleMouseUp, { passive: true });

    // Scroll event for real-time display update
    sidebar.addEventListener('scroll', updateDisplayFromScroll, { passive: true });

    return () => {
      sidebar.removeEventListener('mousedown', handleMouseDown);
      sidebar.removeEventListener('mousemove', handleMouseMove);
      sidebar.removeEventListener('mouseup', handleMouseUp);
      sidebar.removeEventListener('mouseleave', handleMouseUp);
      sidebar.removeEventListener('touchstart', handleMouseDown);
      sidebar.removeEventListener('touchmove', handleMouseMove);
      sidebar.removeEventListener('touchend', handleMouseUp);
      sidebar.removeEventListener('scroll', updateDisplayFromScroll);
    };
  }, [useCarouselPicker, videos.length, setActiveIndex]);

  // Auto-scroll to active video in sidebar
  useEffect(() => {
    if (sidebarRef.current && videos.length > 0) {
      const wrappedIndex = displayIndex % extendedVideos.length;
      const activeItem = itemRefs.current[wrappedIndex];

      if (activeItem) {
        const sidebar = sidebarRef.current;

        if (useCarouselPicker) {
          // Horizontal scroll for mobile/tablet - center active item
          const itemLeft = activeItem.offsetLeft;
          const itemWidth = activeItem.offsetWidth;
          const sidebarWidth = sidebar.offsetWidth;
          const scrollPosition = itemLeft + itemWidth / 2 - sidebarWidth / 2;

          if (!isDraggingRef.current && !isScrollingRef.current) {
            isScrollingRef.current = true;
            gsap.to(sidebar, {
              scrollLeft: scrollPosition,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                isScrollingRef.current = false;
              }
            });
          }
        } else {
          // Vertical scroll for desktop
          const itemTop = activeItem.offsetTop;
          const itemHeight = activeItem.offsetHeight;
          const sidebarHeight = sidebar.offsetHeight;
          const scrollPosition = itemTop - sidebarHeight / 2 + itemHeight / 2;

          if (!isScrollingRef.current) {
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
        }
      }
    }
  }, [displayIndex, videos.length, extendedVideos.length, useCarouselPicker]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={useCarouselPicker
          ? "flex flex-row gap-2 overflow-x-auto w-full scrollbar-hide scroll-smooth"
          : "flex flex-col gap-4 max-h-[450px] overflow-y-auto w-auto pr-4 scrollbar-hide"
        }
      >
        {extendedVideos.map((vid, idx) => {
          // Get video source
          const rawVideoUrl = vid.desktopVideo || vid.mobileVideo;
          const videoType = vid.desktopVideo ? 'desktop' : 'mobile';
          const videoSrc = getCachedVideoUrl(rawVideoUrl, vid._id, videoType) || rawVideoUrl;
          const originalIndex = idx % videos.length;
          const isActive = (displayIndex % extendedVideos.length) === idx;

          return (
            <div
              key={`${vid._id}-${idx}`}
              ref={(el) => (itemRefs.current[idx] = el)}
              className={`bg-gray-300 rounded transition-all border-2 cursor-pointer flex-shrink-0 overflow-hidden relative
                ${useCarouselPicker
                  ? `aspect-video h-24 w-auto ${
                      isActive
                        ? "border-4 border-[#ededed] scale-100"
                        : "border-transparent opacity-40 scale-75"
                    }`
                  : `aspect-video w-40 ${
                      isActive
                        ? "border-4 border-[#ededed] scale-95"
                        : "border-transparent opacity-60"
                    }`
                }`}
              onClick={() => setActiveIndex(originalIndex)}
            >
              {videoSrc ? (
                <video
                  src={videoSrc}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                  {vid.title || vid.name || "No preview"}
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
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
