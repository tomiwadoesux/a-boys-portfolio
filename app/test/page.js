"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageConfig from "../components/PageConfig";
import Headd from "../components/Headd";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRefs = useRef([]);
  const previewVideoRef = useRef(null);

  // Sample video data - replace with your actual videos
  const videos = [
    { id: 1, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Big Buck Bunny" },
    { id: 2, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Elephants Dream" },
    { id: 3, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "For Bigger Blazes" },
    { id: 4, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", title: "For Bigger Escapes" },
    { id: 5, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", title: "For Bigger Fun" },
    { id: 6, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", title: "For Bigger Joyrides" },
    { id: 7, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", title: "For Bigger Meltdowns" },
    { id: 8, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", title: "Sintel" },
    { id: 9, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Tears of Steel" },
  ];

  useEffect(() => {
    // Create scroll triggers for each video box
    videoRefs.current.forEach((videoEl, index) => {
      if (!videoEl) return;

      ScrollTrigger.create({
        trigger: videoEl,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveVideoIndex(index),
        onEnterBack: () => setActiveVideoIndex(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Update preview video when active index changes
  useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.load();
      previewVideoRef.current.play().catch(() => {
        // Autoplay might be blocked by browser
      });
    }
  }, [activeVideoIndex]);

  return (
    <div>
      <PageConfig activePage="/test" />
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      </div>

      {/* Main container with px-56 */}
      <div className="px-7 md:px-20 lg:px-56 pt-[200px]">
        {/* Scrollable boxes on the left - within px boundary */}
        <div className="fixed flex flex-col w-20 gap-6 top-[250px] bottom-8 pointer-events-none z-40">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`bg-gray-300 aspect-square rounded-md overflow-hidden transition-all duration-300 flex-shrink-0 ${
                activeVideoIndex === index ? "ring-2 ring-black opacity-100" : "opacity-40"
              }`}
            >
              {/* Empty box */}
            </div>
          ))}
        </div>

        {/* Large preview box on the right - fixed, respects px boundary */}
        <div className="fixed left-[calc(5rem+6rem)] right-16 lg:left-[calc(14rem+6rem)] lg:right-56 top-[250px] z-30">
          <div className="bg-gray-300 aspect-video rounded-lg overflow-hidden">
            <video
              ref={previewVideoRef}
              src={videos[activeVideoIndex].src}
              className="w-full h-full object-cover"
              controls
              autoPlay
              loop
              playsInline
            />
          </div>
        </div>

        {/* Scroll sections - invisible triggers */}
        <div className="relative pt-[30vh]">
          {videos.map((video, index) => (
            <div
              key={video.id}
              ref={(el) => (videoRefs.current[index] = el)}
              className="h-screen"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
