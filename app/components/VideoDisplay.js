"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function VideoDisplay({ video }) {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-play video when it changes and handle loading
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      setIsLoading(true);

      const handleCanPlay = () => {
        setIsLoading(false);
        videoElement.play().catch((err) => {
          console.log("Autoplay prevented:", err);
        });
      };

      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.load(); // Trigger load

      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [video]);

  if (!video) {
    return (
      <div className="w-full h-[28vw] flex items-center justify-center bg-gray-200">
        <p className="text-gray-500">No screen selected</p>
      </div>
    );
  }

  const videoSrc = video.desktopVideo || video.mobileVideo;

  return (
    <div>
      <div className="w-full flex items-center justify-center bg-gray-200 relative overflow-hidden rounded">
        {videoSrc ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-auto object-contain"
              loop
              muted
              playsInline
              preload="none"
            />
          </>
        ) : (
          <div className="text-center text-gray-700 py-32">{video.name}</div>
        )}
      </div>
      <div className="flex pt-3 flex-row justify-between">
        <h6 className="text-xs">{video.name}</h6>
        {video.link && (
          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-xs underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}
