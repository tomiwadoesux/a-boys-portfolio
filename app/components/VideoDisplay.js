"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getCachedVideoUrl } from "../utils/videoCache";

export default function VideoDisplay({ video, isMobile = false, savedTimestamp = 0, onTimeUpdate = null }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Use IntersectionObserver for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setShouldLoad(true);
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before video enters viewport
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Handle video loading and playback
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !video || !shouldLoad) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      
      // Restore saved playback position
      if (savedTimestamp > 0) {
        videoElement.currentTime = savedTimestamp;
      }
      
      // Auto-play when ready
      videoElement.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    };

    const handleTimeUpdate = () => {
      if (onTimeUpdate) {
        onTimeUpdate(video._id, videoElement.currentTime);
      }
    };

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [video?._id, shouldLoad, savedTimestamp, onTimeUpdate]);

  if (!video) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-200">
        <p className="text-gray-500">No screen selected</p>
      </div>
    );
  }

  // Select video based on device type
  const rawVideoUrl = isMobile
    ? (video.mobileVideo || video.desktopVideo)
    : (video.desktopVideo || video.mobileVideo);

  const videoType = isMobile ? 'mobile' : 'desktop';
  const videoSrc = getCachedVideoUrl(rawVideoUrl, video._id, videoType) || rawVideoUrl;

  // Placeholder image
  const placeholderImage = isMobile
    ? (video.mobileImage || video.desktopImage)
    : (video.desktopImage || video.mobileImage);

  return (
    <div 
      ref={containerRef}
      className="w-full flex flex-col animate-fadeIn"
    >
      <div className="w-full flex h-full items-center justify-center bg-gray-200 relative overflow-hidden rounded">
        {videoSrc ? (
          <>
            {/* Placeholder image - always visible until video loads */}
            {placeholderImage && (
              <div 
                className="absolute inset-0 w-full h-full z-0"
                style={{
                  opacity: isVideoLoaded ? 0 : 1,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              >
                <Image
                  src={placeholderImage}
                  alt={video.alt || video.title || "Video preview"}
                  fill
                  className="object-contain"
                  quality={85}
                  priority={isVisible}
                  sizes="100vw"
                />
              </div>
            )}

            {/* Video - only load when shouldLoad is true */}
            {shouldLoad && (
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover relative z-5"
                style={{
                  opacity: isVideoLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                  willChange: 'transform',
                  transform: 'translateZ(0)' // GPU acceleration
                }}
                loop
                muted
                playsInline
                preload="auto"
              />
            )}
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}