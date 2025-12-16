"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { getCachedVideoUrl } from "../utils/videoCache";

export default function VideoSidebar({
  videos,
  activeIndex,
  setActiveIndex,
  isMobile = false,
}) {
  const sidebarRef = useRef();
  const itemRefs = useRef([]);
  const isScrollingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const [sortedVideos, setSortedVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(new Set());

  const useCarouselPicker = isMobile;

  // Sort videos by file size (smallest first)
  useEffect(() => {
    if (videos.length === 0) {
      setSortedVideos([]);
      return;
    }

    const sorted = [...videos].sort((a, b) => {
      const sizeA = Math.min(
        a.desktopVideoSize || Infinity,
        a.mobileVideoSize || Infinity
      );
      const sizeB = Math.min(
        b.desktopVideoSize || Infinity,
        b.mobileVideoSize || Infinity
      );
      return sizeA - sizeB;
    });

    setSortedVideos(sorted);
  }, [videos]);

  // Create extended array for infinite scroll effect
  const repetitions = 20;
  const extendedVideos = Array(repetitions).fill(sortedVideos).flat();

  const displayIndex = activeIndex;

  // IntersectionObserver for lazy loading sidebar videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleVideos((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        root: sidebarRef.current,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    itemRefs.current.forEach((item, index) => {
      if (item) {
        item.dataset.index = index;
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, [extendedVideos.length]);

  // Handle scroll updates to sync active video
  useEffect(() => {
    if (!sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    let scrollUpdateTimer = null;

    const updateDisplayFromScroll = () => {
      // Throttle updates during scroll
      if (scrollUpdateTimer) return;

      scrollUpdateTimer = setTimeout(() => {
        if (!sidebar) return;

        // Calculate center point
        const scrollOffset = useCarouselPicker
          ? sidebar.scrollLeft
          : sidebar.scrollTop;
        const containerSize = useCarouselPicker
          ? sidebar.offsetWidth
          : sidebar.offsetHeight;
        const centerPoint = scrollOffset + containerSize / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        itemRefs.current.forEach((item, idx) => {
          if (!item) return;

          let itemCenter;
          if (useCarouselPicker) {
            itemCenter = item.offsetLeft + item.offsetWidth / 2;
          } else {
            itemCenter = item.offsetTop + item.offsetHeight / 2;
          }

          const distance = Math.abs(itemCenter - centerPoint);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = idx;
          }
        });

        // Only update if changed and we're not currently auto-scrolling
        if (!isScrollingRef.current) {
          const actualIndex = closestIndex % sortedVideos.length;
          // We only update if the calculated index is different to avoid loops
          // But we need to be careful not to cause re-renders during scroll
          if (actualIndex !== activeIndex) {
            setActiveIndex(actualIndex);
          }
        }

        scrollUpdateTimer = null;
      }, 100);
    };

    sidebar.addEventListener("scroll", updateDisplayFromScroll, {
      passive: true,
    });

    return () => {
      if (scrollUpdateTimer) clearTimeout(scrollUpdateTimer);
      if (sidebar)
        sidebar.removeEventListener("scroll", updateDisplayFromScroll);
    };
  }, [useCarouselPicker, sortedVideos.length, activeIndex, setActiveIndex]);

  // Auto-scroll to active video
  useEffect(() => {
    if (sidebarRef.current && sortedVideos.length > 0) {
      const wrappedIndex = displayIndex % extendedVideos.length;
      const activeItem = itemRefs.current[wrappedIndex];

      if (activeItem) {
        const sidebar = sidebarRef.current;

        if (useCarouselPicker) {
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
              },
            });
          }
        } else {
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
              },
            });
          }
        }
      }
    }
  }, [
    displayIndex,
    sortedVideos.length,
    extendedVideos.length,
    useCarouselPicker,
  ]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={
          useCarouselPicker
            ? "flex flex-row gap-2 overflow-x-auto w-full scrollbar-hide scroll-smooth snap-x snap-mandatory px-[50%] md:px-0"
            : "flex flex-col gap-4 max-h-[450px] overflow-y-auto w-auto pr-4 scrollbar-hide"
        }
      >
        {extendedVideos.map((vid, idx) => {
          const originalIndex = idx % sortedVideos.length;
          const isActive = displayIndex % extendedVideos.length === idx;
          const isVideoVisible = visibleVideos.has(idx);
          const placeholderImage = vid.desktopImage || vid.mobileImage;

          return (
            <div
              key={`${vid._id}-${idx}`}
              ref={(el) => (itemRefs.current[idx] = el)}
              className={`bg-gray-300 rounded transition-all border-2 cursor-pointer flex-shrink-0 overflow-hidden relative snap-center
                ${
                  useCarouselPicker
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
              {/* Only show placeholder images for sidebar - no videos */}
              {placeholderImage ? (
                <Image
                  src={placeholderImage}
                  alt={vid.alt || vid.title || "Video preview"}
                  fill
                  className="object-cover"
                  quality={60}
                  loading={isVideoVisible ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 96px, 160px"
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
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
