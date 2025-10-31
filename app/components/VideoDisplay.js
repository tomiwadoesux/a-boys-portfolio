"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getCachedVideoUrl } from "../utils/videoCache";

export default function VideoDisplay({ video, isMobile = false, savedTimestamp = 0, onTimeUpdate = null }) {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-play video when it changes and handle loading
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && video) {
      setIsLoading(true);

      const handleCanPlay = () => {
        setIsLoading(false);
        // Restore saved playback position if available
        if (savedTimestamp > 0) {
          videoElement.currentTime = savedTimestamp;
        }
        videoElement.play().catch((err) => {
          console.log("Autoplay prevented:", err);
        });
      };

      const handleLoadedData = () => {
        setIsLoading(false);
      };

      const handleTimeUpdate = () => {
        // Save current playback time if callback provided
        if (onTimeUpdate) {
          onTimeUpdate(video._id, videoElement.currentTime);
        }
      };

      videoElement.addEventListener('canplay', handleCanPlay, { once: true });
      videoElement.addEventListener('loadeddata', handleLoadedData, { once: true });
      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [video?._id, video, isMobile, savedTimestamp, onTimeUpdate]); // Depend on video ID, isMobile, savedTimestamp, and callbacks

  if (!video) {
    return (
      <div className="w-full  flex items-center justify-center bg-gray-200">
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
    <div className="w-full flex flex-col">
      <div className="w-full flex h-full items-center justify-center bg-gray-200 relative overflow-hidden rounded">
        {videoSrc ? (
          <>
            {/* High-quality placeholder image shown while video loads */}
            {placeholderImage && (
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src={placeholderImage}
                  alt={video.alt || video.title || "Video preview"}
                  fill
                  className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
                  quality={75}
                  priority
                  sizes="100vw"
                />
              </div>
            )}

            {/* Loading spinner - only show if still loading after 500ms */}
            {isLoading && (
              <div className="absolute inset-0 px flex items-center justify-center px-7 md:px-20 lg:px-56 bg-black/10 z-10">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-white border-t-transparent"></div>
              </div>
            )}

            {/* Video player - fill full container height and width */}
            <video
              ref={videoRef}
              src={videoSrc}
              className={`w-full h-full object-cover relative z-5 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
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
      <div className="flex pt-2 flex-row justify-between items-center gap-2">
        <h6 className="text-xs flex-1">{video.title || video.name}</h6>
        {video.link && (
          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap underline text-xs underline-offset-2 hover:opacity-70 transition-opacity"
          >
            Visit
          </a>
        )}
      </div>
    </div>
  );
}
