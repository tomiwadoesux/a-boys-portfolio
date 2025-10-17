"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function VideoSidebar({ videos, activeIndex, setActiveIndex }) {
  const sidebarRef = useRef();
  const itemRefs = useRef([]);

  // Auto-scroll to active video in sidebar
  useEffect(() => {
    if (itemRefs.current[activeIndex] && sidebarRef.current) {
      const activeItem = itemRefs.current[activeIndex];
      const sidebar = sidebarRef.current;

      const itemTop = activeItem.offsetTop;
      const itemHeight = activeItem.offsetHeight;
      const sidebarHeight = sidebar.offsetHeight;
      const scrollPosition = itemTop - sidebarHeight / 2 + itemHeight / 2;

      gsap.to(sidebar, {
        scrollTop: scrollPosition,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [activeIndex]);

  return (
    <>
      <div
        ref={sidebarRef}
        className="flex flex-col gap-6 h-full overflow-y-auto w-auto pr-4 scrollbar-hide"
      >
        {videos.map((vid, idx) => (
          <div
            key={vid.id}
            ref={(el) => (itemRefs.current[idx] = el)}
            className={`aspect-video w-40 bg-gray-300 rounded transition-all border-2 cursor-pointer flex-shrink-1
              ${
                activeIndex === idx
                  ? " border-4 border-[#ededed] scale-95"
                  : "border-transparent opacity-60"
              }`}
            onClick={() => setActiveIndex(idx)}
          >
            {/* Replace with <video> or <img src={vid.thumb} /> */}
          </div>
        ))}
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
