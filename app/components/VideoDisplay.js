"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getCachedVideoUrl } from "../utils/videoCache";

export default function VideoDisplay({ video, isMobile = false }) {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-play video when it changes and handle loading
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && video) {
      setIsLoading(true);

      const handleCanPlay = () => {
        setIsLoading(false);
        videoElement.play().catch((err) => {
          console.log("Autoplay prevented:", err);
        });
      };

      const handleLoadedData = () => {
        setIsLoading(false);
      };

      videoElement.addEventListener('canplay', handleCanPlay, { once: true });
      videoElement.addEventListener('loadeddata', handleLoadedData, { once: true });
      videoElement.load(); // Trigger load immediately

      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [video?._id, isMobile]); // Only depend on video ID and isMobile

  if (!video) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <p className="text-gray-500">No screen selected</p>
      </div>
    );
  }

  // Select video based on device type
  // Mobile: prefer mobileVideo, fallback to desktopVideo
  // Desktop: prefer desktopVideo, fallback to mobileVideo
  const rawVideoUrl = isMobile
    ? (video.mobileVideo || video.desktopVideo)
    : (video.desktopVideo || video.mobileVideo);

  // Use cached video URL if available, fallback to Sanity CDN
  const videoType = isMobile ? 'mobile' : 'desktop';
  const videoSrc = getCachedVideoUrl(rawVideoUrl, video._id, videoType) || rawVideoUrl;

  // Determine which image to show as placeholder
  const placeholderImage = isMobile
    ? (video.mobileImage || video.desktopImage)
    : (video.desktopImage || video.mobileImage);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 w-full flex items-center justify-center bg-gray-200 relative overflow-hidden rounded">
        {videoSrc ? (
          <>
            {/* Low-quality placeholder image shown while video loads */}
            {isLoading && placeholderImage && (
              <div className="absolute inset-0 w-full h-full z-5">
                <Image
                  src={placeholderImage}
                  alt={video.alt || video.title || "Video preview"}
                  fill
                  className="object-cover blur-sm"
                  quality={20}
                  priority
                  sizes="100vw"
                />
              </div>
            )}

            {/* Loading spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}

            {/* Video player */}
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-auto object-contain relative z-0"
              loop
              muted
              playsInline
              preload="auto"
            />
          </>
        ) : (
          <div className="text-center text-gray-700 py-32">{video.name}</div>
        )}
      </div>
      <div className="flex pt-2 flex-row justify-between">
        <h6 className="text-xs">{video.title || video.name}</h6>
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
